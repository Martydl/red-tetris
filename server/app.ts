import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import App from "./src/App";
import Player from "./src/Player";
import Game from "./src/Game";
import { ClientMessages } from "../common/Consts";
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

let serveur = new App();

io.on("connection", (socket) => {
  console.log(socket.id, "is connected");

  let newPlayer = new Player(socket.id);
  serveur.addPlayer(socket.id, newPlayer);

  socket.join("waitingRoom");

  socket.on("numpadSub", (arg: any) => {
    console.log("From", socket.id, arg);
  });

  socket.on(ClientMessages.JOIN_ROOM, (arg: any) => {
    let [roomName, playerName] = arg;
    socket.join(roomName);
    serveur.players[socket.id].setName(playerName);
    if (!(arg in serveur.games))
      serveur.addGame(arg, new Game(arg, serveur.players[socket.id]));
    else serveur.games[arg].addPlayer(serveur.players[socket.id]);
    serveur.players[socket.id].setRoom(arg);
  });

  socket.on(ClientMessages.LINES_DESTROYED, (arg: any) => {
    socket.broadcast
      .to(serveur.players[socket.id].room)
      .emit(ClientMessages.LINES_DESTROYED, arg);
  });

  socket.on(ClientMessages.NEW_SHADOW, (arg: any) => {
    serveur.players[socket.id].newShadow(arg);
    socket.broadcast
      .to(serveur.players[socket.id].room)
      .emit(ClientMessages.NEW_SHADOW, arg);
  });

  socket.on(ClientMessages.PLAYER_GAME_OVER, (arg: any) => {
    serveur.players[socket.id].dead();
    socket.broadcast
      .to(serveur.players[socket.id].room)
      .emit(ClientMessages.PLAYER_GAME_OVER, socket.id);
  });

  socket.on(ClientMessages.START_GAME, (arg: any) => {
    io.to(serveur.players[socket.id].room).emit(ClientMessages.START_GAME, arg);
  });

  socket.on("disconnect", (reason: any) => {
    delete serveur.games[serveur.players[socket.id].room];
    delete serveur.players[socket.id];
  });
});
