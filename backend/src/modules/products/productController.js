const repository = require("./productRepository");

// CREATE
exports.create = (req, res) => {
  repository.create(req.body);
  res.json({ message: "Produto criado" });
};

// READ ALL
exports.list = (req, res) => {
  repository.getAll((data) => {
    res.json(data);
  });
};

// READ BY ID
exports.getById = (req, res) => {
  const id = req.params.id;

  repository.getById(id, (data) => {
    if (!data) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(data);
  });
};

// UPDATE
exports.update = (req, res) => {
  const id = req.params.id;

  repository.update(id, req.body);
  res.json({ message: "Produto atualizado" });
};

// DELETE
exports.remove = (req, res) => {
  const id = req.params.id;

  repository.remove(id);
  res.json({ message: "Produto removido" });
};