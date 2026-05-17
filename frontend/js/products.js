const api = "http://localhost:3000/products";

let allProducts = [];

let currentPage = 1;
const itemsPerPage = 6;

// LISTAR
async function loadProducts() {

  const res = await fetch(api);

  const data = await res.json();

  allProducts = data;

  renderProducts(data);

}

function renderProducts(products) {

  const lista = document.getElementById("lista");

  lista.innerHTML = "";

  // INÍCIO/FIM DA PÁGINA
  const start =
    (currentPage - 1) * itemsPerPage;

  const end =
    start + itemsPerPage;

  const paginatedItems =
    products.slice(start, end);

  paginatedItems.forEach(p => {

    lista.innerHTML += `
      <div class="card">

        <h3>${p.nome}</h3>

        <p>R$ ${p.preco}</p>

        <button onclick="viewProduct(${p.id})">
          Ver
        </button>

        <button onclick="editProduct(${p.id})">
          Editar
        </button>

        <button onclick="deleteProduct(${p.id})">
          Excluir
        </button>

      </div>
    `;

  });

  renderPagination(products);

}

function renderPagination(products) {

  const totalPages =
    Math.ceil(products.length / itemsPerPage);

  const pagination =
    document.getElementById("pagination");

  pagination.innerHTML = "";

  // BOTÃO ANTERIOR
  pagination.innerHTML += `
    <button
      onclick="changePage(${currentPage - 1})"
      ${currentPage === 1 ? "disabled" : ""}
    >
      Anterior
    </button>
  `;

  // NÚMEROS
  for (let i = 1; i <= totalPages; i++) {

    pagination.innerHTML += `
      <button onclick="changePage(${i})">
        ${i}
      </button>
    `;

  }

  // BOTÃO PRÓXIMO
  pagination.innerHTML += `
    <button
      onclick="changePage(${currentPage + 1})"
      ${currentPage === totalPages ? "disabled" : ""}
    >
      Próximo
    </button>
  `;
}

function changePage(page) {

  const totalPages =
    Math.ceil(allProducts.length / itemsPerPage);

  if (page < 1 || page > totalPages) {
    return;
  }

  currentPage = page;

  renderProducts(allProducts);

}

function filterProducts() {

  const value =
    document
      .getElementById("search")
      .value
      .toLowerCase();

  const filtered = allProducts.filter(p =>
    p.nome.toLowerCase().includes(value)
  );
  
  currentPage = 1;
  renderProducts(filtered);

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