import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("event_schedule").del();

    // Inserts seed entries
    await knex("event_schedule").insert([
        { event_id: 600, schedule_id: 800 },
        { event_id: 601, schedule_id: 801 },
        { event_id: 602, schedule_id: 802 },
    ]);
};
