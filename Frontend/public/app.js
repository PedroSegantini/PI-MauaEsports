// Configuração do Axios
const api1 = axios.create({
  baseURL: "http://localhost:3001",
});

async function loadContent() {
  try {
    const response = await api1.get("/content");
    const contents = response.data;

    contents.forEach((content) => {
      const section = document.getElementById(content.containerId);
      if (section) {
        const mainTitle = section.querySelector("h1, h2");
        if (mainTitle && content.titulo) {
          mainTitle.textContent = content.titulo;
        }

        const subtitle = section.querySelector(".team-name, .h3");
        if (subtitle && content.subtitulo) {
          subtitle.textContent = content.subtitulo;
        }

        const paragraph = section.querySelector(".text-default");
        if (paragraph && content.paragrafo) {
          paragraph.textContent = content.paragrafo;
        }
      }
    });
  } catch (error) {
    console.error("Erro ao carregar conteúdo:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarBrand = document.querySelector(".navbar-brand");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navbarToggler.addEventListener("click", function () {
    navbarBrand.classList.toggle("mobile-hidden");
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
          navbarBrand.classList.remove("mobile-hidden");
        }
      }
    });
  });

  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(4, 13, 29, 0.95)";
    } else {
      navbar.style.backgroundColor = "var(--color-bg)";
    }
  });

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
