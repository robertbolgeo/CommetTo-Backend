import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("invitations", (table) => {
        table.increments('invitation_id').primary().notNullable();
        table.integer('group_id');
        table.integer('user_id');
        table.foreign('group_id').references("groups.group_id");
        table.foreign('user_id').references("user.id"); 
        table.boolean('accepted').defaultTo(false);
        table.boolean('rejected').defaultTo(false);
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("invitations");
}

