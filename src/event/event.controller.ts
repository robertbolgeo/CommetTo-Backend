import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { event, eventInfo, infoForPage,infoForPageForJSON } from "../global";
import { selectDetailOfEvent,insertDetailOfEvent } from "./event.model";
dotenv.config({ path: './.env.local' });

async function handleGETOneEvent(req: Request, res: Response) {
    const eventId: string = req.params.id;
    const infoForPage = await selectDetailOfEvent(eventId)
    return infoForPage;
}

async function handlePostOneEvent(req: Request, res: Response) {
    // const eventId: string = req.params.id;
    const newEvent : infoForPageForJSON = req.body //already JSON
    const updatedIdParis = await insertDetailOfEvent(newEvent)
    return updatedIdParis
}

// async function handleGetAllEventsInfo(req: Request, res: Response) {
//     const eventsInfo: eventInfo[] = await selectEachEventInfo()
// }

export {
    handleGETOneEvent,
    handlePostOneEvent
}