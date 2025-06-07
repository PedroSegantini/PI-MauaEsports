import axios from "axios";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import Content from "./models/Content.js";
import Player from "./models/Player.js"; // <-- IMPORTAR O NOVO MODELO

const PORT = 3000;
const APIESPORTS_URL = "https://API-Esports.lcstuber.net/";
const APIESPORTS_TOKEN = "Bearer frontendmauaesports";
const MONGODB_URL =
  "mongodb+srv://mauaesportsbd:CDM9fi53PE83cMxI@cluster0.ib4qqro.mongodb.net/mauaesports-db?retryWrites=true&w=majority";
const JWT_SECRET =
  "df5c70339ff02329dc3394e5476203351390fcc390a05f11de0a3d0a436f75d5"; // <-- Adicione uma chave secreta

const app = express();

const apiEsports = axios.create({
  baseURL: APIESPORTS_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: APIESPORTS_TOKEN,
  },
});

// Middleware
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

async function conectarMongoDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro na conexão com o MongoDB:", error.message);
    process.exit(1);
  }
}

// --- || INÍCIO DAS NOVAS ROTAS DE AUTENTICAÇÃO E JOGADORES || ---

// Middleware de Autenticação com JWT
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await Player.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Não autorizado, token falhou" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Não autorizado, sem token" });
  }
};

// Middleware para verificar se é Admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Acesso negado, somente admins" });
  }
};

// ROTA POST para registrar um novo jogador (só para admins)
app.post("/api/players", protect, admin, async (req, res) => {
  const { name, ra, discordId, password, role } = req.body;
  try {
    const playerExists = await Player.findOne({ ra });
    if (playerExists) {
      return res
        .status(400)
        .json({ message: "Jogador com este RA já existe." });
    }
    const player = await Player.create({ name, ra, discordId, password, role });
    res.status(201).json({
      _id: player._id,
      name: player.name,
      ra: player.ra,
      role: player.role,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao criar jogador", error: error.message });
  }
});

// ROTA POST para login
app.post("/login", async (req, res) => {
  const { ra, password } = req.body;
  try {
    const player = await Player.findOne({ ra });
    if (player && (await player.matchPassword(password))) {
      const token = jwt.sign({ id: player._id }, JWT_SECRET, {
        expiresIn: "8h",
      });
      res.json({
        _id: player._id,
        name: player.name,
        ra: player.ra,
        role: player.role,
        token: token,
      });
    } else {
      res.status(401).json({ message: "RA ou senha inválidos." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erro no servidor durante o login.",
      error: error.message,
    });
  }
});

// ROTA GET para buscar todos os jogadores (protegida)
app.get("/api/players", protect, admin, async (req, res) => {
  const players = await Player.find({});
  res.json(players);
});

// ROTA DELETE para remover um jogador (protegida)
app.delete("/api/players/:id", protect, admin, async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (player) {
    await player.deleteOne();
    res.json({ message: "Jogador removido" });
  } else {
    res.status(404).json({ message: "Jogador não encontrado" });
  }
});

// ROTA PUT para atualizar um jogador (protegida)
app.put("/api/players/:id", protect, admin, async (req, res) => {
  const player = await Player.findById(req.params.id);

  if (player) {
    player.name = req.body.name || player.name;
    player.ra = req.body.ra || player.ra;
    player.discordId = req.body.discordId || player.discordId;
    player.role = req.body.role || player.role;

    // Se uma nova senha for enviada, criptografe-a
    if (req.body.password) {
      player.password = req.body.password;
    }

    const updatedPlayer = await player.save();
    res.json({
      _id: updatedPlayer._id,
      name: updatedPlayer.name,
      ra: updatedPlayer.ra,
      role: updatedPlayer.role,
    });
  } else {
    res.status(404).json({ message: "Jogador não encontrado" });
  }
});

// ROTA GET para buscar as horas de um jogador logado
app.get("/api/my-hours", protect, async (req, res) => {
  try {
    const player = req.user; // Obtido do middleware 'protect'
    if (!player) {
      return res.status(404).json({ message: "Jogador não encontrado." });
    }

    const startOfSemesterTimestamp = new Date("2025-01-01T00:00:00Z").getTime();
    const { data: trainings } = await apiEsports.get("/trains/all", {
      params: { "StartTimestamp>": startOfSemesterTimestamp },
    });

    let totalMilliseconds = 0;
    if (trainings && trainings.length > 0) {
      trainings.forEach((train) => {
        train.AttendedPlayers.forEach((p) => {
          if (
            p.PlayerId === player.discordId &&
            p.ExitTimestamp > p.EntranceTimestamp
          ) {
            totalMilliseconds += p.ExitTimestamp - p.EntranceTimestamp;
          }
        });
      });
    }

    const totalHours = totalMilliseconds / (1000 * 60 * 60);
    res.json({ name: player.name, hours: totalHours.toFixed(2) });
  } catch (error) {
    console.error("Erro ao buscar horas:", error);
    res.status(500).json({
      message: "Erro ao buscar dados de treino.",
      error: error.message,
    });
  }
});

// --- || FIM DAS NOVAS ROTAS || ---

// --- || SUAS ROTAS ANTIGAS (MANTIDAS) || ---
// ROTA GET para buscar todos os conteúdos
app.get("/content", async (req, res) => {
  try {
    const allContent = await Content.find({});
    if (allContent.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum conteúdo encontrado na coleção." });
    }
    res.status(200).json(allContent);
  } catch (error) {
    res.status(500).json({
      message: "Erro no servidor ao buscar conteúdo.",
      error: error.message,
    });
  }
});

// ROTA PATCH para editar um conteúdo específico pelo containerId
app.patch("/content/:containerId", async (req, res) => {
  try {
    const { containerId } = req.params;
    const updates = req.body;
    const updatedContent = await Content.findOneAndUpdate(
      { containerId: containerId },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updatedContent) {
      return res.status(404).json({
        message: "Conteúdo não encontrado com o containerId fornecido.",
      });
    }
    res.status(200).json(updatedContent);
  } catch (error) {
    console.error("Erro ao atualizar conteúdo:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Erro de validação.", errors: error.errors });
    }
    res.status(500).json({
      message: "Erro interno do servidor ao atualizar o conteúdo.",
      error: error.message,
    });
  }
});
// --- || FIM DAS ROTAS ANTIGAS || ---

// Iniciando o servidor
conectarMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor funcionando na porta: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Falha ao iniciar o servidor: ${error}`);
  });
