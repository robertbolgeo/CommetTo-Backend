import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user', (table) => {
        table.integer('id').primary().notNullable();
        table.string('user').notNullable;
        table.string('password').notNullable();
        table.string('email').notNullable();
    });

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user');
}

