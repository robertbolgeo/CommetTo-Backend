import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { event, eventInfo } from "../global";
import { selectDetailOfEvent } from "./event.model";
dotenv.config({ path: './.env.local' });

async function handleGETOneEvent(req: Request, res: Response) {
    const eventId: string = req.params.id;
    const infoForPage = await selectDetailOfEvent(eventId)
    return infoForPage;
}

// async function handlePostOneEvent(req: Request, res: Response) {
//     const eventId: number = req.params.id;
//     const update: infoForPage = res.body
//     const updatedId = await selectDetailOfEvent(eventId)

// }

// async function handleGetAllEventsInfo(req: Request, res: Response) {
//     const eventsInfo: eventInfo[] = await selectEachEventInfo()
// }

export {
    handleGETOneEvent
}