import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user', (table) => {
        table.increments('id').primary().notNullable();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.timestamps(true,true);
    });

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user');
}

