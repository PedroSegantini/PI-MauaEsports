// Arquivo: Frontend/public/js/bd-text.js

// Garante que o script só execute após o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {
  loadDynamicContent();
});

// Função para buscar o conteúdo da API e atualizar a página
async function loadDynamicContent() {
  try {
    // 1. Cria uma instância do Axios para se comunicar com a API
    const api = axios.create({
      baseURL: "http://localhost:3001/api",
    });

    // 2. Faz a requisição GET para o endpoint /content
    const response = await api.get("/content");
    const contents = response.data;

    if (!contents || contents.length === 0) {
      console.warn("Nenhum conteúdo encontrado no banco de dados");
      return;
    }

    // 3. Para cada seção no site (hero, times, campeonatos)
    const sections = ["hero", "times", "campeonatos"];
    sections.forEach((sectionId) => {
      // Encontra o conteúdo correspondente no banco de dados
      const sectionContent = contents.find(
        (content) => content.containerId === sectionId
      );

      if (sectionContent) {
        // Lista de campos a serem atualizados
        const fields = ["titulo", "subtitulo", "paragrafo"];

        fields.forEach((field) => {
          // Busca o elemento com o data-attribute correspondente
          const element = document.querySelector(
            `[data-content-id="${sectionId}-${field}"]`
          );

          // Se o elemento existe e há conteúdo para ele, atualiza
          if (element && sectionContent[field]) {
            // Remove espaços extras e quebras de linha
            const cleanContent = sectionContent[field].trim();
            element.textContent = cleanContent;

            // Se está vazio, esconde o elemento (exceto para títulos)
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

    // Tenta identificar o tipo de erro para log mais específico
    if (error.response) {
      // Erro de resposta do servidor
      console.error(
        `Erro ${error.response.status}: ${error.response.statusText}`
      );
    } else if (error.request) {
      // Erro de conexão
      console.error("Erro de conexão com o servidor");
    } else {
      // Outros erros
      console.error("Erro ao processar a requisição:", error.message);
    }
  }
}
