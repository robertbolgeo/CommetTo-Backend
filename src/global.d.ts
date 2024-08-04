interface event {
    id: number,
    name: string
    description: string,
    date: Date,
    updated_at: Date
}
interface eventForJSON extends event{
    id: number,
    date: string,
    updated_at: string
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

interface scheduleForJSON extends schedule{
    id: number,
    time: string,
}

interface infoForPage {
    overview: event,
    schedule: schedule[]
}

interface infoForPageForJSON {
    overview: eventForJSON,
    user_id: string,
    schedule: scheduleForJSON[]
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

interface loginRequest {
    username: string,
    password: string,
    id: number
}

interface registerRequest {
	username: string;
	password: string;
    email: string
}

export {
	event,
	eventInfo,
	schedule,
	infoForPage,
	infoForPageFromKnex,
	eventForJSON,
	scheduleForJSON,
	infoForPageForJSON,
	loginRequest,
	registerRequest,
};