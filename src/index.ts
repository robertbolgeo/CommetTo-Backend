// src/index.js {path: './.env.local'}
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { handleGETOneEvent } from "./event/event.controller"

dotenv.config({ path: './.env.local' });

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/event/:id", async (req: Request, res: Response) => {
  const result = await handleGETOneEvent(req, res)
  res.json(result);
});

app.post("/event/:id", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.put("/event/:id", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.delete("/event/:id", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/allEvents/info", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});