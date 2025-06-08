import UIManager from "./components/UIManager.js";
import ApiService from "./services/ApiService.js";

class AdminPageManager {
  constructor() {
    this.api = new ApiService();
    this.initialize();
  }

  async initialize() {
    try {
      await this.api.checkAuth();
      this.initTextManager();
      this.initRoleManager();
      this.initPaeManager();
    } catch (error) {
      console.error("Autenticação falhou, redirecionando para o login.");
      window.location.href = "/";
    }
  }

  initTextManager() {
    const form = document.getElementById("text-form");
    const sectionSelect = document.getElementById("text-section");
    const currentText = document.getElementById("current-text");
    const newText = document.getElementById("new-text");
    let textSections = {};

    this.api.getTexts().then((data) => {
      textSections = data;
      sectionSelect.dispatchEvent(new Event("change"));
    });

    sectionSelect.addEventListener("change", () => {
      currentText.value = textSections[sectionSelect.value] || "";
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const section = sectionSelect.value;
        const text = newText.value;
        await this.api.updateText(section, text);

        textSections[section] = text;
        currentText.value = text;
        newText.value = "";
        UIManager.showAlert(
          "text-alert",
          "text-status",
          "Texto atualizado com sucesso!",
          "success"
        );
      } catch (error) {
        UIManager.showAlert(
          "text-alert",
          "text-status",
          "Erro ao atualizar texto.",
          "danger"
        );
      }
    });
  }

  initRoleManager() {
    const form = document.getElementById("role-form");
    const searchBtn = document.getElementById("search-user");
    const emailInput = document.getElementById("user-email");
    const selectedUserContainer = document.getElementById("selected-user");
    let currentUser = null;

    const showUserInfo = (user) => {
      document.getElementById("selected-user-name").textContent = user.name;
      document.getElementById("selected-user-email").textContent = user.email;
      const roleSpan = document.getElementById("selected-user-role");
      roleSpan.textContent = UIManager.getRoleName(user.role);
      roleSpan.className = `role-badge role-${user.role}`;
      selectedUserContainer.style.display = "block";
    };

    searchBtn.addEventListener("click", async () => {
      const email = emailInput.value;
      if (!email) return;

      currentUser = await this.api.findUserByEmail(email);
      if (currentUser) {
        showUserInfo(currentUser);
      } else {
        UIManager.showAlert(
          "role-alert",
          "role-status",
          "Usuário não encontrado.",
          "danger"
        );
        selectedUserContainer.style.display = "none";
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!currentUser) {
        UIManager.showAlert(
          "role-alert",
          "role-status",
          "Primeiro busque e encontre um usuário.",
          "danger"
        );
        return;
      }
      const role = document.getElementById("user-role").value;
      currentUser.role = role;
      showUserInfo(currentUser);
      UIManager.showAlert(
        "role-alert",
        "role-status",
        `Cargo atribuído com sucesso!`,
        "success"
      );
    });
  }

  initPaeManager() {
    const form = document.getElementById("pae-form");
    const emailInput = document.getElementById("pae-user-email");
    const resultsContainer = document.getElementById("pae-results");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = emailInput.value;
      if (!email) return;

      const user = await this.api.findUserByEmail(email);
      if (user) {
        document.getElementById("pae-user-name").textContent = user.name;
        document.getElementById("pae-user-email-display").textContent =
          user.email;
        document.getElementById("pae-user-ra").textContent = user.ra;
        document.getElementById("pae-user-role").textContent =
          UIManager.getRoleName(user.role);
        document.getElementById(
          "pae-total-hours"
        ).textContent = `${user.paeHours}h`;
        document.getElementById("pae-last-update").textContent =
          new Date().toLocaleDateString("pt-BR");
        resultsContainer.style.display = "block";
        document.getElementById("pae-status").style.display = "none";
      } else {
        UIManager.showAlert(
          "pae-alert",
          "pae-status",
          "Usuário não encontrado.",
          "danger"
        );
        resultsContainer.style.display = "none";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AdminPageManager();
});
