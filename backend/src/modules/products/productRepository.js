const db = require("../../database/db");

// CREATE
exports.create = (product) => {
  db.run(
    `INSERT INTO products 
    (nome, descricao, preco, estoque, categoria, ativo)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      product.nome,
      product.descricao,
      product.preco,
      product.estoque,
      product.categoria,
      product.ativo
    ]
  );
};

// READ ALL
exports.getAll = (callback) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    callback(rows);
  });
};

// READ BY ID
exports.getById = (id, callback) => {
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    callback(row);
  });
};

// UPDATE
exports.update = (id, product) => {
  db.run(
    `UPDATE products SET 
      nome = ?,
      descricao = ?,
      preco = ?,
      estoque = ?,
      categoria = ?,
      ativo = ?
    WHERE id = ?`,
    [
      product.nome,
      product.descricao,
      product.preco,
      product.estoque,
      product.categoria,
      product.ativo,
      id
    ]
  );
};

// DELETE
exports.remove = (id) => {
  db.run("DELETE FROM products WHERE id = ?", [id]);
};