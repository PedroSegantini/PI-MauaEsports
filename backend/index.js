import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import Content from "./models/Content.js";


// Environment variables
const PORT = 3000;
const APIESPORTS_URL = "https://API-Esports.lcstuber.net/";
const APIESPORTS_TOKEN = "Bearer frontendmauaesports";
const MONGODB_URL = "mongodb+srv://mauaesportsbd:CDM9fi53PE83cMxI@cluster0.ib4qqro.mongodb.net/mauaesports-db?retryWrites=true&w=majority";
const JWT_SECRET = "sua_chave_secreta_super_segura_aqui"; // <-- Adicione uma chave secreta

const app = express();

// Configuração do Axios para a API externa
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

// Função de Conexão com MongoDB (mantida)
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




// --- || SUAS ROTAS ANTIGAS (MANTIDAS) || ---
// ROTA GET para buscar todos os conteúdos
app.get("/content", async (req, res) => {
  try {
    const allContent = await Content.find({});
    if (allContent.length === 0) {
      return res.status(404).json({ message: "Nenhum conteúdo encontrado na coleção." });
    }
    res.status(200).json(allContent);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao buscar conteúdo.", error: error.message });
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
      return res.status(404).json({ message: "Conteúdo não encontrado com o containerId fornecido." });
    }
    res.status(200).json(updatedContent);
  } catch (error) {
    console.error("Erro ao atualizar conteúdo:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Erro de validação.", errors: error.errors });
    }
    res.status(500).json({ message: "Erro interno do servidor ao atualizar o conteúdo.", error: error.message });
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