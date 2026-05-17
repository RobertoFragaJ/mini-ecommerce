const db = require("../../database/db");

// CREATE
exports.create = (user) => {
  db.run(
    `INSERT INTO users (nome, email, senha, perfil, ativo)
     VALUES (?, ?, ?, ?, ?)`,
    [
      user.nome,
      user.email,
      user.senha,
      user.perfil,
      user.ativo
    ]
  );
};

// READ ALL
exports.getAll = (callback) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    callback(rows);
  });
};

// READ BY ID
exports.getById = (id, callback) => {
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    callback(row);
  });
};

// UPDATE
exports.update = (id, user) => {
  db.run(
    `UPDATE users SET
      nome = ?,
      email = ?,
      senha = ?,
      perfil = ?,
      ativo = ?
     WHERE id = ?`,
    [
      user.nome,
      user.email,
      user.senha,
      user.perfil,
      user.ativo,
      id
    ]
  );
};

// DELETE
exports.remove = (id) => {
  db.run("DELETE FROM users WHERE id = ?", [id]);
};