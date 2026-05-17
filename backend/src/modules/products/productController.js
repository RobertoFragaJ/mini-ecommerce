const repository = require("./productRepository");

exports.list = (req, res) => {
  try {
    const products = repository.getAll();
    res.json(products);
  } catch (error) {
    console.error("Error listing products:", error);
    res.status(500).json({ message: "Erro ao listar produtos" });
  }
};

exports.getById = (req, res) => {
  try {
    const product = repository.getById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error getting product by id:", error);
    res.status(500).json({ message: "Erro ao consultar produto" });
  }
};

exports.create = (req, res) => {
  try {
    repository.create(req.body);
    res.json({ message: "Produto criado com sucesso" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Erro ao criar produto" });
  }
};

exports.update = (req, res) => {
  try {
    repository.update(req.params.id, req.body);
    res.json({ message: "Produto atualizado" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
};

exports.remove = (req, res) => {
  try {
    repository.remove(req.params.id);
    res.json({ message: "Produto removido" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ message: "Erro ao remover produto" });
  }
};