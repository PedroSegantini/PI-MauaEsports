export default class ApiService {
  constructor(baseURL = "http://localhost:3000") {
    const token = localStorage.getItem("userToken");
    this.axios = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async checkAuth() {
    return this.axios.get("/api/data");
  }

  async getTexts() {
    // return this.axios.get("/api/texts");
    console.log("Buscando textos da API...");
    return {
      "hero-title": "QUEM SOMOS?",
      "hero-subtitle": "Mauá Esports",
    };
  }

  async updateText(section, newText) {
    // return this.axios.put(`/api/texts/${section}`, { text: newText });
    console.log(`Atualizando texto de ${section} para "${newText}"`);
    return { success: true, message: "Texto atualizado com sucesso!" };
  }

  async findUserByEmail(email) {
    console.log(`Procurando por usuário com e-mail: ${email}`);
    const mockUsers = [
      {
        name: "João Silva",
        email: "joao.silva@maua.br",
        role: "admin",
        ra: "22.01234-5",
        paeHours: 120,
      },
      {
        name: "Maria Santos",
        email: "maria.santos@maua.br",
        role: "captain",
        ra: "22.05678-9",
        paeHours: 85,
      },
    ];
    return mockUsers.find((u) => u.email === email);
  }

  async getMyHours() {
    return this.axios.get("/api/my-hours");
  }
}
