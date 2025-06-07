document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: { Authorization: `Bearer ${token}` },
  });

  const loadingSpinner = document.getElementById("loading-spinner");
  const hoursContent = document.getElementById("hours-content");
  const errorMessageDiv = document.getElementById("error-message");
  const welcomeMessage = document.getElementById("welcome-message");
  const hoursDisplay = document.getElementById("hours-display");

  try {
    const { data } = await apiClient.get("/api/my-hours");

    welcomeMessage.textContent = `Olá, ${data.name}!`;
    hoursDisplay.textContent = data.hours;

    loadingSpinner.style.display = "none";
    hoursContent.style.display = "block";
  } catch (error) {
    console.error("Erro ao buscar horas:", error);
    if (error.response.status === 401) window.location.href = "login.html";

    loadingSpinner.style.display = "none";
    errorMessageDiv.textContent =
      error.response?.data?.message || "Não foi possível carregar suas horas.";
    errorMessageDiv.style.display = "block";
  }
});
