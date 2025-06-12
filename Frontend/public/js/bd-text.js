import Navbar from "./components/Navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  new Navbar();
});

document.addEventListener("DOMContentLoaded", () => {
  loadDynamicContent();
});

async function loadDynamicContent() {
  try {
    const api = axios.create({
      baseURL: "http://localhost:3001/api",
    });

    const response = await api.get("/content");
    const contents = response.data;

    if (!contents || contents.length === 0) {
      console.warn("Nenhum conteúdo encontrado no banco de dados");
      return;
    }

    const sections = ["hero", "times", "campeonatos"];
    sections.forEach((sectionId) => {
      const sectionContent = contents.find(
        (content) => content.containerId === sectionId
      );

      if (sectionContent) {
        const fields = ["titulo", "subtitulo", "paragrafo"];

        fields.forEach((field) => {
          const element = document.querySelector(
            `[data-content-id="${sectionId}-${field}"]`
          );

          if (element && sectionContent[field]) {
            const cleanContent = sectionContent[field].trim();
            element.textContent = cleanContent;

            if (!cleanContent && field !== "titulo") {
              element.style.display = "none";
            } else {
              element.style.display = "";
            }
          }
        });
      } else {
        console.warn(`Conteúdo não encontrado para a seção: ${sectionId}`);
      }
    });

    console.log("Conteúdo carregado com sucesso!");
  } catch (error) {
    console.error("Erro ao carregar conteúdo:", error);

    if (error.response) {
      console.error(
        `Erro ${error.response.status}: ${error.response.statusText}`
      );
    } else if (error.request) {
      console.error("Erro de conexão com o servidor");
    } else {
      console.error("Erro ao processar a requisição:", error.message);
    }
  }
}
