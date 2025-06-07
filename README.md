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
- **Gerenciamento de Usuários:** O admin pode:
  - **Adicionar** novos membros (jogadores, capitães ou outros admins).
  - **Visualizar** todos os membros cadastrados.
  - **Deletar** membros.
- **Controle Total:** Esta é a área central para administrar quem tem acesso ao sistema.

#### 3. **Área do Jogador (Acesso para membros logados)**
- **Login Individual:** Cada membro usa seu RA e senha para entrar.
- **Consulta de Horas-Pai:** A principal funcionalidade aqui é a visualização das horas de atividades complementares. O sistema calcula automaticamente o tempo de treino de um jogador e exibe o total.
- **Dados em Tempo Real:** O cálculo é feito buscando os dados mais recentes da API de treinos da Mauá, então o valor está sempre atualizado.

---

## 🚀 Guia de Instalação e Execução

Siga estes passos na ordem para configurar e rodar o projeto.

### **Passo 0: Pré-requisitos**

Antes de começar, garanta que você tenha o seguinte instalado na sua máquina:
- **Node.js:** (de preferência a versão 18 ou mais recente).
- **MongoDB:** Você não precisa instalar, pois o projeto já está configurado para usar a base de dados em nuvem (MongoDB Atlas).
- **VS Code:** Editor de código recomendado.
- **Extensão "Live Server"** no VS Code: Para rodar o frontend facilmente.

### **Passo 1: Configurar o Backend**

1.  Abra um terminal na pasta do projeto.
2.  Navegue até a pasta `backend`:
    ```bash
    cd backend
    ```

3.  Instale todas as dependências do servidor:
    ```bash
    npm install
    ```

4.  Na pasta `backend`, crie um arquivo chamado `.env`. Ele é usado para guardar senhas e chaves de forma segura. Copie e cole o seguinte conteúdo nele:
    ```
    PORT=3000
    APIESPORTS_URL="[https://API-Esports.lcstuber.net/](https://API-Esports.lcstuber.net/)"
    APIESPORTS_TOKEN="Bearer frontendmauaesports"
    MONGODB_URL="mongodb+srv://mauaesportsbd:CDM9fi53PE83cMxI@cluster0.ib4qqro.mongodb.net/mauaesports-db?retryWrites=true&w=majority"
    JWT_SECRET="maua-esports-2025-um-segredo-muito-forte"
    ```

### **Passo 2: Iniciar o Servidor Backend**

1.  No mesmo terminal (ainda dentro da pasta `backend`), execute o comando:
    ```bash
    npm run dev
    ```
2.  Aguarde até que as mensagens de sucesso apareçam no terminal:
    `Conectado ao MongoDB com sucesso!`
    `Servidor funcionando na porta: 3000`
3.  **Importante:** Deixe este terminal aberto. Ele é o coração da aplicação.

### **Passo 3: Iniciar o Frontend**

1.  No VS Code, abra a pasta `frontend`.
2.  Clique com o botão direito no arquivo `frontend/index.html`.
3.  No menu que aparecer, selecione a opção **"Open with Live Server"**.
4.  Seu navegador abrirá automaticamente com o site principal.

### **Passo 4: Criando o Primeiro Administrador (Etapa Essencial)**

O sistema precisa de um "superusuário" para começar. Como o banco de dados está vazio, você precisa criar o primeiro admin manualmente.

1.  **Abra o arquivo `backend/index.js`** no VS Code.
2.  **Desabilite temporariamente a segurança** da rota de criação de jogadores.
    - **Encontre esta linha:**
      ```javascript
      app.post("/api/players", protect, admin, async (req, res) => {
      ```
    - **Adicione `/*` e `*/` para "comentar" a segurança:**
      ```javascript
      app.post("/api/players", /* protect, admin, */ async (req, res) => {
      ```
3.  Salve o arquivo `index.js`. O servidor no terminal irá reiniciar sozinho.
4.  Use uma ferramenta como **Postman** ou **Insomnia** para fazer o seguinte pedido:
    - **Método:** `POST`
    - **URL:** `http://localhost:3000/api/players`
    - **Body** (corpo da requisição, em formato JSON):
      ```json
      {
          "name": "Admin do Sistema",
          "ra": "admin",
          "discordId": "0",
          "password": "admin",
          "role": "admin"
      }
      ```
5.  Após enviar a requisição e receber a confirmação, **volte ao `index.js` e remova os `/* */`** para reativar a segurança.

### **Passo 5: Como Usar e Testar o Sistema**

1.  **Acesse o Painel Admin:**
    - Vá para a página `login.html` no seu navegador (ex: `http://127.0.0.1:5500/frontend/login.html`).
    - Use `admin` como RA e `admin` como senha.
    - Você será redirecionado para o `admin.html`. Aqui você pode criar novos jogadores.

2.  **Teste a Área do Jogador:**
    - No painel admin, crie um novo usuário com o cargo "Player".
    - Abra uma **nova janela anônima** no seu navegador.
    - Acesse novamente a página de `login.html` e entre com os dados do **jogador** que você criou.
    - Você será redirecionado para a página `minhas-horas.html` e verá o cálculo das horas daquele jogador.

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