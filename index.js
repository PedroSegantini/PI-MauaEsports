import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Configuração do Axios
const apiEsports = axios.create({
  baseURL: process.env.APIESPORTS_URL,
  timeout: 5000, // Tempo máximo de espera em milissegundos
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.API_TOKEN
  }
});

// Middleware
const corsOptions = {
  origin: '*', // Permite todas as origens
  methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
  credentials: true // Permite envio de cookies e credenciais
}

app.use(cors(corsOptions));
app.use(express.json());


// função para conectar o MongoDB
async function conectarMongoDB() {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;

    await mongoose.connect(MONGODB_URL);
    
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro na conexão com o MongoDB:', error.message);
    process.exit(1); // Encerra o servidor em caso de erro na conexão
  }
}

// --- || ---
// --- || ---

// ROTAS

app.get('/', (req, res) => {
  res.json({ message: 'API Mauá Esports funcionando!' });
});


// funcao que envia uma requisicao a api2 (apenas para testes)
async function testeApi() {
  try {
    const res = await apiEsports.get('/modality/all');
    
    if(res.status !== 401) {
      console.log(`Teste de envio de req Funcionou! Status Code: ${res.status}`);
      
    } 
    
  } catch (error) {
    console.error('Erro na requisição:', error.message);
  }
}

testeApi();


// Iniciando o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  try{
    conectarMongoDB();
    console.log(`Servidor funcionando na porta: ${PORT}`)
  }catch(error){
    console.error(`Erro ao conectarMongoDB: ${error}`)
  }
}); 