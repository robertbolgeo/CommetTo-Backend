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

export {
    event,
    eventInfo,
    schedule
}