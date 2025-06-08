export default class ApiService {
  constructor(baseURL = "http://localhost:3001") {
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
    return api1.get("/api/data");
  }

  async getTexts() {
    console.log("Buscando textos da API real...");
    const res = await this.axios.get("/api/content");
    return res.data;
  }

  async updateText(containerId, dbField, value) {
    const url = `/api/content/${containerId}`;
    const body = { [dbField]: value };
    console.log(`Enviando PATCH para ${url} com o corpo:`, body);
    const res = await this.axios.patch(url, body);
    return res.data;
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
