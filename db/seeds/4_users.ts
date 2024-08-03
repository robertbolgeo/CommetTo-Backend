import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    // Inserts seed entries
    await knex("user").insert([
			{
				id: 100,
				username: "user",
				password: "password",
				email: "email@email.com",
			},
			{
				id: 101,
				username: "friendly",
				password: "qwerty",
				email: "ciao@email.com",
			},
			{
				id: 102,
				username: "condition",
				password: "asdf",
				email: "condition@email.com",
			},
		]);
};
