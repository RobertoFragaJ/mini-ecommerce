const repository = require("./userRepository");

exports.list = (req, res) => {
  const users = repository.getAll();
  res.json(users);
};

exports.getById = (req, res) => {
  const user = repository.getById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  res.json(user);
};

exports.create = (req, res) => {
  repository.create(req.body);
  res.json({ message: "Usuário criado com sucesso" });
};

exports.update = (req, res) => {
  repository.update(req.params.id, req.body);
  res.json({ message: "Usuário atualizado" });
};

exports.remove = (req, res) => {
  repository.remove(req.params.id);
  res.json({ message: "Usuário removido" });
};