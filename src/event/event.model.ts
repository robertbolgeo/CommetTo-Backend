import { event, infoForPage, infoForPageFromKnex } from "../global";
import { database } from "../knex";

function castResult(result: infoForPageFromKnex[]) {
    let forController: infoForPage = {
        overview: {
            id: 0,
            name: "",
            description: "",
            date: new Date(),
            updated_at: new Date()
        },
        schedule: []
    }
    forController.overview.id = result[0].event_id;
    forController.overview.name = result[0].event_name;
    forController.overview.description = result[0].event_desc;
    forController.overview.date = result[0].event_date
    forController.overview.updated_at = result[0].updated_at
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

export {
    selectDetailOfEvent
}
