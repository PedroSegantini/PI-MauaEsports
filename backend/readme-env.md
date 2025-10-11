# Portal Mauá Esports - Projeto Integrador

Olá! Este é o `README` do novo portal da Mauá Esports. Se você está vendo este projeto pela primeira vez, este guia irá explicar tudo o que você precisa saber, desde o que ele faz até como rodá-lo na sua máquina.

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

Siga estes passos na ordem para configurar e executar o projeto completo em sua máquina local.

### **Passo 0: Pré-requisitos**

Antes de começar, garanta que você tenha o seguinte instalado na sua máquina:
- **Node.js:** (versão 18 ou superior).
- **MongoDB:** Você não precisa instalar, pois o projeto já está configurado para usar a base de dados em nuvem (MongoDB Atlas).
- **VS Code** com a extensão **Live Server**.

### **Passo 1: Configurar o Backend**

1.  Abra um terminal e navegue até a pasta `backend` do projeto:
    ```bash
    cd backend
    ```
2.  Instale todas as dependências do servidor:
    ```bash
    npm install
    ```
3.  Na pasta `backend`, crie um arquivo chamado `.env` e cole o conteúdo abaixo:
    ```
    PORT=3000
    APIESPORTS_URL="[https://API-Esports.lcstuber.net/](https://API-Esports.lcstuber.net/)"
    APIESPORTS_TOKEN="Bearer frontendmauaesports"
    MONGODB_URL="mongodb+srv://mauaesportsbd:CDM9fi53PE83cMxI@cluster0.ib4qqro.mongodb.net/mauaesports-db?retryWrites=true&w=majority"
    JWT_SECRET="maua-esports-2025-um-segredo-muito-forte"
    ```

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

## **🛠️ Tecnologias Utilizadas**

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt.js.
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5, Axios.

---

## **📚 Documentação da API do Backend**

A API personalizada construída para este projeto inclui as seguintes rotas:

| Método | Rota                 | Descrição                                         | Acesso       |
| :----- | :------------------- | :------------------------------------------------ | :----------- |
| `POST` | `/login`             | Autentica um usuário e retorna um token JWT.        | Público      |
| `GET`  | `/api/players`       | Retorna a lista de todos os usuários.             | Admin        |
| `POST` | `/api/players`       | Cria um novo usuário.                             | Admin        |
| `PUT`  | `/api/players/:id`   | Atualiza um usuário existente.                    | Admin        |
| `DELETE`| `/api/players/:id`   | Deleta um usuário.                                | Admin        |
| `GET`  | `/api/my-hours`      | Retorna as horas de treino do usuário logado.     | Usuário Logado |
| `GET`  | `/content`           | Busca o conteúdo editável do site.                | Público      |
| `PATCH`| `/content/:containerId`| Atualiza um conteúdo específico do site.          | Admin (futuro) |