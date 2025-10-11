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

## 📄 Licença

Este projeto está sob a Licença MIT.
