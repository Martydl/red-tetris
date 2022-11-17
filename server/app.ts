import express, { Express, Request, Response } from "express";
import { createServer, Server as ServerHttp } from "http";
import { Server, Socket } from "socket.io";
import App from "./src/App";
import Player from "./src/Player";
import Game from "./src/Game";
import { Messages, PlayerStatus } from "./src/Consts";

const app: Express = express();

const httpServer: ServerHttp = createServer(app);

const io: Server = new Server(httpServer);

httpServer.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});

app.use(express.static("client"));
app.get("/", (_req: Request, res: Response) => {
  res.sendFile("client/index.html", { root: "." });
});

let server = new App();

io.on("connection", (socket: Socket) => {
  server.getRoomsInfos();

  let newPlayer = new Player(socket.id);
  server.addPlayer(socket.id, newPlayer);

  socket.join(Messages.WAITING_ROOM);
  socket.emit(Messages.ROOM_LIST, server.getRoomsInfos());

  socket.on(Messages.JOIN_ROOM, (arg: [string, string]) => {
    let [gameID, playerName] = arg;
    socket.join(gameID);
    server.players[socket.id].opponent.setName(playerName);
    if (gameID in server.games) {
      server.games[gameID].addPlayer(server.players[socket.id]);
      if (server.games[gameID].gameOn) {
        server.players[socket.id].opponent.setStatus(PlayerStatus.WAITING);
      }
    } else server.addGame(gameID, new Game(gameID, server.players[socket.id]));
    server.players[socket.id].setRoom(gameID);
    server.sendRoomInfo(socket, gameID);
    server.sendBroadcastOpponent(socket, gameID);
    server.sendAllRoomsInfos(io);
  });

  socket.on(Messages.LINES_DESTROYED, (lineNB: number) => {
    server.sendBroadcastLinesDestroyed(socket, lineNB);
  });

  socket.on(Messages.TOGGLE_ACCELERATION, (gameID: string) => {
    server.sendBroadcastToggleAcceleration(
      socket,
      gameID,
      !server.games[gameID].acceleration
    );
  });

  socket.on(Messages.NEW_SHADOW, (arg: [string, number[]]) => {
    let [gameID, shadow] = arg;
    server.players[socket.id].opponent.newShadow(shadow);
    server.sendBroadcastNewShadow(socket, gameID, shadow);
  });

  socket.on(Messages.PLAYER_GAME_OVER, (gameID: string) => {
    server.players[socket.id].opponent.setStatus(PlayerStatus.DEAD);
    server.sendBroadcastPlayerGameOver(socket, gameID);
    if (server.games[gameID].isEndGame()) {
      server.setEndGame(io, socket, gameID);
    }
  });

  socket.on(Messages.START_GAME, (gameID: string) => {
    server.games[gameID].setGameOn(true);
    server.games[gameID].setgiveGeneratorToPlayers();
    server.sendAllStartGame(io, gameID);
    server.sendAllRoomsInfos(io);
  });

  socket.on(Messages.GET_PIECE, () => {
    server.sendGenPiece(socket);
  });

  socket.on(Messages.NEW_PLAYER_NAME, (arg: [string, string]) => {
    let [gameID, newName] = arg;
    server.players[socket.id].opponent.setName(newName);
    server.sendBroadcastNewPlayerName(socket, gameID, newName);
  });

  socket.on(Messages.ROOM_DISCONNECT, (gameID: string) => {
    server.roomDisconnect(io, socket, gameID);
    server.players[socket.id].room = Messages.WAITING_ROOM;
  });

  socket.on("disconnect", (_reason: any) => {
    server.roomDisconnect(io, socket, server.players[socket.id].room);
    delete server.players[socket.id];
  });
});
