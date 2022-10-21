import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import App from "./src/App";
import Player from "./src/Player";
import Game from "./src/Game";
import { ClientMessages, ServerMessages } from "../common/Consts";

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

  socket.join("waitingRoom");

  socket.on(ClientMessages.JOIN_ROOM, (arg: [string, string]) => {
    let [gameID, playerName] = arg;
    socket.join(gameID);
    server.players[socket.id].opponent.setName(playerName);
    if (gameID in server.games)
      server.games[gameID].addPlayer(server.players[socket.id]);
    else server.addGame(gameID, new Game(gameID, server.players[socket.id]));
    server.players[socket.id].setRoom(gameID);
    socket.emit(ServerMessages.ROOM_INFO, [
      gameID,
      server.games[gameID].leaderID,
      server.games[gameID].getOpponents(socket.id),
      server.games[gameID].gameOn,
    ]);
    socket.broadcast
      .to(gameID)
      .emit(ServerMessages.SEND_OPPONENT, [
        socket.id,
        server.players[socket.id].opponent,
      ]);
  });

  socket.on(ClientMessages.LINES_DESTROYED, (lineNB: number) => {
    socket.broadcast
      .to(server.players[socket.id].room)
      .emit(ClientMessages.LINES_DESTROYED, lineNB);
  });

  socket.on(ClientMessages.NEW_SHADOW, (arg: [string, number[]]) => {
    let [gameID, shadow] = arg;
    server.players[socket.id].opponent.newShadow(shadow);
    socket.broadcast
      .to(gameID)
      .emit(ClientMessages.NEW_SHADOW, [socket.id, shadow]);
  });

  socket.on(ClientMessages.PLAYER_GAME_OVER, (gameID: string) => {
    server.players[socket.id].opponent.dead();
    socket.broadcast
      .to(gameID)
      .emit(ClientMessages.PLAYER_GAME_OVER, socket.id);
  });

  socket.on(ClientMessages.START_GAME, (gameID: string) => {
    io.to(gameID).emit(
      ClientMessages.START_GAME,
      server.games[gameID].getStartPieceList()
    );
    server.games[gameID].giveSeedToPlayers();
  });

  socket.on(ClientMessages.GET_PIECE, () => {
    socket.emit(ClientMessages.GET_PIECE, server.players[socket.id].genPiece());
  });

  socket.on(ServerMessages.ROOM_LIST, () => {
    socket.emit(ServerMessages.ROOM_LIST, server.getRoomsInfos());
  });

  socket.on("disconnect", (reason: any) => {
    delete server.games[server.players[socket.id].room];
    delete server.players[socket.id];
  });
});
