import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('event_schedule', (table) => {
        table.integer('event_id').unsigned().notNullable();
        table.integer('schedule_id').unsigned().notNullable();
        table.foreign('event_id').references('event.id').onUpdate('CASCADE');
        table.foreign('schedule_id').references('schedule.id').onDelete('CASCADE');
        table.unique(['event_id', "schedule_id"], {
            indexName: "event_schedule_index",
        })
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("event_schedule");
}

