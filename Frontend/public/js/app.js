import Navbar from "./components/Navbar.js";
import ApiService from "./services/ApiService.js";

class PublicPage {
  constructor() {
    this.api = new ApiService();
    this.navbar = new Navbar();
  }

}

document.addEventListener("DOMContentLoaded", () => {
  new PublicPage();
});
