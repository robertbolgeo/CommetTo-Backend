// src/index.js {path: './.env.local'}
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { handleGETOneEvent, handlePostOneEvent, handlePutOneEvent } from "./event/event.controller"

dotenv.config({ path: './.env.local' });

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/event/:id", async (req: Request, res: Response) => {
  const result = await handleGETOneEvent(req, res)
  res.json(result);
});

app.post("/event", async (req: Request, res: Response) => {
  const result = await handlePostOneEvent(req, res)
  res.json(result);
});

app.put("/event", (req: Request, res: Response) => {
  const result = handlePutOneEvent(req, res)
  res.json(result)
});

app.delete("/event/:id", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/all-events/info", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});