# API Mauá Esports

API backend para o projeto Mauá Esports, desenvolvida com Node.js, Express e MongoDB. Gerencia conteúdo dinâmico do site institucional da Mauá Esports.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM (Object Data Modeling) para MongoDB e validação de dados
- **Axios** - Cliente HTTP para fazer requisições
- **CORS** - Middleware para habilitar Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente
- **nodemon** - Reinício automático do servidor em desenvolvimento

## Configuração

1. Clone o repositório
2. Use o seguinte comando para interagir com a Api na pasta CORRETA:
```bash
cd backend
```
3. Instale as dependências:
```bash
npm install
```
4. Para ligar a api no ambiente de desenvolvimento:
```bash
npm run dev
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=3000
MONGODB_URL=mongodb+srv://<seu-usuario>:<sua-senha>@cluster0.mongodb.net/mauaesports-db
```

## Estrutura do Projeto

```
backend/
├── models/
│   └── Content.js    # Schema e modelo para conteúdo dinâmico
├── index.js          # Arquivo principal da aplicação
├── package.json      # Dependências e scripts
└── README.md         # Este arquivo
```

## Funcionalidades Atuais

- Conexão com MongoDB Atlas configurada para o banco mauaesports-db
- Sistema de rotas Express para gerenciamento de conteúdo
- Modelo Mongoose com validação de dados
- Operações CRUD completas para conteúdo dinâmico
- Configuração CORS para integração com frontend
- Tratamento de erros robusto
- Respostas HTTP padronizadas

## Endpoints

### Conteúdo Dinâmico
- `GET /content` - Retorna todos os conteúdos dinâmicos
- `PATCH /content/:containerId` - Atualiza um conteúdo específico pelo ID

### Sistema
- `GET /` - Rota de teste para verificar se a API está funcionando

## Modelos de Dados

### Content
```javascript
{
  containerId: String,  // Identificador único do conteúdo (required)
  titulo: String,       // Título do conteúdo
  subtitulo: String,    // Subtítulo do conteúdo
  paragrafo: String     // Texto do conteúdo
}
```

## Integrações

- **MongoDB Atlas** - Banco de dados na nuvem para armazenamento de conteúdo dinâmico
- **Frontend Mauá Esports** - Integração direta com o frontend da aplicação

## Como Rodar

1. Instale as dependências:
```powershell
npm install
```

2. Configure o arquivo .env com suas credenciais do MongoDB

3. Para desenvolvimento (com nodemon):
```powershell
npm run dev
```

4. Para produção:
```powershell
npm start
```

O servidor iniciará na porta 3000 (ou na porta definida no arquivo .env)

## Exemplos de Uso

### Buscar todos os conteúdos
```powershell
curl http://localhost:3000/content
```

### Atualizar um conteúdo
```powershell
curl -X PATCH http://localhost:3000/content/hero -H "Content-Type: application/json" -d "{\"titulo\":\"Novo Título\"}"
```

## Status do Projeto

Em produção, com funcionalidades básicas de CRUD implementadas. 
Próximas atualizações incluirão:
- Autenticação de usuários
- Novos endpoints para gestão de times
- Sistema de cache para otimização de performance 