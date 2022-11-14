import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import App from "./src/App";
import Player from "./src/Player";
import Game from "./src/Game";
import Messages from "./src/Consts";

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
    if (gameID in server.games)
      server.games[gameID].addPlayer(server.players[socket.id]);
    else server.addGame(gameID, new Game(gameID, server.players[socket.id]));
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
  });

  socket.on(Messages.LINES_DESTROYED, (lineNB: number) => {
    socket.broadcast
      .to(server.players[socket.id].room)
      .emit(Messages.LINES_DESTROYED, lineNB);
  });

  socket.on(Messages.TOGGLE_ACCELERATION, (arg: [string, boolean]) => {
    let [gameID, acceleration] = arg;
    socket.broadcast
      .to(gameID)
      .emit(Messages.TOGGLE_ACCELERATION, acceleration);
  });

  socket.on(Messages.NEW_SHADOW, (arg: [string, number[]]) => {
    let [gameID, shadow] = arg;
    server.players[socket.id].opponent.newShadow(shadow);
    socket.broadcast.to(gameID).emit(Messages.NEW_SHADOW, [socket.id, shadow]);
  });

  socket.on(Messages.PLAYER_GAME_OVER, (gameID: string) => {
    server.players[socket.id].opponent.dead();
    socket.broadcast.to(gameID).emit(Messages.PLAYER_GAME_OVER, socket.id);
  });

  // emit to all client in the room [list of 4 starting piece, seed of the game]
  socket.on(Messages.START_GAME, (gameID: string) => {
    server.games[gameID].giveGeneratorToPlayers();
    io.to(gameID).emit(Messages.START_GAME, [
      server.games[gameID].getStartPieceList(),
      server.games[gameID].seed,
    ]);
  });

  socket.on(Messages.GET_PIECE, () => {
    socket.emit(Messages.GET_PIECE, server.players[socket.id].genPiece());
  });

  socket.on(Messages.NEW_NAME_PLAYER, (arg: [string, string]) => {
    let [gameID, newName] = arg;
    socket.broadcast
      .to(gameID)
      .emit(Messages.NEW_NAME_PLAYER, [socket.id, newName]);
  });

  socket.on("disconnect", (reason: any) => {
    delete server.games[server.players[socket.id].room];
    delete server.players[socket.id];
  });
});
