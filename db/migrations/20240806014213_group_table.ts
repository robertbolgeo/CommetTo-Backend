import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("groups", (table) => {
        table.increments('group_id').primary().notNullable();
        table.string("group_name",24).notNullable();
        table.timestamps(true,true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("groups");
}
