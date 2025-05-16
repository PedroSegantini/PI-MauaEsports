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

    nav.classList.toggle('rolagem', window.scrollY > 0);
    

  });
});
