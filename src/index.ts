// src/index.js {path: './.env.local'}
import express, { Express, request, Request, Response, Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleGETOneEvent, handlePostOneEvent, handlePutOneEvent, handleDeleteOneEvent, handleGetAllEventsInfo } from "./event/event.controller"
const userController = require("./user/user.controller");
import { database } from "./knex";
import { loginRequest, registerRequest } from "./global";

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

app.post("/login", async (req: Request, res: Response) => {
  const userCredential: loginRequest = req.body;
	const result = await database('user')
		.select("id")
		.where("username", userCredential.username)
		.andWhere("password", userCredential.password)
		.first();

  if(result) res.json(result);
  else res.sendStatus(500);
	
});

app.post("/register", async (req: Request, res: Response) => {
	const userCredential: registerRequest = req.body;
  try {
    const result = await database("user").insert(userCredential, ["id"]);
    res.json(result);
  } catch (error) {
    res.sendStatus(500);
  }
	

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