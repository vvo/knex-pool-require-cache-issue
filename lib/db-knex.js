const knex = require("knex");

const pg = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

module.exports = {
  query(sql) {
    return pg.raw(sql);
  },
};
