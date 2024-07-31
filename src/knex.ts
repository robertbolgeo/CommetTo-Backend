import Knex from "knex";
const config = require("../knexfile");

export const database = Knex(config);
