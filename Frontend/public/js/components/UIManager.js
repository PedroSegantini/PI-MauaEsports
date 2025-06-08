export default class UIManager {
  static showAlert(alertId, statusId, message, type = "success") {
    const alertEl = document.getElementById(alertId);
    const statusEl = document.getElementById(statusId);

    if (!alertEl || !statusEl) return;

    alertEl.className = `alert alert-${type}`;
    alertEl.textContent = message;
    statusEl.style.display = "block";

    setTimeout(() => {
      statusEl.style.display = "none";
    }, 5000);
  }

  static getRoleName(role) {
    const roles = {
      admin: "Administrador",
      captain: "Capitão",
      player: "Jogador",
    };
    return roles[role] || role;
  }
}
