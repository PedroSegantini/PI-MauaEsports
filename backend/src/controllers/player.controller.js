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

export const findUser = async (req, res) => {
  try {
    const { email } = req.query;
    console.log("req.query");
    console.log(req.query);

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
