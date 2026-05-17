const db = require("../../database/db");

//
// CREATE
//
exports.create = (user) => {
  const stmt = db.prepare(`
    INSERT INTO users (nome, email, senha, perfil, ativo)
    VALUES (?, ?, ?, ?, ?)
  `);

  return stmt.run(
    user.nome,
    user.email,
    user.senha,
    user.perfil,
    user.ativo
  );
};

//
// READ ALL
//
exports.getAll = () => {
  const stmt = db.prepare("SELECT * FROM users");
  return stmt.all();
};

//
// READ BY ID
//
exports.getById = (id) => {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  return stmt.get(id);
};

//
// UPDATE
//
exports.update = (id, user) => {
  const stmt = db.prepare(`
    UPDATE users SET
      nome = ?,
      email = ?,
      senha = ?,
      perfil = ?,
      ativo = ?
    WHERE id = ?
  `);

  return stmt.run(
    user.nome,
    user.email,
    user.senha,
    user.perfil,
    user.ativo,
    id
  );
};

//
// DELETE
//
exports.remove = (id) => {
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  return stmt.run(id);
};