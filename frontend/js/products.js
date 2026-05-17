const api = "http://localhost:3000/products";

// LISTAR
async function loadProducts() {
  const res = await fetch(api);
  const data = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach(p => {
    lista.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco}</p>

        <button onclick="viewProduct(${p.id})">Ver</button>
        <button onclick="editProduct(${p.id})">Editar</button>
        <button onclick="deleteProduct(${p.id})">Excluir</button>
      </div>
    `;
  });
}

// CREATE / UPDATE (mesmo form)
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;

  const product = {
    nome: document.getElementById("nome").value,
    descricao: document.getElementById("descricao").value,
    preco: document.getElementById("preco").value,
    estoque: document.getElementById("estoque").value,
    categoria: document.getElementById("categoria").value,
    ativo: 1
  };

  if (id) {
    await fetch(`${api}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
  } else {
    await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
  }

  e.target.reset();
  document.getElementById("id").value = "";
  loadProducts();
});

// DELETE
async function deleteProduct(id) {
  if (confirm("Tem certeza que deseja deletar este produto?")) {
    await fetch(`${api}/${id}`, {
      method: "DELETE"
    });

    loadProducts();
  }
}

// EDITAR (preenche form)
async function editProduct(id) {
  const res = await fetch(`${api}/${id}`);
  const p = await res.json();

  document.getElementById("id").value = p.id;
  document.getElementById("nome").value = p.nome;
  document.getElementById("descricao").value = p.descricao;
  document.getElementById("preco").value = p.preco;
  document.getElementById("estoque").value = p.estoque;
  document.getElementById("categoria").value = p.categoria;
}

// VER DETALHES
async function viewProduct(id) {
  const res = await fetch(`${api}/${id}`);
  const p = await res.json();

  document.getElementById("detalhes").innerHTML = `
    Nome: ${p.nome}<br>
    Descrição: ${p.descricao}<br>
    Preço: R$ ${p.preco}<br>
    Estoque: ${p.estoque}<br>
    Categoria: ${p.categoria}
  `;

  document.getElementById("modal").classList.remove("hidden");
}

// FECHAR MODAL
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

loadProducts();