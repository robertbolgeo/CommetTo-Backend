// src/index.js {path: './.env.local'}
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleGETOneEvent, handlePostOneEvent, handlePutOneEvent, handleDeleteOneEvent, handleGetAllEventsInfo } from "./event/event.controller"

dotenv.config({ path: './.env.local' });

const app: Express = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: process.env.VITE_ORIGIN
}

app.use(express.json())
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE");
  next();
});

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

app.delete("/event/:id", async (req: Request, res: Response) => {
  const reuslt = await handleDeleteOneEvent(req, res)
  res.send();
});

app.get("/all-events/info", async (req: Request, res: Response) => {
  const result = await handleGetAllEventsInfo(req, res);
  res.json(result);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});