import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("schedule", (table) => {
        table.increments('id').primary();
        table.string("name",24);
        table.text("description");
        table.time("time").notNullable();
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('schedule');
}

