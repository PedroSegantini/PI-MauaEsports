import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';

const app = express();

// Configuração do Axios
const apiEsports = axios.create({
  baseURL: 'https://API-Esports.lcstuber.net',
  timeout: 5000, // Tempo máximo de espera em milissegundos
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer frontendmauaesports'
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
    const MONGODB_URL = 'mongodb+srv://mauaesportsdb:m67rmsnuEz0onzFS@mauaesportsdb.5xhl515.mongodb.net/?retryWrites=true&w=majority&appName=MauaEsportsDB';

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
    
    if(res.statusText === 'OK') {
      console.log(`Teste de envio de req Funcionou! Status Code: ${res.status}`);
    } else {
      console.log(`Não funcionou, status text: ${res.statusText}\nStatus code: ${res.status}`);
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