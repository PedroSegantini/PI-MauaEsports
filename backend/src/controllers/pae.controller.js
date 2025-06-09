import axios from "axios";
import Player from "../models/Player.js";

export const getMyHours = async (req, res) => {
  try {
    const { email } = req.query;

    const player = await Player.findOne({ email: email.toLowerCase() });

    if (!player) {
      return res
        .status(404)
        .json({ message: "Usuário não encontrado em nosso banco de dados." });
    }

    const playerDiscordId = player.discordId;

    const { data: allTrains } = await axios.get(
      "https://API-Esports.lcstuber.net/trains/all",
      {
        headers: {
          Authorization: "Bearer frontendmauaesports",
        },
      }
    );

    const completedSessions = allTrains.filter(
      (session) =>
        session.Status === "ENDED" &&
        session.AttendedPlayers.some((p) => p.PlayerId === playerDiscordId)
    );

    const sessions = completedSessions.map((session) => {
      const playerAttendances = session.AttendedPlayers.filter(
        (p) => p.PlayerId === playerDiscordId
      );

      const totalDurationForSession = playerAttendances.reduce(
        (total, attendance) => {
          const start = new Date(attendance.EntranceTimestamp);
          const end = new Date(attendance.ExitTimestamp);
          return total + (end - start);
        },
        0
      );

      const firstEntrance = new Date(playerAttendances[0].EntranceTimestamp);
      const lastExit = new Date(
        playerAttendances[playerAttendances.length - 1].ExitTimestamp
      );

      return {
        entrance: firstEntrance,
        exit: lastExit,
        duration: totalDurationForSession,
        modality: session.ModalityId,
      };
    });

    const totalMilliseconds = sessions.reduce((acc, s) => acc + s.duration, 0);
    const totalHours = (totalMilliseconds / 1000 / 60 / 60).toFixed(2);

    const responsePayload = {
      ra: player.ra,
      email: player.email,
      role: player.role,
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

export const getTeamHours = async (req, res) => {
  const calculatePlayerHours = (player, allTrains) => {
    const playerDiscordId = player.discordId;

    const completedSessions = allTrains.filter(
      (session) =>
        session.Status === "ENDED" &&
        session.AttendedPlayers.some((p) => p.PlayerId === playerDiscordId)
    );

    const sessions = completedSessions.map((session) => {
      const playerAttendances = session.AttendedPlayers.filter(
        (p) => p.PlayerId === playerDiscordId
      );
      const totalDurationForSession = playerAttendances.reduce(
        (total, attendance) => {
          const start = new Date(attendance.EntranceTimestamp);
          const end = new Date(attendance.ExitTimestamp);
          return total + (end - start);
        },
        0
      );
      const firstEntrance = new Date(playerAttendances[0].EntranceTimestamp);
      const lastExit = new Date(
        playerAttendances[playerAttendances.length - 1].ExitTimestamp
      );

      return {
        entrance: firstEntrance,
        exit: lastExit,
        duration: totalDurationForSession,
        modality: session.ModalityId,
      };
    });

    const totalMilliseconds = sessions.reduce((acc, s) => acc + s.duration, 0);
    const totalHours = (totalMilliseconds / 1000 / 60 / 60).toFixed(2);

    return {
      ra: player.ra,
      email: player.email,
      role: player.role,
      hours: parseFloat(totalHours),
      sessions,
    };
  };

  try {
    const { email } = req.query;

    const captain = await Player.findOne({ email: email.toLowerCase() });

    if (!captain) {
      return res
        .status(404)
        .json({ message: "Capitão não encontrado em nosso banco de dados." });
    }
    if (!captain.modalityId) {
      return res
        .status(400)
        .json({ message: "Este jogador não está em uma equipe." });
    }

    const teammates = await Player.find({
      modalityId: captain.modalityId,
      _id: { $ne: captain._id },
    });

    const { data: allTrains } = await axios.get(
      "https://API-Esports.lcstuber.net/trains/all",
      { headers: { Authorization: "Bearer frontendmauaesports" } }
    );

    const captainData = calculatePlayerHours(captain, allTrains);

    const teamData = teammates.map((teammate) =>
      calculatePlayerHours(teammate, allTrains)
    );

    const responsePayload = {
      ra: captainData.ra,
      email: captainData.email,
      role: captainData.role,
      hours: captainData.hours,
      sessions: captainData.sessions,
      teamData,
    };

    return res.status(200).json(responsePayload);
  } catch (error) {
    console.error("[BACKEND] Erro em /team-hours:", error.message);
    return res.status(500).json({
      message: "Erro ao consultar horas da equipe.",
      error: error.message,
    });
  }
};
