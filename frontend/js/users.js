const api = "http://localhost:3000/users";

// LISTAR
async function loadUsers() {
  const res = await fetch(api);
  const data = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach(u => {
    lista.innerHTML += `
      <div class="card">
        <h3>${u.nome}</h3>
        <p>${u.email}</p>

        <button onclick="viewUser(${u.id})">Ver</button>
        <button onclick="editUser(${u.id})">Editar</button>
        <button onclick="deleteUser(${u.id})">Excluir</button>
      </div>
    `;
  });
}

// CREATE / UPDATE
document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;

  const user = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
    perfil: document.getElementById("perfil").value,
    ativo: document.getElementById("ativo").value
  };

  if (id) {
    await fetch(`${api}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
  } else {
    await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
  }

  e.target.reset();
  document.getElementById("id").value = "";
  loadUsers();
});

// DELETE
async function deleteUser(id) {
  if (confirm("Tem certeza que deseja deletar este usuário?")) {
    await fetch(`${api}/${id}`, {
      method: "DELETE"
    });

    loadUsers();
  }
}

// EDITAR
async function editUser(id) {
  const res = await fetch(`${api}/${id}`);
  const u = await res.json();

  document.getElementById("id").value = u.id;
  document.getElementById("nome").value = u.nome;
  document.getElementById("email").value = u.email;
  document.getElementById("senha").value = u.senha;
  document.getElementById("perfil").value = u.perfil;
  document.getElementById("ativo").value = u.ativo;
}

// VER DETALHES
async function viewUser(id) {
  const res = await fetch(`${api}/${id}`);
  const u = await res.json();

  document.getElementById("detalhes").innerHTML = `
    Nome: ${u.nome}<br>
    Email: ${u.email}<br>
    Perfil: ${u.perfil}<br>
    Ativo: ${u.ativo}
  `;

  document.getElementById("modal").classList.remove("hidden");
}

// FECHAR MODAL
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

loadUsers();