import Navbar from "./components/Navbar.js";
import ApiService from "./services/ApiService.js";

class PublicPage {
  constructor() {
    this.api = new ApiService();
    this.navbar = new Navbar();
  }

  async loadDynamicContent() {
    try {
      console.log(
        "O carregamento de conteúdo dinâmico pode ser implementado aqui."
      );
    } catch (error) {
      console.error("Falha ao carregar conteúdo dinâmico", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PublicPage();
});
