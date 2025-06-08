import Player from "../models/Player.js";

export const createPlayer = async (req, res) => {
  try {
    const { name, ra, discordId, role } = req.body;

    if (!name || !ra || !discordId) {
      return res.status(400).json({
        message:
          "Campos obrigatórios ausentes: name, ra e discordId são necessários.",
      });
    }

    const newPlayer = new Player({
      name,
      ra,
      discordId,
      role,
    });

    const savedPlayer = await newPlayer.save();

    res.status(201).json(savedPlayer);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Um jogador com este RA ou Discord ID já existe.",
        fields: error.keyValue,
      });
    }
    res
      .status(500)
      .json({ message: "Erro ao criar jogador.", error: error.message });
  }
};
