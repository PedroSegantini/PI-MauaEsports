import Player from "../models/Player.js";

export const createPlayer = async (req, res) => {
  try {
    const { ra, modalityId, discordId, email, role } = req.body;

    // if (!email || !ra || !discordId) {
    //   return res.status(400).json({
    //     message:
    //       "Campos obrigatórios ausentes: RA, discordId e e-mail são necessários.",
    //   });
    // }

    const newPlayer = new Player({
      ra,
      modalityId,
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

export const findUser = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ message: "O parâmetro 'email' é obrigatório na consulta." });
    }

    const player = await Player.findOne({ email: email });

    if (!player) {
      return res
        .status(404)
        .json({ message: "Jogador com o email fornecido não encontrado." });
    }

    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar jogador por email.",
      error: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const userEmail = req.user.emails[0].value;
    const playerProfile = await Player.findOne({ email: userEmail });

    if (!playerProfile) {
      return res
        .status(404)
        .json({ message: "Perfil do jogador não encontrado." });
    }

    res.status(200).json(playerProfile);
  } catch (error) {
    res.status(500).json({
      message: "Erro de servidor ao buscar perfil.",
      error: error.message,
    });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlayer = await Player.findByIdAndDelete(id);

    if (!deletedPlayer) {
      return res.status(404).json({ message: "Jogador não encontrado." });
    }

    res.status(200).json({ message: "Jogador deletado com sucesso." });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao deletar jogador.",
      error: error.message,
    });
  }
};
