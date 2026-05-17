const express = require("express");
const cors = require("cors");

require("./database/db");

const app = express();
const productRoutes = require("./modules/products/productRoutes");

app.use(cors());
app.use(express.json());
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});