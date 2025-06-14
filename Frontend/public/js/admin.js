const api1 = axios.create({
  baseURL: "http://localhost:3001/api",
});

const api2 = axios.create({
  baseURL: "http://localhost:3000/api",
});

let textSections = {
  hero: { title: "", subtitle: "", description: "" },
  times: { title: "", subtitle: "", description: "" },
  campeonatos: { title: "", subtitle: "", description: "" },
};

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
  document.getElementById("selected-user-ra").textContent = user.ra;
  document.getElementById("selected-user-email").textContent = user.email;
  const roleSpan = document.getElementById("selected-user-role");
  roleSpan.textContent = getRoleName(user.role);
  roleSpan.className = `role-badge role-${user.role}`;
  document.getElementById("selected-user").style.display = "block";
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

async function updatePlayer(email, playerData) {
  try {
    const url = `/players/${email}`;
    console.log(`Enviando PUT para ${url} com os dados:`, playerData);
    const response = await api1.put(url, playerData);

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao atualizar jogador:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function deletePlayer(email) {
  try {
    const url = `/players/${email}`;
    const response = await api1.delete(url);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao deletar jogador:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function getMe() {
  try {
    const response = await api2.get("/data");
    const emailCheck = response.data.email;
    const player = await api1.get(`/players?email=${emailCheck}`);
    return player.data;
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário logado:", error);
    throw error;
  }
}
async function getTeamHours(captainEmail) {
  try {
    const url = `/team-hours?email=${captainEmail}`;
    console.log(`Buscando horas da equipe com a URL: ${url}`);
    const response = await api1.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "API Error: Falha ao buscar horas da equipe.",
      error.response?.data || error.message
    );
    throw error;
  }
}

function parseCronToString(cron) {
  try {
    const parts = cron.split(" ");
    const minute = parts[1];
    const hour = parts[2];
    const dayOfWeek = parts[5];

    const days = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    if (dayOfWeek === "*") return `Todos os dias às ${hour}:${minute}`;

    const dayName = days[parseInt(dayOfWeek)];
    return `${dayName} às ${hour}:${minute}`;
  } catch {
    return "Formato inválido";
  }
}

function parseStringToCron(day, time) {
  const [hour, minute] = time.split(":");
  return `0 ${minute} ${hour} * * ${day}`;
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const userProfile = await getMe();
    const userRole = userProfile.role;

    if (userRole === "admin" || userRole === "captain") {
      document.getElementById("training-schedule-card").style.display = "block";
    }

    const loadSchedulesBtn = document.getElementById("load-schedules-btn");
    const schedulesContainer = document.getElementById(
      "training-schedules-container"
    );
    const saveBtnContainer = document.getElementById(
      "save-all-schedules-container"
    );
    const saveAllBtn = document.getElementById("save-all-schedules-btn");

    const updateUserBtn = document.getElementById("update-user-btn");
    const deleteUserBtn = document.getElementById("delete-user-btn");

    updateUserBtn.addEventListener("click", async () => {
      const emailToUpdate = document.getElementById("user-email").value;

      if (!emailToUpdate) {
        showAlert(
          "role-alert",
          "role-status",
          "Primeiro, busque um usuário para poder editar.",
          "danger"
        );
        return;
      }

      const playerData = {
        ra: document.getElementById("ra").value,
        discordid: document.getElementById("discord-id").value,
        modalityId: document.getElementById("modality-id").value,
        email: emailToUpdate,
        role: document.getElementById("user-role").value,
      };

      try {
        await updatePlayer(emailToUpdate, playerData);

        showAlert(
          "role-alert",
          "role-status",
          "Usuário atualizado com sucesso!",
          "success"
        );

        document.getElementById("role-form").reset();
        document.getElementById("selected-user").style.display = "none";
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Falha ao atualizar usuário.";
        showAlert("role-alert", "role-status", errorMessage, "danger");
      }
    });

    deleteUserBtn.addEventListener("click", async (e) => {
      const emailToDelete = document.getElementById("user-email").value;
      console.log(emailToDelete);
      console.log("emailToDelete");

      if (!emailToDelete) return;

      if (
        confirm(
          `Tem certeza que deseja excluir o usuário ${emailToDelete}? Esta ação não pode ser desfeita.`
        )
      ) {
        try {
          await deletePlayer(emailToDelete);
          showAlert(
            "role-alert",
            "role-status",
            "Usuário deletado com sucesso!",
            "success"
          );
          document.getElementById("role-form").reset();
          document.getElementById("selected-user").style.display = "none";
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Falha ao deletar usuário.";
          showAlert("role-alert", "role-status", errorMessage, "danger");
        }
      }
    });

    loadSchedulesBtn.addEventListener("click", async () => {
      schedulesContainer.innerHTML =
        '<p class="text-center">Carregando horários...</p>';
      try {
        const response = await api1.get(
          `/trainings?email=${userProfile.email}`
        );
        const schedulesByModality = response.data;

        let finalHtml = "";
        for (const modalityId in schedulesByModality) {
          const team = schedulesByModality[modalityId];
          finalHtml += `
                    <div class="status-display mb-3" data-modality-id="${modalityId}">
                        <h5>Horários para: ${team.Name} (${team.Tag})</h5>
                        <div class="schedule-entries">
                `;
          team.ScheduledTrainings.forEach((schedule, index) => {
            finalHtml += `
                        <div class="row align-items-center mb-2 schedule-entry" data-index="${index}">
                            <div class="col-5">
                                <label class="form-label">Início (CRON)</label>
                                <input type="text" class="form-control admin-form-control cron-start" value="${
                                  schedule.Start
                                }">
                            </div>
                            <div class="col-5">
                                <label class="form-label">Fim (CRON)</label>
                                <input type="text" class="form-control admin-form-control cron-end" value="${
                                  schedule.End
                                }">
                            </div>
                            <div class="col-2 d-flex align-items-end">
                                <button class="btn btn-sm btn-danger remove-schedule-btn">X</button>
                            </div>
                            <div class="col-12">Início: ${parseCronToString(
                              schedule.Start
                            )} | Fim: ${parseCronToString(schedule.End)}</div>
                        </div>
                    `;
          });
          finalHtml += `
                        </div>
                        <button class="btn btn-sm btn-info mt-2 add-schedule-btn">+ Adicionar Horário</button>
                    </div>
                `;
        }
        schedulesContainer.innerHTML = finalHtml;
        saveBtnContainer.style.display = "block";
      } catch (error) {
        showAlert(
          "training-alert",
          "training-status",
          "Erro ao carregar horários.",
          "danger"
        );
      }
    });

    saveAllBtn.addEventListener("click", async () => {
      const modalityDivs =
        schedulesContainer.querySelectorAll("[data-modality-id]");
      try {
        for (const div of modalityDivs) {
          const modalityId = div.dataset.modalityId;
          const newSchedules = [];
          const entries = div.querySelectorAll(".schedule-entry");
          entries.forEach((entry) => {
            const startCron = entry.querySelector(".cron-start").value;
            const endCron = entry.querySelector(".cron-end").value;
            if (startCron && endCron) {
              newSchedules.push({ Start: startCron, End: endCron });
            }
          });

          await api1.put(`/trainings/${modalityId}`, {
            schedules: newSchedules,
          });
        }
        showAlert(
          "training-alert",
          "training-status",
          "Todos os horários foram salvos com sucesso!",
          "success"
        );
      } catch (error) {
        showAlert(
          "training-alert",
          "training-status",
          "Erro ao salvar os horários.",
          "danger"
        );
      }
    });

    schedulesContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-schedule-btn")) {
        e.target.closest(".schedule-entry").remove();
      }
      if (e.target.classList.contains("add-schedule-btn")) {
        const entriesContainer = e.target.previousElementSibling;
        const newEntryHtml = `
                <div class="row align-items-center mb-2 schedule-entry" data-index="${entriesContainer.children.length}">
                    <div class="col-5">
                        <label class="form-label ">Início (CRON)</label>
                        <input type="text" class="form-control admin-form-control cron-start" value="0 00 18 * * 1">
                    </div>
                    <div class="col-5">
                        <label class="form-label ">Fim (CRON)</label>
                        <input type="text" class="form-control admin-form-control cron-end" value="0 00 20 * * 1">
                    </div>
                    <div class="col-2 d-flex align-items-end">
                        <button class="btn btn-sm btn-danger remove-schedule-btn">X</button>
                    </div>
                    <div class="col-12">Preview será exibido após salvar e recarregar.</div>
                </div>
            `;
        entriesContainer.insertAdjacentHTML("beforeend", newEntryHtml);
      }
    });

    if (userRole === "admin") {
      document.getElementById("text-editor-card").style.display = "block";
      document.getElementById("role-assignment-card").style.display = "block";
      document.getElementById("admin-pae-form-container").style.display =
        "block";
      document.getElementById("player-captain-pae-container").style.display =
        "none";
    }

    loadContent();
  } catch (error) {
    console.error("Não foi possível obter o perfil do usuário.", error);
  }

  const textSectionSelect = document.getElementById("text-section");
  const textForm = document.getElementById("text-form");
  const searchUserBtn = document.getElementById("search-user");
  const roleForm = document.getElementById("role-form");
  const paeForm = document.getElementById("pae-form");
  const buttonConsult = document.getElementById("buttonConsult");

  textSectionSelect.addEventListener("change", function () {
    updateCurrentText(this.value);
  });

  roleForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const ra = document.getElementById("ra").value;
    const discordId = document.getElementById("discord-id").value;
    const modalityId = document.getElementById("modality-id").value;
    const email = document.getElementById("user-email").value;
    const role = document.getElementById("user-role").value;

    if (!ra || !email || !role || !modalityId || !discordId) {
      showAlert(
        "role-alert",
        "role-status",
        "Por favor, preencha RA, Email e Cargo.",
        "danger"
      );
      return;
    }

    try {
      await api1.post("/players", { ra, modalityId, discordId, email, role });
      showAlert(
        "role-alert",
        "role-status",
        `Usuário ${email} adicionado com sucesso!`,
        "success"
      );
      roleForm.reset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Falha ao adicionar usuário.";
      showAlert("role-alert", "role-status", errorMessage, "danger");
    }
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

  searchUserBtn.addEventListener("click", async () => {
    const emailInput = document.getElementById("user-email");
    const email = emailInput.value;

    if (!email) {
      showAlert(
        "role-alert",
        "role-status",
        "Por favor, digite um email para buscar.",
        "danger"
      );
      return;
    }

    try {
      const player = await api1.get(`/players?email=${email}`);
      showUserInfo(player.data);
      showAlert(
        "role-alert",
        "role-status",
        "Usuário encontrado com sucesso!",
        "success"
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Usuário não encontrado.";
      showAlert("role-alert", "role-status", errorMessage, "danger");
      document.getElementById("selected-user").style.display = "none";
    }
  });

  // paeForm.addEventListener("submit", async function (e) {
  //   e.preventDefault();
  //   const email = document
  //     .getElementById("pae-user-email")
  //     .value.trim()
  //     .toLowerCase();
  //   const errorBox = document.getElementById("pae-alert");
  //   const statusBox = document.getElementById("pae-status");
  //   const resultsBox = document.getElementById("pae-results");
  //   const activities = document.getElementById("pae-activities");

  //   try {
  //     const res = await api1.get(`/my-hours?email=${email}`);
  //     const { name, email: userEmail, hours, sessions } = res.data;

  //     document.getElementById("pae-user-email-display").textContent = userEmail;
  //     document.getElementById("pae-user-ra").textContent = ra;
  //     document.getElementById("pae-user-role").textContent = role;
  //     document.getElementById("pae-total-hours").textContent = `${hours} h`;
  //     document.getElementById("pae-last-update").textContent =
  //       new Date().toLocaleDateString("pt-BR");

  //     activities.innerHTML = sessions
  //       .map((s) => {
  //         const entrada = new Date(s.entrance).toLocaleString();
  //         const saida = new Date(s.exit).toLocaleString();
  //         const duracao = (s.duration / 60000).toFixed(1);
  //         return `<div class="user-search-result">${entrada} - ${saida} (${duracao} min) [${s.modality}]</div>`;
  //       })
  //       .join("");

  //     resultsBox.style.display = "block";
  //     statusBox.style.display = "none";
  //   } catch (err) {
  //     console.error("Erro ao consultar horas:", err);
  //     errorBox.textContent =
  //       err.response?.data?.message || "Erro ao buscar horas.";
  //     errorBox.className = "alert alert-danger";
  //     statusBox.style.display = "block";
  //     resultsBox.style.display = "none";
  //   }
  // });

  const paeFormAdmin = document.getElementById("pae-form-admin");
  paeFormAdmin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailToLookup = document.getElementById("pae-user-email").value;
    if (!emailToLookup) {
      showAlert(
        "pae-alert",
        "pae-status",
        "Por favor, digite um email para consultar.",
        "danger"
      );
      return;
    }
    await renderPaeReport({ email: emailToLookup, role: "admin" });
  });

  buttonConsult.addEventListener("click", async (e) => {
    e.preventDefault();
    const loggedInUser = await getMe();
    await renderPaeReport(loggedInUser);
  });

  async function renderPaeReport(user) {
    const resultsContainer = document.getElementById("pae-results");
    resultsContainer.innerHTML = '<p class="text-center">Buscando dados...</p>';
    resultsContainer.style.display = "block";
    document.getElementById("pae-status").style.display = "none";

    try {
      let allPlayers = [];

      if (user.role === "admin") {
        const playerData = await api1.get(`/my-hours?email=${user.email}`);
        allPlayers = [playerData.data];
      } else if (user.role === "captain") {
        const teamReport = await api1.get(`/team-hours?email=${user.email}`);
        allPlayers = [teamReport.data, ...teamReport.data.teamData];
      } else if (user.role === "player") {
        const playerData = await api1.get(`/my-hours?email=${user.email}`);
        allPlayers = [playerData.data];
      } else {
        showAlert(
          "pae-alert",
          "pae-status",
          "Consulta não disponível para este cargo.",
          "warning"
        );
        resultsContainer.innerHTML = "";
        return;
      }

      let finalHtml = "";
      allPlayers.forEach((player) => {
        finalHtml += `
              <div class="status-display mb-3">
                <h5>Informações de: ${player.email}</h5>
                <div class="row">
                  <div class="col-md-6">
                    <p><strong>RA:</strong> <span>${
                      player.ra || "N/A"
                    }</span></p>
                    <p><strong>Cargo:</strong> <span>${getRoleName(
                      player.role
                    )}</span></p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Horas PAE Totais:</strong> <span class="text-info fw-bold">${
                      player.hours
                    }h</span></p>
                  </div>
                </div>
                <div class="mt-3">
                  <h6>Histórico de Atividades</h6>
                  <div class="mt-2">
                    ${
                      player.sessions && player.sessions.length > 0
                        ? player.sessions
                            .map((session) => {
                              const durationInMinutes = (
                                session.duration /
                                1000 /
                                60
                              ).toFixed(0);
                              const entranceDate = new Date(
                                session.entrance
                              ).toLocaleDateString("pt-BR");
                              return `<div class="user-search-result">Sessão em ${entranceDate} - Duração: ${durationInMinutes} min</div>`;
                            })
                            .join("")
                        : '<div class="user-search-result">Nenhuma atividade registrada.</div>'
                    }
                  </div>
                </div>
              </div>
            `;
      });
      resultsContainer.innerHTML = finalHtml;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Não foi possível consultar as horas.";
      showAlert("pae-alert", "pae-status", errorMessage, "danger");
      resultsContainer.style.display = "none";
    }
  }

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
