import { event, infoForPage, infoForPageForJSON, infoForPageFromKnex, schedule, eventForJSON, scheduleForJSON } from "../global";
import { database } from "../knex";

function castResult(result: infoForPageFromKnex[]) {
    let forController: infoForPage = {
        overview: {
            id: result[0].event_id,
            name: result[0].event_name,
            description: result[0].event_desc,
            date: new Date(result[0].event_date),
            updated_at: new Date(result[0].updated_at)
        },
        schedule: []
    }
    // forController.overview.id = result[0].event_id;
    // forController.overview.name = result[0].event_name;
    // forController.overview.description = result[0].event_desc;
    // forController.overview.date = result[0].event_date
    // forController.overview.updated_at = result[0].updated_at
    for (const r of result) {
        forController.schedule.push({
            id: r.schedule_id,
            name: r.schedule_name,
            time: r.time,
            description: r.schedule_desc
        })
    }
    return forController;
}

async function selectDetailOfEvent(eventId: string) {
    const result = await database().from("event")
        .leftJoin("event_schedule", "event_schedule.event_id", "event.id")
        .leftJoin("schedule", "schedule.id ", "event_schedule.schedule_id")
        .select("event.id as event_id", "event.name as event_name", "event.description as event_desc", "event.date as event_date", "schedule_id",
            "schedule.name as schedule_name", "schedule.description as schedule_desc", "time", "event.updated_at").where("event.id", eventId)
    const casted = castResult(result)
    return casted;
}

async function insertDetailOfEvent(newEvent: infoForPageForJSON) {
    const event: eventForJSON = newEvent.overview
    const schedules: scheduleForJSON[] = newEvent.schedule
    const insertedEventId = await insertToEvent(event)
    const insertedScheduleIds = await insertToSchedule(schedules)
    const eventToSchedule = await insertToEventAndSchedule(insertedEventId, insertedScheduleIds)
    return eventToSchedule;
}

async function insertToEvent(newEvent: eventForJSON) {
    const casted: event = {
        id: newEvent.id,
        name: newEvent.name,
        description: newEvent.description,
        date: new Date(newEvent.date),
        updated_at: new Date(newEvent.updated_at)
    }
    const insertedEventId: { id: number }[] = await database("event").insert({
        "name": casted.name,
        "description": casted.description, "date": casted.date, "updated_at": casted.updated_at
    }, ["id"])
    return insertedEventId;
}

async function insertToSchedule(schedules: scheduleForJSON[]) {
    const insertedScheduleIds: { id: number }[] = []
    for (const s of schedules) {
        const casted: schedule = {
            id: s.id,
            name: s.name,
            time: new Date(s.time),
            description: s.description
        }
        const insertedId: { id: number }[] = await database("schedule").insert({
            "name": casted.name,
            "description": casted.description, "time": casted.time
        }, ["id"])
        insertedScheduleIds.push(insertedId[0])
    }
    return insertedScheduleIds;
}

async function insertToEventAndSchedule(eventIdObj: { id: number }[], scheduleIdsObj: { id: number }[]) {
    const eventId = eventIdObj[0].id
    const scheduleIds = scheduleIdsObj.map((obj) => obj.id)
    for (const s of scheduleIds) {
        await database("event_schedule").insert({
            "event_id": eventId,
            "schedule_id": s
        })
    }
    return { eventId, scheduleIds }
}



export {
    selectDetailOfEvent,
    insertDetailOfEvent
}
