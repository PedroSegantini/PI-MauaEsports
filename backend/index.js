import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios"; // Mantido, embora não usado diretamente nas rotas de conteúdo que estamos criando
import dotenv from "dotenv";
import Content from "./models/Content.js"; // Seu modelo Mongoose

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
// const router = express.Router(); // Você não está usando este router para as rotas de /content, então pode ser removido se não for usado em outro lugar

// Configuração do Axios (mantida conforme seu original)
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
app.use(express.json()); // Essencial para req.body funcionar

// Função para conectar o MongoDB
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

// ROTA GET para buscar todos os conteúdos
app.get("/content", async (req, res) => {
  try {
    // Usa o modelo 'Content' para encontrar todos os documentos na coleção 'contents'
    const allContent = await Content.find({});
    
    if (allContent.length === 0) {
      return res.status(404).json({ message: 'Nenhum conteúdo encontrado na coleção.' });
    }

    res.status(200).json(allContent);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor ao buscar conteúdo.', error: error.message });
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
            return res.status(404).json({ message: 'Conteúdo não encontrado com o containerId fornecido.' });
        }

        res.status(200).json(updatedContent); // Retorna o documento atualizado
    } catch (error) {
        console.error('Erro ao atualizar conteúdo:', error);
        // Tratar erros de validação do Mongoose de forma mais específica
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Erro de validação.', errors: error.errors });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar o conteúdo.', error: error.message });
    }
});


// --- || ---
// --- || ---

// Iniciando o servidor
const PORT = process.env.PORT || 3000;

// A conexão com o MongoDB é chamada antes de iniciar o servidor
conectarMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta: ${PORT}`);
  });
}).catch(error => {
  // Se a conexão com o MongoDB falhar aqui, o servidor não será iniciado.
  // O process.exit(1) dentro de conectarMongoDB já cuidaria disso,
  // mas é bom ter um log aqui também.
  console.error(`Falha ao iniciar o servidor devido a erro na conexão com MongoDB: ${error}`);
});