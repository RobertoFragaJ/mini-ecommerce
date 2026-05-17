const repository = require("./userRepository");

// CREATE
exports.create = (req, res) => {
  repository.create(req.body);
  res.json({ message: "Usuário criado" });
};

// READ ALL
exports.list = (req, res) => {
  repository.getAll((data) => {
    res.json(data);
  });
};

// READ BY ID
exports.getById = (req, res) => {
  repository.getById(req.params.id, (data) => {
    if (!data) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(data);
  });
};

// UPDATE
exports.update = (req, res) => {
  repository.update(req.params.id, req.body);
  res.json({ message: "Usuário atualizado" });
};

// DELETE
exports.remove = (req, res) => {
  repository.remove(req.params.id);
  res.json({ message: "Usuário removido" });
};