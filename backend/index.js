import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";
import Content from "./models/Content.js";

// Environment variables defined directly in code
const PORT = 3000;
const APIESPORTS_URL = "https://API-Esports.lcstuber.net/";
const APIESPORTS_TOKEN = "Bearer frontendmauaesports";
const MONGODB_URL =
  "mongodb+srv://mauaesportsbd:CDM9fi53PE83cMxI@cluster0.ib4qqro.mongodb.net/mauaesports-db?retryWrites=true&w=majority";

const app = express();

// Configuração do Axios
const apiEsports = axios.create({
  baseURL: APIESPORTS_URL,
  timeout: 5000,
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
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Função para conectar o MongoDB
async function conectarMongoDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro na conexão com o MongoDB:", error.message);
    process.exit(1);
  }
}

// --- || ---
// --- || ---

// ROTAS

// ROTA GET para buscar todos os conteúdos
app.get("/content", async (req, res) => {
  try {
    // Usa o modelo 'Content' para encontrar todos os documentos na coleção 'contents'
    const allContent = await Content.find({});

    if (allContent.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum conteúdo encontrado na coleção." });
    }

    res.status(200).json(allContent);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro no servidor ao buscar conteúdo.",
        error: error.message,
      });
  }
});

// NOVA ROTA PATCH para editar um conteúdo específico pelo containerId
app.patch("/content/:containerId", async (req, res) => {
  try {
    const { containerId } = req.params; // Pega o containerId da URL
    const updates = req.body; // Pega os campos a serem atualizados do corpo da requisição

    // Opcional: remover campos que não deveriam ser atualizáveis por esta rota
    // delete updates.containerId; // Se não quiser permitir que o containerId seja alterado via body
    // delete updates._id; // O _id é imutável por padrão no MongoDB via updates normais

    const updatedContent = await Content.findOneAndUpdate(
      { containerId: containerId }, // Critério de busca
      { $set: updates }, // Operador $set garante que apenas os campos fornecidos sejam atualizados
      { new: true, runValidators: true } // Opções:
      // new: true -> retorna o documento modificado
      // runValidators: true -> garante que as validações do schema sejam aplicadas
    );

    if (!updatedContent) {
      return res
        .status(404)
        .json({
          message: "Conteúdo não encontrado com o containerId fornecido.",
        });
    }

    res.status(200).json(updatedContent); // Retorna o documento atualizado
  } catch (error) {
    console.error("Erro ao atualizar conteúdo:", error);
    // Tratar erros de validação do Mongoose de forma mais específica
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Erro de validação.", errors: error.errors });
    }
    res
      .status(500)
      .json({
        message: "Erro interno do servidor ao atualizar o conteúdo.",
        error: error.message,
      });
  }
});

// --- || ---
// --- || ---

// Iniciando o servidor
conectarMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor funcionando na porta: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      `Falha ao iniciar o servidor devido a erro na conexão com MongoDB: ${error}`
    );
  });
