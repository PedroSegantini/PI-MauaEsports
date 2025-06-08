import Player from "../models/Player.js";

export const createPlayer = async (req, res) => {
  try {
    const { ra, discordId, email, role } = req.body;

    // if (!email || !ra || !discordId) {
    //   return res.status(400).json({
    //     message:
    //       "Campos obrigatórios ausentes: RA, discordId e e-mail são necessários.",
    //   });
    // }

    const newPlayer = new Player({
      ra,
      discordId,
      email,
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
