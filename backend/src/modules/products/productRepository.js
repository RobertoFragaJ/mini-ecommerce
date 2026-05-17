const db = require("../../database/db");

//
// CREATE
//
exports.create = (product) => {
  const stmt = db.prepare(`
    INSERT INTO products (nome, descricao, preco, quantidade, categoria, ativo)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  return stmt.run(
    product.nome,
    product.descricao,
    product.preco,
    product.quantidade,
    product.categoria,
    product.ativo
  );
};

//
// READ ALL
//
exports.getAll = () => {
  const stmt = db.prepare("SELECT * FROM products");
  return stmt.all();
};

//
// READ BY ID
//
exports.getById = (id) => {
  const stmt = db.prepare("SELECT * FROM products WHERE id = ?");
  return stmt.get(id);
};

//
// UPDATE
//
exports.update = (id, product) => {
  const stmt = db.prepare(`
    UPDATE products SET
      nome = ?,
      descricao = ?,
      preco = ?,
      quantidade = ?,
      categoria = ?,
      ativo = ?
    WHERE id = ?
  `);

  return stmt.run(
    product.nome,
    product.descricao,
    product.preco,
    product.quantidade,
    product.categoria,
    product.ativo,
    id
  );
};

//
// DELETE
//
exports.remove = (id) => {
  const stmt = db.prepare("DELETE FROM products WHERE id = ?");
  return stmt.run(id);
};