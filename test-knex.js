const http = require("http");
const path = require("path");

const server = http.createServer(async (req, res) => {
  const db = require("./lib/db-knex");
  try {
    await db.query("SELECT 1;");
  } catch (e) {
    console.error(e);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("not ok, check the terminal of your Node.js server\n");
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("okay\n");
  delete require.cache[path.join(__dirname, "lib/db-knex.js")];
});

server.listen(3000);
