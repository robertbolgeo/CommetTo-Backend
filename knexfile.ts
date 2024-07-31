// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config({
    path: [".env.local", ".env"],
  });
  require("ts-node/register");
  
  module.exports = {
    client: "postgresql",
    connection: process.env.DATABASE_URL || {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      extensions: "ts",
    },
    seeds: {
      directory: "./db/seeds",
    },
  };