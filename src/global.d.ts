interface event {
    id: number,
    name: string
    description: string,
    date: Date,
    updated_at: Date
}

interface eventInfo {
    id: number,
    name: string,
    date: Date
}

interface schedule {
    id: number,
    name: string,
    time: Date,
    description: string
}

interface infoForPage {
    overview: event,
    schedule: schedule[]
}

interface infoForPageFromKnex {
    event_id: number,
    event_name: string
    event_desc: string,
    event_date: Date,
    updated_at: Date,
    schedule_id: number,
    schedule_name: string,
    time: Date,
    schedule_desc: string
}

export {
    event,
    eventInfo,
    schedule,
    infoForPage,
    infoForPageFromKnex
}