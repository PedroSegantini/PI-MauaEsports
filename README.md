# Portal Mauá Esports - Projeto Integrador

Olá! Este é o `README` do novo portal da Mauá Esports. Se você está vendo este projeto pela primeira vez, este guia irá explicar tudo o que você precisa saber, desde o que ele faz até como rodá-lo na sua máquina.

## 🔄 Status do Projeto

- **Última Atualização:** 8 de Junho de 2025
- **Status:** Em desenvolvimento
- **Versão:** 2.0.0

## 📖 O Que é Este Projeto?

Este é o novo portal web para a Mauá Esports. O objetivo é criar uma presença online moderna e funcional para a entidade, substituindo o site antigo.

O sistema é dividido em duas partes principais: um **frontend**, que é o site que os usuários veem, e um **backend**, que é o servidor que guarda os dados e controla a lógica do sistema.

## ✨ Funcionalidades Principais

O portal possui três áreas distintas:

#### 1. **Site Público (O que todos veem)**

- **Página Inicial:** Apresenta a entidade e suas redes sociais.
- **Seção de Times:** Mostra os jogos nos quais a Mauá Esports compete (Valorant, LoL, etc.).
- **Seção de Campeonatos:** Uma área para exibir os próximos torneios.
- **Design Responsivo:** O site funciona bem em computadores, tablets e celulares.

#### 2. **Painel de Administrador (Acesso exclusivo para admins)**

- **Login Seguro:** Acesso protegido por um sistema de RA e senha.
- **Gerenciamento de Usuários (CRUD):**
  - **Criar:** Adicionar novos membros (jogadores, capitães ou outros admins) ao banco de dados.
  - **Visualizar:** Ver todos os membros cadastrados.
  - **Atualizar:** Editar as informações de um membro.
  - **Deletar:** Remover um membro do sistema.

#### 3. **Área do Jogador (Acesso para membros logados)**

- **Login Individual:** Cada membro usa seu RA e senha para entrar.
- **Consulta de Horas-Pai:** Visualização do total de horas de treino acumuladas no semestre, com cálculo em tempo real feito pelo backend.

---

## 🚀 Guia de Instalação e Execução

O projeto agora tem uma estrutura mais robusta com dois servidores separados. Siga estes passos na ordem para configurar e executar o projeto completo em sua máquina local.

### **Passo 0: Pré-requisitos**

Antes de começar, garanta que você tenha o seguinte instalado na sua máquina:

- **Node.js:** (versão 18 ou superior)
- **MongoDB:** Você não precisa instalar, pois o projeto já está configurado para usar a base de dados em nuvem (MongoDB Atlas)
- **PowerShell:** (já vem instalado no Windows)
- **VS Code** (recomendado para desenvolvimento)

### **Passo 1: Configurar e Iniciar o Backend (API Principal)**

1. Abra um novo terminal PowerShell e execute o seguinte comando para configurar e iniciar o backend:
   ```powershell
   cd backend; npm install; npm run dev
   ```
2. Aguarde as mensagens de sucesso:
   - `Conectado ao MongoDB com sucesso!`
   - `Servidor funcionando na porta: 3001`
3. **Deixe este terminal rodando.**

### **Passo 2: Configurar e Iniciar o Servidor de Autenticação**

1. Abra um segundo terminal PowerShell e execute:
   ```powershell
   cd frontend; npm install; cd src; node server.js
   ```
2. Aguarde a mensagem de sucesso: `Servidor de autenticação rodando na porta 3000`
3. **Deixe este terminal rodando também.**

### **Passo 3: Acessar o Sistema**

1. Abra seu navegador e acesse:
   - **Interface Principal:** `http://localhost:3000`
   - O sistema de autenticação redirecionará automaticamente para a página correta

### **Passo 4: Estrutura do Projeto**

O projeto está organizado da seguinte forma:

```
PI-MauaEsports/
├── backend/                 # API principal (Porta 3001)
│   ├── src/
│   │   ├── controllers/    # Controladores das rotas
│   │   ├── models/         # Modelos do MongoDB
│   │   ├── routes/         # Definição das rotas
│   │   └── services/       # Serviços externos
│   └── app.js              # Configuração do Express
│
└── Frontend/               # Frontend + Auth Server (Porta 3000)
    ├── public/             # Arquivos estáticos
    │   ├── admin.html     # Painel administrativo
    │   ├── index.html     # Página principal
    │   ├── styles.css     # Estilos globais
    │   └── js/            # Scripts do cliente
    └── src/
        └── server.js      # Servidor de autenticação
```

### **Passo 5: Configurando um Administrador**

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

## **🛠️ Tecnologias Utilizadas**

### Backend (API Principal - Porta 3001)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Banco de Dados:** MongoDB com Mongoose
- **Segurança:** JWT, Bcrypt.js
- **Outros:** Cors, Dotenv

### Frontend (Porta 3000)

- **HTML5 & CSS3**
- **JavaScript (ES6+)**
- **Bootstrap 5**
- **Componentes:** Custom Elements
- **HTTP Client:** Axios
- **Auth Server:** Express.js

### Ferramentas de Desenvolvimento

- **VS Code**
- **Git & GitHub**
- **MongoDB Atlas**
- **Postman** (recomendado para testes)

---

## **📚 Documentação da API do Backend**

A API personalizada construída para este projeto inclui as seguintes rotas:

| Método | Rota | Descrição | Acesso |
| :----- | :--- | :-------- | :----- |

### API Principal (Porta 3001)

| Método   | Rota               | Descrição                                   | Acesso      |
| :------- | :----------------- | :------------------------------------------ | :---------- |
| `POST`   | `/api/login`       | Autentica um usuário e retorna um token JWT | Público     |
| `GET`    | `/api/players`     | Lista todos os usuários                     | Admin       |
| `POST`   | `/api/players`     | Cria um novo usuário                        | Admin       |
| `PUT`    | `/api/players/:id` | Atualiza um usuário existente               | Admin       |
| `DELETE` | `/api/players/:id` | Remove um usuário                           | Admin       |
| `GET`    | `/api/my-hours`    | Retorna horas PAE do usuário logado         | Autenticado |
| `GET`    | `/api/content`     | Busca o conteúdo editável do site           | Público     |
| `PATCH`  | `/api/content/:id` | Atualiza um conteúdo específico             | Admin       |

### Servidor de Autenticação (Porta 3000)

| Método | Rota              | Descrição                         |
| :----- | :---------------- | :-------------------------------- |
| `GET`  | `/auth/microsoft` | Inicia o fluxo de login Microsoft |
| `GET`  | `/auth/callback`  | Callback do login Microsoft       |
| `POST` | `/auth/validate`  | Valida um token JWT               |
| `GET`  | `/auth/logout`    | Encerra a sessão do usuário       |

---

## **🔒 Variáveis de Ambiente**

O projeto usa dois arquivos `.env`:

### Backend (.env)

```env
PORT=3001
APIESPORTS_URL="[https://API-Esports.lcstuber.net/](https://API-Esports.lcstuber.net/)"
APIESPORTS_TOKEN="Bearer frontendmauaesports"
MONGODB_URL="mongodb+srv://mauaesportsbd:CDM9fi53PE83cMxI@cluster0.ib4qqro.mongodb.net/mauaesports-db?retryWrites=true&w=majority"
JWT_SECRET="maua-esports-2025-um-segredo-muito-forte"
```

### Frontend/src (.env)

```env
MICROSOFT_CLIENT_ID=a6ac72b4-ce06-4c9a-8fff-30bee5ffd49f
MICROSOFT_CLIENT_SECRET=Tuo8Q~4~ukEXu1RwSJbEgtU-sPlaxnf7KHuYyarT
SESSION_SECRET=15jv91n59u1n89un891458uybd8
MONGODB_URL="mongodb+srv://mauaesportsbd:CDM9fi53PE83cMxI@cluster0.ib4qqro.mongodb.net/mauaesports-db?retryWrites=true&w=majority"
```

---

## **❗ Resolução de Problemas Comuns**

### Erro: "Cannot GET /content"

- Verifique se o backend está rodando na porta 3001
- Verifique se a URL base no arquivo `Frontend/public/js/bd-text.js` está correta
- Comando para reiniciar o backend:

```powershell
Set-Location -Path ".\backend"; npm run dev
```

### Erro: "Session Expired"

- Limpe os cookies do navegador
- Faça logout e login novamente
- Verifique se o servidor de autenticação está rodando na porta 3000

### Erro: MongoDB Connection

- Verifique sua conexão com a internet
- Confirme se as credenciais do MongoDB no arquivo `.env` estão corretas
- Teste a conexão manualmente usando o MongoDB Compass

## **🛠️ Ambiente de Desenvolvimento**

### VS Code Extensions Recomendadas

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ritwickdey.LiveServer",
    "mongodb.mongodb-vscode"
  ]
}
```

### Scripts Úteis (PowerShell)

#### Iniciar Todo o Ambiente

```powershell
# Terminal 1 - Backend API
Set-Location -Path ".\backend"; npm install; npm run dev

# Terminal 2 - Auth Server
Set-Location -Path ".\Frontend"; npm install; Set-Location -Path ".\src"; node server.js
```

#### Limpar Cache e Reinstalar

```powershell
# Remove node_modules e reinstala dependências
Remove-Item -Recurse -Force .\backend\node_modules\, .\Frontend\node_modules\
Set-Location -Path ".\backend"; npm install
Set-Location -Path "..\Frontend"; npm install
```

## **🤝 Contribuição**

1. Clone o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome`)
3. Commit suas mudanças (`git commit -m 'Descrição da feature'`)
4. Push para a branch (`git push origin feature/nome`)
5. Abra um Pull Request

## **📝 Logs e Debugging**

### Backend (API Principal)

- Logs são salvos em `backend/logs/`
- Use `npm run dev` para logs detalhados
- Debug no VS Code usando a configuração "Node: Backend"

### Frontend (Auth Server)

- Logs do servidor de autenticação em `Frontend/src/logs/`
- Use o DevTools do navegador para debug do cliente
- Debug no VS Code usando a configuração "Node: Auth Server"
