import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import App from "./src/App";

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

var allApp = new App();

io.on("connection", (socket) => {
  allApp.addPlayer(socket.id);
  allApp.players.slice(-1)[0].setRoom("waitingRoom");
  socket.join("waitingRoom");
  console.log(allApp.players.slice(-1)[0].name, "is connected");

  allApp.addSocket(socket);

  // console.log();
  // for (let i = 0; i < allApp.socketList.length; i++) {
  //   console.log(allApp.players[i].name, "as", allApp.players[i].id);
  // }
  // for (let i of io.sockets.adapter.rooms.keys()) {
  //   console.log("Currently in", i, ":", io.sockets.adapter.rooms.get(i));
  // }
  allApp.socketList[0].emit("test", "test_txt");
  allApp.socketList[0].on("swap", (arg: any) => {
    console.log("From client: ", arg); // world
  });
  socket.on("numpadSub", (arg: any) => {
    console.log("From client: ", arg);
  });
});

//if new shadow update
