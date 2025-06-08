import Player from "../models/Player.js";
import axios from "axios";

export const getMyHours = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email || !email.endsWith("@maua.br")) {
      return res.status(400).json({ message: "Email institucional obrigatório." });
    }

    // 1. Encontra o jogador no seu banco de dados para obter o discordId
    const player = await Player.findOne({ email: email.toLowerCase() });

    if (!player) {
      return res.status(404).json({ message: "Usuário não encontrado em nosso banco de dados." });
    }

    const playerDiscordId = player.discordId;

    // 2. Faz a requisição para a API externa de treinos
    const { data: allTrains } = await axios.get("https://API-Esports.lcstuber.net/trains/all", {
      headers: {
        Authorization: "Bearer frontendmauaesports",
      },
    });
    
    // 3. Filtra as sessões corretamente
    const completedSessions = allTrains.filter(
      (session) =>
        session.Status === "ENDED" &&
        session.AttendedPlayers.some((p) => p.PlayerId === playerDiscordId)
    );

    // 4. Mapeia os dados para o formato de resposta, calculando a duração
    const sessions = completedSessions.map((session) => {
      const playerSessionData = session.AttendedPlayers.find(p => p.PlayerId === playerDiscordId);
      
      const start = new Date(playerSessionData.EntranceTimestamp);
      const end = new Date(playerSessionData.ExitTimestamp);
      const duration = end - start; // Duração em milissegundos

      return {
        entrance: start,
        exit: end,
        duration,
        modality: session.ModalityId,
      };
    });

    // 5. Calcula o total de horas
    const totalMilliseconds = sessions.reduce((acc, s) => acc + s.duration, 0);
    const totalHours = (totalMilliseconds / 1000 / 60 / 60).toFixed(2);

    // 6. Retorna a resposta completa para o frontend
    const responsePayload = {
      name: player.name || `Usuário RA ${player.ra}`,
      email: player.email,
      hours: parseFloat(totalHours),
      sessions,
    };

    return res.status(200).json(responsePayload);
  } catch (error) {
    console.error("[BACKEND] Erro em /my-hours:", error.message);
    return res.status(500).json({
      message: "Erro ao consultar horas PAE.",
      error: error.message,
    });
  }
};