# API Mauá Esports

API backend para o projeto Mauá Esports, desenvolvida com Node.js, Express e MongoDB.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM (Object Data Modeling) para MongoDB
- **Axios** - Cliente HTTP para fazer requisições
- **CORS** - Middleware para habilitar Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente
- **nodemon** - Reinício automático do servidor em desenvolvimento

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install express mongoose cors axios dotenv nodemon --save
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=3000
MONGODB_URL=sua_url_do_mongodb
```

## Estrutura do Projeto

```
api-mauaesports/
├── index.js          # Arquivo principal da aplicação
├── package.json      # Dependências e scripts
└── README.md         # Este arquivo
```

## Funcionalidades Atuais

- Conexão com MongoDB Atlas
- Integração com API externa de Esports
- Configuração básica de CORS
- Sistema de rotas Express

## Endpoints

- `GET /` - Rota de teste para verificar se a API está funcionando

## Integrações

- **MongoDB Atlas** - Banco de dados na nuvem
- **API Esports** - Integração com API externa para dados de modalidades

## Como Rodar

Para desenvolvimento:
```bash
npm run dev
```

Para produção:
```bash
npm start
```

O servidor iniciará na porta 3000 (ou na porta definida no arquivo .env)

## Status do Projeto

Em desenvolvimento inicial. Novas funcionalidades serão adicionadas em breve. 