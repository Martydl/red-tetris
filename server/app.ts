import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import App from "./src/App";
import Player from "./src/Player";
import Game from "./src/Game";
import { Messages, PlayerStatus } from "./src/Consts";

const app: Express = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

httpServer.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});

app.use(express.static("client"));
app.get("/", (_req: Request, res: Response) => {
  res.sendFile("client/index.html", { root: "." });
});

let server = new App();

io.on("connection", (socket) => {
  console.log(socket.id, "is connected");
  server.getRoomsInfos();

  let newPlayer = new Player(socket.id);
  server.addPlayer(socket.id, newPlayer);

  socket.join(Messages.WAITING_ROOM);
  socket.emit(Messages.ROOM_LIST, server.getRoomsInfos());

  socket.on(Messages.JOIN_ROOM, (arg: [string, string]) => {
    let [gameID, playerName] = arg;
    if (gameID === Messages.WAITING_ROOM)
      socket.emit(Messages.ROOM_LIST, server.getRoomsInfos());
    socket.join(gameID);
    server.players[socket.id].opponent.setName(playerName);
    if (gameID in server.games) {
      server.games[gameID].addPlayer(server.players[socket.id]);
      if (server.games[gameID].gameOn) {
        server.players[socket.id].opponent.set_status(PlayerStatus.WAITING);
      }
    } else server.addGame(gameID, new Game(gameID, server.players[socket.id]));
    server.players[socket.id].setRoom(gameID);
    socket.emit(Messages.ROOM_INFO, [
      gameID,
      server.games[gameID].leaderID,
      server.games[gameID].getOpponents(socket.id),
      server.games[gameID].gameOn,
    ]);
    socket.broadcast
      .to(gameID)
      .emit(Messages.SEND_OPPONENT, [
        socket.id,
        server.players[socket.id].opponent,
      ]);
    io.to(Messages.WAITING_ROOM).emit(
      Messages.ROOM_LIST,
      server.getRoomsInfos()
    );
  });

  socket.on(Messages.LINES_DESTROYED, (lineNB: number) => {
    socket.broadcast
      .to(server.players[socket.id].room)
      .emit(Messages.LINES_DESTROYED, lineNB);
  });

  socket.on(Messages.TOGGLE_ACCELERATION, (gameID: string) => {
    socket.broadcast
      .to(gameID)
      .emit(
        Messages.TOGGLE_ACCELERATION,
        server.games[gameID].setget_acceleration()
      );
  });

  socket.on(Messages.NEW_SHADOW, (arg: [string, number[]]) => {
    let [gameID, shadow] = arg;
    server.players[socket.id].opponent.newShadow(shadow);
    socket.broadcast.to(gameID).emit(Messages.NEW_SHADOW, [socket.id, shadow]);
  });

  socket.on(Messages.PLAYER_GAME_OVER, (gameID: string) => {
    server.players[socket.id].opponent.set_status(PlayerStatus.DEAD);
    socket.broadcast.to(gameID).emit(Messages.PLAYER_GAME_OVER, socket.id);
    let playerAlive: number = server.games[gameID].getPlayerAlive();
    if (
      (server.games[gameID].acceleration && playerAlive < 1) ||
      playerAlive < 2
    ) {
      io.to(gameID).emit(Messages.END_GAME);
      server.games[gameID].setPlayersAlive();
    }
  });

  socket.on(Messages.START_GAME, (gameID: string) => {
    server.games[gameID].setGameStart();
    server.games[gameID].giveGeneratorToPlayers();
    io.to(gameID).emit(
      Messages.START_GAME,
      server.games[gameID].getStartPieceList()
    );
    io.to(Messages.WAITING_ROOM).emit(
      Messages.ROOM_LIST,
      server.getRoomsInfos()
    );
  });

  socket.on(Messages.GET_PIECE, () => {
    socket.emit(Messages.GET_PIECE, server.players[socket.id].genPiece());
  });

  socket.on(Messages.NEW_PLAYER_NAME, (arg: [string, string]) => {
    let [gameID, newName] = arg;
    socket.broadcast
      .to(gameID)
      .emit(Messages.NEW_PLAYER_NAME, [socket.id, newName]);
  });

  socket.on(Messages.ROOM_DISCONNECT, (gameID: string) => {
    if (Object.keys(server.games[gameID].players).length > 1) {
      delete server.games[gameID].players[socket.id];
      socket.broadcast.to(gameID).emit(Messages.DELETE_OPPONENT, socket.id);
    } else delete server.games[gameID];
    io.to(Messages.WAITING_ROOM).emit(
      Messages.ROOM_LIST,
      server.getRoomsInfos()
    );
  });

  socket.on("disconnect", (_reason: any) => {
    let roomName = server.players[socket.id].room;
    if (
      roomName != Messages.WAITING_ROOM &&
      Object.keys(server.games[roomName].players).length > 1
    ) {
      delete server.games[roomName].players[socket.id];
      socket.broadcast.to(roomName).emit(Messages.DELETE_OPPONENT, socket.id);
    } else if (roomName != Messages.WAITING_ROOM) delete server.games[roomName];
    io.to(Messages.WAITING_ROOM).emit(
      Messages.ROOM_LIST,
      server.getRoomsInfos()
    );
    delete server.players[socket.id];
  });
});
