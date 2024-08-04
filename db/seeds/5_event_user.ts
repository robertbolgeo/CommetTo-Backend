import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("event_user").del();

	// Inserts seed entries
	await knex("event_user").insert([
		{ event_id: 600, user_id: 100 },
		{ event_id: 601, user_id: 100 },
		{ event_id: 602, user_id: 101 },
	]);
};
