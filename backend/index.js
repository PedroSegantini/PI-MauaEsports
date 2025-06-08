import axios from "axios";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import Content from "./models/Content.js";

const PORT = 3001;
const APIESPORTS_URL = "https://API-Esports.lcstuber.net";
const APIESPORTS_TOKEN = "Bearer frontendmauaesports";
const MONGODB_URL =
  "mongodb+srv://mauaesportsbd:CDM9fi53PE83cMxI@cluster0.ib4qqro.mongodb.net/mauaesports-db?retryWrites=true&w=majority";
const ESPORTS_API_URL = "https://api-esports.lcstuber.net/";
const ESPORTS_API_TOKEN = process.env.ESPORTS_API_TOKEN;

const app = express();

const apiEsports = axios.create({
  baseURL: APIESPORTS_URL,
  timeout: 7000,
  headers: {
    "Content-Type": "application/json",
    Authorization: APIESPORTS_TOKEN,
  },
});

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

app.get("/api/esports/trains", async (req, res) => {
  if (!ESPORTS_API_TOKEN) {
    return res.status(500).json({
      message: "Token da API de eSports não configurado no servidor.",
    });
  }

  try {
    const response = await axios.get(`${ESPORTS_API_URL}/trains/all`, {
      headers: {
        Authorization: `Bearer ${ESPORTS_API_TOKEN}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Erro ao buscar treinos:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Falha ao buscar dados de treinos." });
  }
});

app.get("/api/esports/modalities", async (req, res) => {
  if (!ESPORTS_API_TOKEN) {
    return res.status(500).json({
      message: "Token da API de eSports não configurado no servidor.",
    });
  }

  try {
    const response = await axios.get(`${ESPORTS_API_URL}/modality/all`, {
      headers: {
        Authorization: `Bearer ${ESPORTS_API_TOKEN}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Erro ao buscar modalidades:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Falha ao buscar dados de modalidades." });
  }
});

app.patch("/api/esports/modality", async (req, res) => {
  if (!ESPORTS_API_TOKEN) {
    return res.status(500).json({
      message: "Token da API de eSports não configurado no servidor.",
    });
  }

  try {
    const dataToUpdate = req.body;

    if (!dataToUpdate._id || !dataToUpdate.ScheduledTrainings) {
      return res.status(400).json({
        message:
          "Corpo da requisição inválido. É necessário fornecer _id e ScheduledTrainings.",
      });
    }

    const response = await axios.patch(
      `${ESPORTS_API_URL}/modality`,
      dataToUpdate,
      {
        headers: {
          Authorization: `Bearer ${ESPORTS_API_TOKEN}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Erro ao atualizar modalidade:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ message: "Falha ao atualizar dados da modalidade." });
  }
});

conectarMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor funcionando na porta: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Falha ao iniciar o servidor: ${error}`);
  });
