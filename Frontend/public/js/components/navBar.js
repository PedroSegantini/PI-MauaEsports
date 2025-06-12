export default class Navbar {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.navbarToggler = document.querySelector(".navbar-toggler");
    this.navbarCollapse = document.querySelector(".navbar-collapse");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.sections = document.querySelectorAll("section");

    if (this.navbarCollapse) {
      this.bootstrapCollapse = new bootstrap.Collapse(this.navbarCollapse, {
        toggle: false,
      });
    }

    this.addEventListeners();
  }

  addEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) =>
        this.handleSmoothScroll(e, anchor)
      );
    });

    window.addEventListener("scroll", () => {
      this.handleScrollEffects();
      this.updateActiveNavLink();
    });
  }

  handleSmoothScroll(e, anchor) {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });

      if (this.bootstrapCollapse) {
        this.bootstrapCollapse.hide();
      }
    }
  }

  handleScrollEffects() {
    this.navbar.classList.toggle("rolagem", window.scrollY > 0);
  }

  updateActiveNavLink() {
    let currentSectionId = "";
    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        currentSectionId = section.getAttribute("id");
      }
    });

    this.navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === currentSectionId) {
        link.classList.add("active");
      }
    });
  }
}
