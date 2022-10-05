import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server Red-Tetris");
});

app.listen(3000, () => {
  console.log(`[server]: Server is running at https://localhost:3000`);
});

export const viteNodeApp = app;
