const api1 = axios.create({
  baseURL: "http://localhost:3001/api",
});

let textSections = {
  hero: { title: "", subtitle: "", description: "" },
  times: { title: "", subtitle: "", description: "" },
  campeonatos: { title: "", subtitle: "", description: "" },
};

const mockUsers = [
  {
    name: "João Silva",
    email: "joao.silva@maua.br",
    ra: "22.01234-5",
    role: "admin",
    paeHours: 120,
  },
  {
    name: "Maria Santos",
    email: "maria.santos@maua.br",
    ra: "22.05678-9",
    role: "captain",
    paeHours: 85,
  },
  {
    name: "Pedro Costa",
    email: "pedro.costa@maua.br",
    ra: "22.09876-3",
    role: "player",
    paeHours: 45,
  },
];

function showAlert(alertId, statusId, message, type) {
  const alertEl = document.getElementById(alertId);
  const statusEl = document.getElementById(statusId);
  if (!alertEl || !statusEl) return;
  alertEl.className = `alert alert-${type}`;
  alertEl.textContent = message;
  statusEl.style.display = "block";
  setTimeout(() => {
    statusEl.style.display = "none";
  }, 5000);
}

function getRoleName(role) {
  const roles = {
    admin: "Administrador",
    captain: "Capitão",
    player: "Jogador",
  };
  return roles[role] || role;
}

function showUserInfo(user) {
  document.getElementById("selected-user-name").textContent = user.name;
  document.getElementById("selected-user-email").textContent = user.email;
  const roleSpan = document.getElementById("selected-user-role");
  roleSpan.textContent = getRoleName(user.role);
  roleSpan.className = `role-badge role-${user.role}`;
  document.getElementById("selected-user").style.display = "block";
}

function showPAEInfo(user) {
  document.getElementById("pae-user-name").textContent = user.name;
  document.getElementById("pae-user-email-display").textContent = user.email;
  document.getElementById("pae-user-ra").textContent = user.ra;
  const roleSpan = document.getElementById("pae-user-role");
  roleSpan.textContent = getRoleName(user.role);
  roleSpan.className = `role-badge role-${user.role}`;
  document.getElementById("pae-total-hours").textContent = `${user.paeHours}h`;
  document.getElementById("pae-last-update").textContent =
    new Date().toLocaleDateString("pt-BR");
  const activities = [
    "Participação em campeonato - 20h",
    "Treinamento de equipe - 15h",
    "Organização de evento - 10h",
  ];
  const activitiesDiv = document.getElementById("pae-activities");
  activitiesDiv.innerHTML = activities
    .map((activity) => `<div class="user-search-result">${activity}</div>`)
    .join("");
  document.getElementById("pae-results").style.display = "block";
  document.getElementById("pae-status").style.display = "none";
}

function updateCurrentText(sectionPath) {
  const currentTextInput = document.getElementById("current-text");
  if (!sectionPath) {
    currentTextInput.value = "";
    return;
  }
  const [section, field] = sectionPath.split(".");
  if (
    textSections[section] &&
    typeof textSections[section][field] !== "undefined"
  ) {
    currentTextInput.value = textSections[section][field];
  } else {
    currentTextInput.value = "";
  }
}

async function loadContent() {
  try {
    const response = await api1.get("/content");
    const contents = response.data;
    contents.forEach((content) => {
      if (textSections[content.containerId]) {
        textSections[content.containerId] = {
          title: content.titulo,
          subtitle: content.subtitulo,
          description: content.paragrafo,
        };
      }
    });
    document.getElementById("text-section").dispatchEvent(new Event("change"));
  } catch (error) {
    console.error("Erro ao carregar conteúdo:", error);
    showAlert(
      "text-alert",
      "text-status",
      "Erro ao carregar conteúdo do banco de dados.",
      "danger"
    );
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const textSectionSelect = document.getElementById("text-section");
  const textForm = document.getElementById("text-form");
  const searchUserBtn = document.getElementById("search-user");
  const roleForm = document.getElementById("role-form");
  const paeForm = document.getElementById("pae-form");

  textSectionSelect.addEventListener("change", function () {
    updateCurrentText(this.value);
  });

  textForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const selectedKey = textSectionSelect.value;
    if (!selectedKey) {
      alert("Por favor, selecione uma seção para atualizar.");
      return;
    }
    const newText = document.getElementById("new-text").value;
    const [section, field] = selectedKey.split(".");
    try {
      const updateData = {};
      if (field === "title") updateData.titulo = newText;
      if (field === "subtitle") updateData.subtitulo = newText;
      if (field === "description") updateData.paragrafo = newText;
      const response = await api1.patch(`/content/${section}`, updateData);
      if (response.data) {
        await loadContent();
        document.getElementById("new-text").value = "";
        showAlert(
          "text-alert",
          "text-status",
          "Texto atualizado com sucesso!",
          "success"
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar texto:", error);
      showAlert(
        "text-alert",
        "text-status",
        "Erro ao atualizar o texto no banco de dados.",
        "danger"
      );
    }
  });

  searchUserBtn.addEventListener("click", function () {
    const email = document.getElementById("user-email").value;
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      showUserInfo(user);
    } else {
      showAlert(
        "role-alert",
        "role-status",
        "Usuário não encontrado.",
        "danger"
      );
    }
  });

  roleForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("user-email").value;
    const role = document.getElementById("user-role").value;
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      user.role = role;
      showAlert(
        "role-alert",
        "role-status",
        `Cargo "${getRoleName(role)}" atribuído com sucesso!`,
        "success"
      );
      showUserInfo(user);
    } else {
      showAlert(
        "role-alert",
        "role-status",
        "Usuário não encontrado.",
        "danger"
      );
    }
  });

  paeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("pae-user-email").value;
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      showPAEInfo(user);
    } else {
      showAlert("pae-alert", "pae-status", "Usuário não encontrado.", "danger");
      document.getElementById("pae-results").style.display = "none";
    }
  });

  fetch("/api/data")
    .then((response) => {
      if (response.status === 401) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log(
        "Verificação de autenticação falhou ou está em modo de demonstração."
      );
    });

  loadContent();
});
