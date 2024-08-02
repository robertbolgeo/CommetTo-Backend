import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable("event_schedule", (table) => {
		table.dropForeign("event_id");
		table.dropForeign("schedule_id");
		table
			.foreign("event_id")
			.references("event.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table
			.foreign("schedule_id")
			.references("schedule.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
	});
}

export async function down(knex: Knex): Promise<void> {}
