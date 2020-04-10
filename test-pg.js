const http = require("http");
const path = require("path");

const server = http.createServer(async (req, res) => {
  const db = require("./lib/db-pg");
  try {
    await db.query("SELECT 1;");
  } catch (e) {
    // We will not get there, but this is for example completion
    console.error(e);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("not ok, check the terminal of your Node.js server");
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("okay");
  delete require.cache[path.join(__dirname, "lib/db-knex.js")];
});

server.listen(3000);
