import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("invitations").del();
        
    // Inserts seed entries
    await knex("invitations").insert([
        {    
            accepted: false,
            rejected: false,
        },
        {  
            accepted: true,
            rejected: false, },
        {  
            accepted: true,
            rejected: false, }
    ]);
};




  