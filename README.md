<p align="center">
  <img src="Frontend/public/img/logoMaua.png" alt="Logo Mauá Esports" width="200"/>
</p>

<h1 align="center">Projeto Portal Mauá Esports</h1>

<p align="center">
  <strong>Projeto Acadêmico do Portal da Mauá Esports</strong><br>
  <em>Gestão de times, campeonatos e horas de treino</em>
</p>

<p align="center">
  <a href="/README-template.md" target="_blank">🇺🇸 English</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/PedroSegantini/PI-MauaEsports" target="_blank">📚 Versão Original</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/PedroSegantini/PI-MauaEsports/issues" target="_blank">🐛 Reportar Bug</a>
</p>

<p align="center">
  <a href="https://github.com/PedroSegantini/PI-MauaEsports/stargazers">
    <img src="https://img.shields.io/github/stars/PedroSegantini/PI-MauaEsports?style=social" alt="GitHub stars">
  </a>
  <a href="https://github.com/PedroSegantini/PI-MauaEsports/issues">
    <img src="https://img.shields.io/github/issues/PedroSegantini/PI-MauaEsports" alt="GitHub issues">
  </a>
  <a href="https://github.com/PedroSegantini/PI-MauaEsports/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/PedroSegantini/PI-MauaEsports" alt="License">
  </a>
  <a href="https://github.com/PedroSegantini/PI-MauaEsports/releases">
    <img src="https://img.shields.io/github/v/release/PedroSegantini/PI-MauaEsports" alt="Latest Release">
  </a>
</p>

---


https://github.com/user-attachments/assets/d57ef51f-8cb4-4fd6-b6d3-dc5603385e09




**Portal Mauá Esports** é uma plataforma web completa para gestão dos times, campeonatos e horas de treino da entidade Mauá Esports.

> 📚 **Evolução do Projeto**: O sistema foi migrado para Node.js, Express e MongoDB, com frontend moderno em HTML, CSS e JavaScript, integrando autenticação Microsoft e painel administrativo completo.

## 🎓 Funcionalidades Principais

- **Site Público:** Apresentação institucional, times, campeonatos e redes sociais.
- **Painel do Administrador:** CRUD de jogadores, atribuição de cargos, edição de textos do site, consulta de horas PAE, edição de horários de treino.
- **Área do Jogador:** Login individual, consulta de horas de treino acumuladas.
- **API Backend:** Gerenciamento de usuários, conteúdos dinâmicos, horários e integração com MongoDB Atlas.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt.js, Axios
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5, Axios
- **Autenticação:** Microsoft OAuth (passport-microsoft)
- **Infraestrutura:** MongoDB Atlas, dotenv

## 📖 Como Usar e Instalar

### Pré-requisitos

- Node.js 18+
- VS Code (Live Server recomendado)

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/PedroSegantini/PI-MauaEsports.git
   cd PI-MauaEsports
   ```
2. Configure o backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env # Edite com suas credenciais se necessário
   npm run dev
   ```
3. Inicie o frontend:
   - Abra `Frontend/public/index.html` com Live Server ou servidor local.

### Criando o primeiro admin

1. Comente temporariamente a proteção da rota POST `/api/players` em `backend/index.js`.
2. Crie o usuário admin via Postman ou similar:
   ```json
   {
     "name": "Admin do Sistema",
     "ra": "admin",
     "discordId": "0",
     "email": "admin@maua.br",
     "password": "admin",
     "role": "admin"
   }
   ```
3. Desfaça o comentário para reativar a proteção.

## 🌐 Customização

O portal permite editar textos institucionais, cadastrar times, campeonatos e gerenciar usuários via painel admin.

## Endpoints Principais

| Método | Rota                   | Descrição                            | Acesso       |
| ------ | ---------------------- | ------------------------------------ | ------------ |
| POST   | /login                 | Autentica usuário e retorna JWT      | Público      |
| GET    | /api/players           | Lista todos os usuários              | Admin        |
| POST   | /api/players           | Cria novo usuário                    | Admin        |
| PUT    | /api/players/:email    | Atualiza usuário                     | Admin        |
| DELETE | /api/players/:email    | Deleta usuário                       | Admin        |
| GET    | /api/my-hours          | Consulta horas de treino do usuário  | Logado       |
| GET    | /content               | Busca conteúdo editável do site      | Público      |
| PATCH  | /content/:containerId  | Atualiza conteúdo específico do site | Admin        |
| GET    | /trainings             | Consulta horários de treino          | Logado/Admin |
| PUT    | /trainings/:modalityId | Atualiza horários de treino          | Admin        |

## 💻 Para Desenvolvedores

```bash
# 1. Clone o repositório
git clone https://github.com/PedroSegantini/PI-MauaEsports.git

# 2. Instale dependências do backend
cd backend
npm install

# 3. Instale dependências do frontend (se necessário)
cd ../Frontend
npm install

# 4. Rode o backend
cd ../backend
npm run dev

# 5. Rode o frontend
# Use Live Server ou abra index.html
```

## 📚 Perfeito para

- **Gestores de times universitários**
- **Jogadores e capitães**
- **Admins de entidades esportivas**
- **Desenvolvedores interessados em Node.js/Express/MongoDB**

## 🤝 Contribuindo

Contribuições são bem-vindas! Envie um Pull Request ou abra uma issue.

## 📄 Licença

Este projeto está sob a Licença MIT.
