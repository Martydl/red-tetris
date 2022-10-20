import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import App from "./src/App";
import Player from "./src/Player";
import Game from "./src/Game";
import { ClientMessages, ServerMessages } from "../common/Consts";
// import { ClientMessages } from "./Consts";

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

  let newPlayer = new Player(socket.id);
  server.addPlayer(socket.id, newPlayer);

  socket.join("waitingRoom");

  socket.on("numpadSub", (arg: any) => {
    console.log("From", socket.id, arg);
  });

  socket.on(ClientMessages.JOIN_ROOM, (arg: any) => {
    let [gameId, playerName] = arg;
    socket.join(gameId);
    server.players[socket.id].opponent.setName(playerName);
    if (gameId in server.games)
      server.games[gameId].addPlayer(server.players[socket.id]);
    else server.addGame(gameId, new Game(gameId, server.players[socket.id]));
    server.players[socket.id].setRoom(gameId);
    socket.emit(ServerMessages.ROOM_INFO, [
      gameId,
      server.games[gameId].leaderID,
      server.games[gameId].getOpponents(socket.id),
      server.games[gameId].gameOn,
    ]);
    socket.broadcast.to(gameId).emit(ServerMessages.SEND_OPPONENT, {
      [socket.id]: server.players[socket.id].opponent,
    });
  });

  socket.on(ClientMessages.LINES_DESTROYED, (arg: any) => {
    socket.broadcast
      .to(server.players[socket.id].room)
      .emit(ClientMessages.LINES_DESTROYED, arg);
  });

  socket.on(ClientMessages.NEW_SHADOW, (arg: any) => {
    server.players[socket.id].opponent.newShadow(arg);
    socket.broadcast
      .to(server.players[socket.id].room)
      .emit(ClientMessages.NEW_SHADOW, [socket.id, arg]);
  });

  socket.on(ClientMessages.PLAYER_GAME_OVER, (arg: any) => {
    server.players[socket.id].opponent.dead();
    socket.broadcast
      .to(server.players[socket.id].room)
      .emit(ClientMessages.PLAYER_GAME_OVER, socket.id);
  });

  socket.on(ClientMessages.START_GAME, (arg: any) => {
    io.to(server.players[socket.id].room).emit(ClientMessages.START_GAME, arg);
  });

  socket.on("disconnect", (reason: any) => {
    delete server.games[server.players[socket.id].room];
    delete server.players[socket.id];
  });
});
