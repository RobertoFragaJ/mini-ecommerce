const repository = require("./productRepository");

exports.list = (req, res) => {
  const products = repository.getAll();
  res.json(products);
};

exports.getById = (req, res) => {
  const product = repository.getById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  res.json(product);
};

exports.create = (req, res) => {
  repository.create(req.body);
  res.json({ message: "Produto criado com sucesso" });
};

exports.update = (req, res) => {
  repository.update(req.params.id, req.body);
  res.json({ message: "Produto atualizado" });
};

exports.remove = (req, res) => {
  repository.remove(req.params.id);
  res.json({ message: "Produto removido" });
};