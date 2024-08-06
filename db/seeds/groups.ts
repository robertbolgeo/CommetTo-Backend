import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("groups").del();

    // Inserts seed entries
    await knex("groups").insert([
        { group_name: "rocket" },
        { group_name: "mean_girls"  },
        { group_name: "kind girls" }
    ]);
};
