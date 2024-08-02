import { event, infoForPage, eventInfo, infoForPageForJSON, infoForPageFromKnex, schedule, eventForJSON, scheduleForJSON } from "../global";
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

//select
async function selectDetailOfEvent(eventId: string) {
    const result = await database().from("event")
        .leftJoin("event_schedule", "event_schedule.event_id", "event.id")
        .leftJoin("schedule", "schedule.id ", "event_schedule.schedule_id")
        .select("event.id as event_id", "event.name as event_name", "event.description as event_desc", "event.date as event_date", "schedule_id",
            "schedule.name as schedule_name", "schedule.description as schedule_desc", "time", "event.updated_at").where("event.id", eventId)
    const casted = castResult(result)
    return casted;
}

async function selectSchedules(eventId: string) {
    const result: { schedule_id: number }[] = await database().from("event_schedule")
        .select("schedule_id").where("event_id", eventId)
    return result;
}

async function selectEachEventInfo() {
    const result: eventInfo[] = await database().from("event")
        .select("id", "name", "date")
    return result;
}

//insert
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

//Update
async function updateEvent(updatedEvent: infoForPageForJSON) {
    const event: eventForJSON = updatedEvent.overview
    const schedules: scheduleForJSON[] = updatedEvent.schedule
    const updateddEventId: number = await updateToEvent(event)
    const updatedScheduleIds: number[] = await updateToSchedule(schedules)
    const deleted = await deleteToEventAndSchedule(event.id)
    const eventToSchedule = await insertToEventAndSchedule([{ id: updateddEventId }], updatedScheduleIds.map((i) => { return { id: i } }))
    return eventToSchedule;
}

async function updateToEvent(event: eventForJSON) {
    const casted: event = {
        id: event.id,
        name: event.name,
        description: event.description,
        date: new Date(event.date),
        updated_at: new Date(event.updated_at)
    }
    const updateddEventId: number = await database("event").update({
        "name": casted.name,
        "description": casted.description, "date": casted.date, "updated_at": casted.updated_at
    }).where("id", "=", casted.id)
    return updateddEventId;
}

async function updateToSchedule(schedules: scheduleForJSON[]) {
    const updatedScheduleIds: number[] = []
    for (const s of schedules) {
        const casted: schedule = {
            id: s.id,
            name: s.name,
            time: new Date(s.time),
            description: s.description
        }
        updatedScheduleIds.push(s.id)
        const updateddId: number = await database("schedule").update({
            "name": casted.name,
            "description": casted.description, "time": casted.time
        }).where("id", "=", casted.id)
    }
    return updatedScheduleIds;
}

//delete
async function deleteEvent(eventId: string) {
    const shcdules: { schedule_id: number }[] = await selectSchedules(eventId)
    await deleteToEventAndSchedule(Number(eventId));
    await deleteToSchedule(shcdules.map((s) => s.schedule_id))
    await deleteToEvent(Number(eventId))
    return;
}

async function deleteToEventAndSchedule(eventId: number) {
    return await database.from("event_schedule").where("event_id", "=", eventId).del()
}

async function deleteToEvent(eventId: number) {
    return await database.from("event").where("id", "=", eventId).del()
}

async function deleteToSchedule(scheduleIds: number[]) {
    return await database.from("schedule").whereIn("id", scheduleIds).del()
}

export {
    selectDetailOfEvent,
    insertDetailOfEvent,
    updateEvent,
    deleteEvent,
    selectEachEventInfo
}
