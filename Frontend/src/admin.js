document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");

  if (!token || userRole !== "admin") {
    window.location.href = "login.html";
    return;
  }

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: { Authorization: `Bearer ${token}` },
  });

  const playerForm = document.getElementById("player-form");
  const formTitle = document.getElementById("form-title");
  const playerIdInput = document.getElementById("playerId");
  const nameInput = document.getElementById("name");
  const raInput = document.getElementById("ra");
  const discordIdInput = document.getElementById("discordId");
  const roleInput = document.getElementById("role");
  const passwordInput = document.getElementById("password");
  const cancelEditBtn = document.getElementById("cancel-edit");
  const tableBody = document.getElementById("players-table-body");

  async function fetchAndDisplayPlayers() {
    try {
      const response = await apiClient.get("/api/players");
      const players = response.data;
      tableBody.innerHTML = "";

      if (players.length === 0) {
        tableBody.innerHTML =
          '<tr><td colspan="5" class="text-center">Nenhum jogador cadastrado.</td></tr>';
        return;
      }

      players.forEach((player) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${player.name}</td>
                    <td>${player.ra}</td>
                    <td>${player.discordId}</td>
                    <td>${
                      player.role.charAt(0).toUpperCase() + player.role.slice(1)
                    }</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-2" data-id="${
                          player._id
                        }" data-action="edit">Editar</button>
                        <button class="btn btn-sm btn-danger" data-id="${
                          player._id
                        }" data-action="delete">Excluir</button>
                    </td>
                `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
      if (error.response && error.response.status === 401)
        window.location.href = "login.html";
      tableBody.innerHTML =
        '<tr><td colspan="5" class="text-center text-danger">Falha ao carregar jogadores.</td></tr>';
    }
  }

  function resetForm() {
    playerForm.reset();
    playerIdInput.value = "";
    formTitle.textContent = "Adicionar Novo Jogador";
    passwordInput.placeholder = "Mínimo 6 caracteres";
    passwordInput.required = true;
    cancelEditBtn.style.display = "none";
  }

  async function handleEditClick(id) {
    try {
      const { data: players } = await apiClient.get("/api/players");
      const playerToEdit = players.find((p) => p._id === id);

      if (playerToEdit) {
        playerIdInput.value = playerToEdit._id;
        nameInput.value = playerToEdit.name;
        raInput.value = playerToEdit.ra;
        discordIdInput.value = playerToEdit.discordId;
        roleInput.value = playerToEdit.role;
        passwordInput.placeholder = "Deixe em branco para não alterar";
        passwordInput.required = false;

        formTitle.textContent = "Editando Jogador";
        cancelEditBtn.style.display = "inline-block";
        window.scrollTo(0, 0);
      }
    } catch (error) {
      alert("Não foi possível carregar os dados do jogador para edição.");
    }
  }

  async function handleDeleteClick(id) {
    if (confirm("Tem certeza que deseja excluir este jogador?")) {
      try {
        await apiClient.delete(`/api/players/${id}`);
        fetchAndDisplayPlayers();
      } catch (error) {
        console.error("Erro ao excluir jogador:", error);
        alert("Falha ao excluir jogador.");
      }
    }
  }

  playerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const playerData = {
      name: nameInput.value,
      ra: raInput.value,
      discordId: discordIdInput.value,
      role: roleInput.value,
    };

    if (passwordInput.value) {
      playerData.password = passwordInput.value;
    }

    try {
      const id = playerIdInput.value;
      if (id) {
        await apiClient.put(`/api/players/${id}`, playerData);
      } else {
        await apiClient.post("/api/players", playerData);
      }
      resetForm();
      fetchAndDisplayPlayers();
    } catch (error) {
      const message =
        error.response?.data?.message || "Falha ao salvar jogador.";
      console.error("Erro ao salvar jogador:", error);
      alert(message);
    }
  });

  tableBody.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const action = target.dataset.action;
      const id = target.dataset.id;
      if (action === "edit") handleEditClick(id);
      else if (action === "delete") handleDeleteClick(id);
    }
  });

  cancelEditBtn.addEventListener("click", resetForm);

  fetchAndDisplayPlayers();
});
