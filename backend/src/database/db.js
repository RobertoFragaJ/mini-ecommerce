const path = require("path");
const child_process = require("child_process");

let Database;
try {
  Database = require("better-sqlite3");
} catch (err) {
  console.warn("better-sqlite3 failed to load, attempting rebuild from source...", err && err.code);
  try {
    child_process.execSync("npm rebuild better-sqlite3 --build-from-source", { stdio: "inherit" });
    Database = require("better-sqlite3");
  } catch (rebuildErr) {
    console.error("Rebuild of better-sqlite3 failed:", rebuildErr);
    throw rebuildErr;
  }
}

// cria arquivo .db
const db = new Database(path.resolve(__dirname, "ecommerce.db"));

module.exports = db;