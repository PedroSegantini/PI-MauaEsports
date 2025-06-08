# Portal Mauá Esports - Projeto Integrador

Olá! Este é o `README` do novo portal da Mauá Esports. Se você está vendo este projeto pela primeira vez, este guia irá explicar tudo o que você precisa saber, desde o que ele faz até como rodá-lo na sua máquina.

## 📖 O Que é Este Projeto?

Este é o novo portal web para a Mauá Esports. O objetivo é criar uma presença online moderna e funcional para a entidade, substituindo o site antigo.

O sistema é dividido em três partes principais:

1. **Frontend**: O site público que os usuários veem, incluindo o painel administrativo e área do jogador
2. **Backend Principal (Porta 3001)**: API REST que gerencia dados do site, usuários e horas PAE
3. **Servidor de Autenticação (Porta 3000)**: Gerencia login com Microsoft e proteção de rotas

## 📁 Estrutura do Projeto

````
PI-MauaEsports/
├── backend/                  # Servidor Node.js principal (Porta 3001)
│   ├── models/              # Modelos do MongoDB
│   │   ├── Content.js       # Schema: conteúdo editável do site
│   │   └── Player.js        # Schema: usuários e jogadores
│   ├── index.js             # Arquivo principal do servidor
│   ├── package.json         # Dependências do backend
│   └── README.md            # Documentação específica do backend
│
├── Frontend/                # Interface do usuário
│   ├── package.json         # Dependências do frontend
│   ├── public/              # Arquivos públicos do site
│   │   ├── admin.html       # Painel administrativo
│   │   ├── admin.js         # Lógica do painel admin
│   │   ├── app.js          # JavaScript principal
│   │   ├── index.html      # Página inicial
│   │   ├── minhas-horas.html # Página de horas PAE
│   │   ├── styles.css      # Estilos globais
│   │   └── img/            # Assets de imagem
│   │       ├── logoMaua.png # Logo principal
│   │       ├── bg/         # Backgrounds
│   │       │   ├── bg-login.png
│   │       │   ├── circuit-board.svg
│   │       │   ├── cubes.png
│   │       │   └── noise.webp
│   │       └── teams/      # Imagens dos jogos
│   │           ├── cs2.webp        # Counter-Strike 2
│   │           ├── eafc24.avif     # EA FC 24
│   │           ├── lol.webp        # League of Legends
│   │           ├── r6.webp         # Rainbow Six
│   │           ├── rocketleague.jpg # Rocket League
│   │           ├── tft.jpg         # Teamfight Tactics
│   │           └── valorant.jpg    # Valorant
│   │
│   └── src/                # Código fonte do frontend
│       ├── server.js       # Servidor de autenticação (Porta 3000)
│       └── minhas-horas.js # Lógica da página de horas
│
└── README.md               # Este arquivo

## ✨ Funcionalidades por Área

### 1. 🌐 Site Público
- **Página Inicial**
  - Apresentação da entidade
  - Seção de times com cards interativos
  - Seção de campeonatos
  - Links para redes sociais
- **Design Responsivo**
  - Adaptação para mobile
  - Menu hambúrguer em telas pequenas
  - Cards responsivos
  - Imagens otimizadas (webp/avif)

### 2. 🔐 Painel de Administrador
- **Gestão de Conteúdo**
  - Edição de textos da página inicial
  - Edição de descrições dos times
  - Atualização de campeonatos
- **Gestão de Usuários**
  - CRUD completo de membros
  - Atribuição de cargos
  - Visualização de horas PAE
- **Interface Intuitiva**
  - Formulários validados
  - Feedback visual de ações
  - Confirmações de operações críticas

### 3. 👤 Área do Jogador
- **Controle de Horas**
  - Visualização do total de horas
  - Histórico de atividades
  - Status do semestre
- **Perfil**
  - Dados pessoais
  - Cargo atual
  - Time(s) que participa

---

## 🚀 Guia de Instalação e Configuração

### Pré-requisitos
- Node.js v18+
- NPM v9+
- VS Code com extensões:
  - Live Server
  - ESLint
  - Prettier
- Git

### Configuração do Ambiente

1. **Clone o Repositório**
   ```powershell
   git clone https://github.com/seu-usuario/PI-MauaEsports.git
   cd PI-MauaEsports
````

2. **Configure o Backend Principal**

   ```powershell
   cd backend
   npm install

   # Crie o arquivo .env
   echo "PORT=3001
   MONGODB_URL=mongodb+srv://mauaesportsbd:CDM9fi53PE83cMxI@cluster0.ib4qqro.mongodb.net/mauaesports-db
   JWT_SECRET=maua-esports-2025-um-segredo-muito-forte" > .env
   ```

3. **Configure o Servidor de Autenticação**

   ```powershell
   cd ../Frontend/src
   npm install

   # Crie o arquivo .env
   echo "PORT=3000
   MICROSOFT_CLIENT_ID=seu_client_id
   MICROSOFT_CLIENT_SECRET=seu_client_secret
   SESSION_SECRET=session-secret-key" > .env
   ```

4. **Instale as Dependências do Frontend**
   ```powershell
   cd ../
   npm install
   ```

### Iniciando os Serviços

1. **Backend Principal (Terminal 1)**

   ```powershell
   cd backend
   npm run dev
   # Aguarde: "Servidor funcionando na porta: 3001"
   ```

2. **Servidor de Autenticação (Terminal 2)**

   ```powershell
   cd Frontend/src
   node server.js
   # Aguarde: "Servidor funcionando na porta: 3000"
   ```

3. **Frontend**
   - VS Code: Clique direito em `Frontend/public/index.html`
   - Selecione "Open with Live Server"

## 📚 Documentação das APIs

### Backend Principal (3001)

#### Rotas Públicas

| Método | Rota     | Descrição                 | Body/Params      |
| ------ | -------- | ------------------------- | ---------------- |
| GET    | /content | Obtém conteúdo do site    | -                |
| POST   | /login   | Autenticação com RA/senha | `{ra, password}` |

#### Rotas Protegidas

| Método | Rota                  | Acesso | Descrição         | Body/Params                             |
| ------ | --------------------- | ------ | ----------------- | --------------------------------------- |
| GET    | /api/players          | Admin  | Lista usuários    | -                                       |
| POST   | /api/players          | Admin  | Cria usuário      | `{name, ra, discordId, password, role}` |
| PUT    | /api/players/:id      | Admin  | Atualiza usuário  | `{name, ra, discordId, role}`           |
| DELETE | /api/players/:id      | Admin  | Remove usuário    | -                                       |
| GET    | /api/my-hours         | User   | Horas do usuário  | -                                       |
| PATCH  | /content/:containerId | Admin  | Atualiza conteúdo | `{titulo, subtitulo, paragrafo}`        |

### Servidor de Autenticação (3000)

| Método | Rota                     | Descrição              |
| ------ | ------------------------ | ---------------------- |
| GET    | /auth/microsoft          | Inicia login Microsoft |
| GET    | /auth/microsoft/callback | Callback do OAuth2     |
| GET    | /logout                  | Realiza logout         |

## 🔒 Segurança e Arquitetura

1. **Autenticação**

   - JWT para API principal
   - Sessions para autenticação Microsoft
   - Validação de domínio @maua.br

2. **Autorização**

   - Middleware de proteção de rotas
   - Verificação de roles (admin, captain, player)
   - CORS configurado

3. **Dados**

   - Senhas hasheadas (bcrypt)
   - Variáveis sensíveis em .env
   - MongoDB Atlas com SSL

4. **Frontend**
   - Bootstrap 5 para UI/UX
   - Axios para requisições HTTP
   - JavaScript modular
   - Assets otimizados

### **Passo 2: Iniciar o Servidor Backend**

1.  No terminal (dentro da pasta `backend`), execute o comando:
    ```bash
    npm run dev
    ```
2.  Aguarde as mensagens de sucesso: `Conectado ao MongoDB com sucesso!` e `Servidor funcionando na porta: 3000`.
3.  **Deixe este terminal rodando.**

### **Passo 3: Iniciar o Frontend**

1.  No VS Code, clique com o botão direito no arquivo `frontend/index.html`.
2.  Selecione a opção **"Open with Live Server"**.

### **Passo 4: Criando o Primeiro Administrador (Etapa Essencial)**

O banco de dados começa vazio. Siga os passos para criar o primeiro usuário `admin`:

1.  **Abra o arquivo `backend/index.js`**.
2.  **Comente temporariamente** a segurança da rota de criação de jogadores.
    - **Encontre a linha:**
      ```javascript
      app.post("/api/players", protect, admin, async (req, res) => {
      ```
    - **Altere para:**
      ```javascript
      app.post("/api/players", /* protect, admin, */ async (req, res) => {
      ```
3.  Salve o arquivo. O servidor irá reiniciar.
4.  Use uma ferramenta como **Postman** para fazer uma requisição `POST` para `http://localhost:3000/api/players` com o seguinte `body` em JSON:
    ```json
    {
      "name": "Admin do Sistema",
      "ra": "admin",
      "discordId": "0",
      "password": "admin",
      "role": "admin"
    }
    ```
5.  Após criar o usuário, **desfaça a alteração no `index.js`** para reativar a segurança da rota.

### **Passo 5: Como Usar e Testar o Sistema com a Conta de Exemplo**

1.  **Login como Admin:**

    - Acesse a página `login.html` no seu navegador.
    - Use **RA:** `admin` e **Senha:** `admin`.
    - Você será redirecionado para o painel de administração (`admin.html`).

2.  **Cadastre o Jogador de Teste:**

    - No painel de admin, preencha o formulário para adicionar um novo jogador. Use os seguintes dados:
      - **Nome:** `Jogador de Teste`
      - **RA:** `24`
      - **ID do Discord:** `123456789` (pode ser qualquer número para teste)
      - **Senha:** `24`
      - **Cargo:** `Player`
    - Clique em "Salvar". O novo jogador aparecerá na tabela.

3.  **Login como Jogador:**
    - Abra uma **nova janela anônima** no seu navegador (para não ter conflito de login).
    - Acesse a página `login.html` novamente.
    - Faça login com as credenciais do jogador que você acabou de criar:
      - **RA:** `24`
      - **Senha:** `24`
    - Você será redirecionado para a página `minhas-horas.html` e, após um breve carregamento, verá o cálculo das horas-pai daquele jogador.

---

## 🧪 Testes e Exemplos

### Exemplos de Requisições

1. **Login**

```javascript
// POST http://localhost:3001/login
{
  "ra": "24.01234-5",
  "password": "senha123"
}
```

2. **Criar Jogador**

```javascript
// POST http://localhost:3001/api/players
{
  "name": "João Silva",
  "ra": "24.01234-5",
  "discordId": "123456789",
  "password": "senha123",
  "role": "player"
}
```

3. **Atualizar Conteúdo**

```javascript
// PATCH http://localhost:3001/content/hero
{
  "titulo": "QUEM SOMOS ?",
  "subtitulo": "Mauá Esports",
  "paragrafo": "Somos a entidade responsável pelos times esportivos do IMT."
}
```

### Postman Collection

Importe esta collection para testar todas as APIs:

```json
{
  "info": {
    "name": "Mauá Esports API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Autenticação",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "http://localhost:3001/login",
            "body": {
              "mode": "raw",
              "raw": "{\"ra\": \"admin\", \"password\": \"admin\"}"
            }
          }
        }
      ]
    }
  ]
}
```

## 📱 Responsividade

O site é totalmente responsivo, com breakpoints em:

- 📱 Mobile (<768px)
  - Menu hambúrguer
  - Cards empilhados
  - Fontes redimensionadas
- 💻 Tablet (768px - 991px)
  - Grid de 2 colunas
  - Menu colapsável
- 🖥️ Desktop (>992px)
  - Grid de 3 colunas
  - Menu expandido
  - Hover effects

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** v18+: Runtime JavaScript
- **Express**: Framework web
- **MongoDB**: Banco de dados
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticação via tokens
- **Bcrypt**: Hash de senhas
- **Passport**: Autenticação Microsoft
- **CORS**: Segurança cross-origin

### Frontend

- **HTML5**: Estrutura
- **CSS3**: Estilização
  - CSS Variables
  - Flexbox/Grid
  - Media Queries
- **JavaScript**: Lógica
- **Bootstrap 5**: Framework UI
- **Axios**: Cliente HTTP
- **Font Awesome**: Ícones

## 👥 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adicionando nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes de Código

- Use ESLint e Prettier
- Siga o padrão de commits convencional
- Mantenha a documentação atualizada
- Teste antes de submeter

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 📧 Contato

Mauá Esports - [@mauaesports](https://instagram.com/mauaesports)

Coordenador do Projeto - [email@maua.br](mailto:email@maua.br)
