import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app: Express = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.static("client"));
app.get("/", (req: Request, res: Response) => {
  // res.send("Express + TypeScript Server Red-Tetris");
  res.sendFile("client/index.html", { root: "." });
});

io.on("connection", () => {
  console.log("Socket.io");
});

httpServer.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});

export const viteNodeApp = app;
