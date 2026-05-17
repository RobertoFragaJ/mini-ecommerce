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

// Inicializa tabelas se não existirem
const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    descricao TEXT,
    preco REAL,
    quantidade INTEGER,
    categoria TEXT,
    ativo INTEGER
  )
`;

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha TEXT,
    perfil TEXT,
    ativo INTEGER
  )
`;

db.exec(createProductsTable);
db.exec(createUsersTable);

module.exports = db;