const { Model } = require("objection");
const Knex = require("knex");

const knex = Knex({
  client: "pg",
  connection: {
    user: "postgres",
    host: "localhost",
    database: "todoapp",
    password: "Ravi@1234",
    port: 5432,
  },
});

Model.knex(knex);

module.exports = { knex, Model };
