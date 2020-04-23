const knex = require("knex");
let pg;

if (process.env.NODE_ENV === "development") {
  global.pg =
    global.pg ||
    knex({
      client: "pg",
      connection: process.env.DATABASE_URL,
    });

  pg = global.pg;
} else {
  pg = knex({
    client: "pg",
    connection: process.env.DATABASE_URL,
  });
}

module.exports = {
  query(sql) {
    return pg.raw(sql);
  },
};
