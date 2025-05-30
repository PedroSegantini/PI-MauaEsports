import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import Content from "./models/Content.js";

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Configuração do Axios
const apiEsports = axios.create({
  baseURL: process.env.APIESPORTS_URL,
  timeout: 5000, // Tempo máximo de espera em milissegundos
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.APIESPORTS_TOKEN,
  },
});

// Middleware
const corsOptions = {
  origin: "*", // Permite todas as origens
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  credentials: true, // Permite envio de cookies e credenciais
};

app.use(cors(corsOptions));
app.use(express.json());

// função para conectar o MongoDB
async function conectarMongoDB() {
  try {
    // Certifique-se que a URL já inclui o nome do banco: .../mauaesports-db
    const MONGODB_URL = process.env.MONGODB_URL;

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

app.get("/content", async (req, res) => {
  try {
    // Usa o modelo 'Content' para encontrar todos os documentos na coleção 'contents'
    const allContent = await Content.find({});
    
    if (allContent.length === 0) {
      return res.status(404).json({ message: 'Nenhum conteúdo encontrado na coleção.' });
    }

    res.status(200).json(allContent);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  try {
    conectarMongoDB();
    console.log(`Servidor funcionando na porta: ${PORT}`);
  } catch (error) {
    console.error(`Erro ao conectarMongoDB: ${error}`);
  }
});
