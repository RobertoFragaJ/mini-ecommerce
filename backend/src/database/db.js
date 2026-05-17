const Database = require("better-sqlite3");
const path = require("path");

// cria arquivo .db
const db = new Database(
  path.resolve(__dirname, "ecommerce.db")
);

module.exports = db;