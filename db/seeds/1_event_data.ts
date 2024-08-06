import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("event").del();

    // Inserts seed entries
    await knex("event").insert([
        { name: "Beer party", description: "A friendly party with cohorts", date: new Date("2024-08-05"), updated_at : new Date("2024-07-31")},
        { name: "Pizza party", description: "A pizza party after midterm review", date: new Date("2024-07-30"), updated_at : new Date("2024-07-30")},
        { name: "How do a to do list", description: "Schedule for a to do list", date: new Date("2024-08-03"), updated_at : new Date("2024-07-28")},
    ]);
};
