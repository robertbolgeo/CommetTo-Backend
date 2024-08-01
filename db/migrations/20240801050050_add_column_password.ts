import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable("event", (table) => {
		table.string("password");
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable("event", (table) => {
		table.dropColumn("password");
	});
}
