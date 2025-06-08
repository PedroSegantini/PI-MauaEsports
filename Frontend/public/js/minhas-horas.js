import ApiService from "./services/ApiService.js";

class MyHoursPage {
  constructor() {
    this.api = new ApiService();
    this.elements = {
      loading: document.getElementById("loading-spinner"),
      content: document.getElementById("hours-content"),
      error: document.getElementById("error-message"),
      welcome: document.getElementById("welcome-message"),
      hours: document.getElementById("hours-display"),
    };
    this.fetchHours();
  }

  async fetchHours() {
    try {
      const { data } = await this.api.getMyHours();
      this.renderSuccess(data);
    } catch (error) {
      console.error("Erro ao buscar horas:", error);
      if (error.response?.status === 401) {
        window.location.href = "/";
      }
      const message =
        error.response?.data?.message ||
        "Não foi possível carregar suas horas.";
      this.renderError(message);
    }
  }

  renderSuccess(data) {
    this.elements.loading.style.display = "none";
    this.elements.welcome.textContent = `Olá, ${data.name}!`;
    this.elements.hours.textContent = data.hours.toFixed(2);
    this.elements.content.style.display = "block";
  }

  renderError(message) {
    this.elements.loading.style.display = "none";
    this.elements.error.textContent = message;
    this.elements.error.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new MyHoursPage();
});
