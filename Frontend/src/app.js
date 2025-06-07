// Configuração do Axios
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Função para carregar o conteúdo dinâmico
async function loadContent() {
  try {
    const response = await api.get("/content");
    const contents = response.data;

    // Para cada conteúdo retornado da API
    contents.forEach((content) => {
      // Encontra a seção correspondente pelo containerId
      const section = document.getElementById(content.containerId);
      if (section) {
        // Atualiza o título principal (h2)
        const mainTitle = section.querySelector("h1, h2");
        if (mainTitle && content.titulo) {
          mainTitle.textContent = content.titulo;
        }

        // Atualiza o subtítulo (h2.team-name ou h3)
        const subtitle = section.querySelector(".team-name, .h3");
        if (subtitle && content.subtitulo) {
          subtitle.textContent = content.subtitulo;
        }

        // Atualiza o parágrafo
        const paragraph = section.querySelector(".text-default");
        if (paragraph && content.paragrafo) {
          paragraph.textContent = content.paragrafo;
        }
      }
    });
  } catch (error) {
    console.error("Erro ao carregar conteúdo:", error);
    // Aqui você pode adicionar um tratamento de erro mais amigável ao usuário
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Navbar brand control for mobile menu
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarBrand = document.querySelector(".navbar-brand");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navbarToggler.addEventListener("click", function () {
    navbarBrand.classList.toggle("mobile-hidden");
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
        // Close mobile menu if open
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
          navbarBrand.classList.remove("mobile-hidden");
        }
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(4, 13, 29, 0.95)";
    } else {
      navbar.style.backgroundColor = "var(--color-bg)";
    }
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  window.addEventListener("scroll", function () {
    let nav = document.querySelector(".navbar");

    nav.classList.toggle("rolagem", window.scrollY > 0);
  });
});
