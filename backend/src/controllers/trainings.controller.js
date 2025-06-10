import axios from "axios";
import Player from "../models/Player.js";

export const getTrainingSchedules = async (req, res) => {
  try {
    const { data: allSchedules } = await axios.get(
      "https://API-Esports.lcstuber.net/modality/all",
      { headers: { Authorization: "Bearer frontendmauaesports" } }
    );

    const { email } = req.query;

    const user = await Player.findOne({ email: email.toLowerCase() });
    if (user.role === "admin") {
      return res.status(200).json(allSchedules);
    }

    if (user.role === "captain") {
      const captainProfile = user;
      const captainModalityId = captainProfile.modalityId;

      if (!captainModalityId || !allSchedules[captainModalityId]) {
        return res
          .status(404)
          .json({ message: "Horários para sua modalidade não encontrados." });
      }

      const captainSchedule = {
        [captainModalityId]: allSchedules[captainModalityId],
      };
      return res.status(200).json(captainSchedule);
    }
    return res
      .status(403)
      .json({ message: "Você não tem permissão para ver os horários." });
  } catch (error) {
    console.error(
      "Erro ao buscar horários da API de terceiros:",
      error.message
    );
    res.status(500).json({ message: "Erro ao buscar horários de treino." });
  }
};

export const updateTrainingSchedule = async (req, res) => {
  try {
    const { modalityId } = req.params;
    const { schedules } = req.body;

    if (!modalityId || !Array.isArray(schedules)) {
      return res.status(400).json({
        message:
          "Dados inválidos. É necessário fornecer o ID da modalidade e um array de horários.",
      });
    }

    const requestBodyForThirdPartyAPI = {
      _id: modalityId,
      ScheduledTrainings: schedules,
    };

    const thirdPartyApiUrl = "https://API-Esports.lcstuber.net/modality";
    const apiHeaders = {
      Authorization: "Bearer frontendmauaesports",
      "Content-Type": "application/json",
    };

    await axios.patch(thirdPartyApiUrl, requestBodyForThirdPartyAPI, {
      headers: apiHeaders,
    });

    res.status(200).json({ message: "Item updated" });
  } catch (error) {
    console.error(
      "Erro ao atualizar horários:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Erro ao salvar horários de treino." });
  }
};
