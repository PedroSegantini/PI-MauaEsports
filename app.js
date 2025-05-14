document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector("#menu-mobile");
  const menuLinksContainer = document.querySelector(".nav_menu");
  const navLogo = document.querySelector("#nav_logo");

  const mobileMenu = () => {
    if (menuIcon && menuLinksContainer) {
      menuIcon.classList.toggle("is-active");
      menuLinksContainer.classList.toggle("active");
    }
  };

  if (menuIcon) {
    menuIcon.addEventListener("click", mobileMenu);
  }

  const hideMobileMenu = () => {
    const menuIconIsActive = menuIcon ? menuIcon.classList.contains("is-active") : false;
    if (menuIconIsActive && menuLinksContainer) {
      menuIcon.classList.remove("is-active");
      menuLinksContainer.classList.remove("active");
    }
  };

  if (menuLinksContainer) {
    menuLinksContainer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", hideMobileMenu);
    });
  }
  if (navLogo) {
    navLogo.addEventListener("click", hideMobileMenu);
  }

  const homeMenuLink = document.querySelector("#home-page");
  const teamMenuLink = document.querySelector("#team-page");
  const campeonatosMenuLink = document.querySelector("#campeonatos-page");


  const homeSection = document.getElementById("home");
  const teamSection = document.getElementById("times");
  const campeonatosSection = document.getElementById("campeonatos");

  const menuItems = [];
  if (homeMenuLink && homeSection) {
    menuItems.push({ link: homeMenuLink, section: homeSection });
  }
  if (teamMenuLink && teamSection) {
    menuItems.push({ link: teamMenuLink, section: teamSection });
  }
  if (campeonatosMenuLink && campeonatosSection) {
    menuItems.push({ link: campeonatosMenuLink, section: campeonatosSection });
  }

  const highlightMenu = () => {
    let scrollPos = window.scrollY;
    const isWideScreen = window.innerWidth > 960;

    menuItems.forEach(item => {
      item.link.classList.remove("highlight");
    });

    if (isWideScreen) {
      let activeItemFound = false;
      for (let i = menuItems.length - 1; i >= 0; i--) {
        const { link, section } = menuItems[i];
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = section.offsetTop + section.offsetHeight - 150;

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          link.classList.add("highlight");
          activeItemFound = true;
          break;
        }
      }

      if (!activeItemFound && menuItems.length > 0 && homeSection) {
         if (scrollPos < (homeSection.offsetTop + homeSection.offsetHeight - 150) && scrollPos < homeSection.offsetTop ) {
            if(homeMenuLink) homeMenuLink.classList.add("highlight");
         }
      }

      if (!activeItemFound && menuItems.length > 0) {
        const lastItem = menuItems[menuItems.length - 1];
        const scrollAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5;
        if(scrollAtBottom && scrollPos > lastItem.section.offsetTop - 150){
            lastItem.link.classList.add("highlight");
        }
      }


    } else {
      menuItems.forEach(item => {
        item.link.classList.remove("highlight");
      });
    }
  };

  if (menuItems.length > 0) {
    window.addEventListener("scroll", highlightMenu);
    window.addEventListener("resize", highlightMenu);

    highlightMenu();
  }
});