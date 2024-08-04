import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("event_user", (table) => {
		table.integer("event_id").unsigned().notNullable();
		table.integer("user_id").unsigned().notNullable();
		table
			.foreign("event_id")
			.references("event.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table
			.foreign("user_id")
			.references("user.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("event_user");
}
