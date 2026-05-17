const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./ecommerce.db");

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      descricao TEXT,
      preco REAL,
      estoque INTEGER,
      categoria TEXT,
      ativo INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT,
      senha TEXT,
      perfil TEXT,
      ativo INTEGER
    )
  `);

});

module.exports = db;