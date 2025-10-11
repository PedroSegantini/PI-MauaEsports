<p align="center">
  <img src="Frontend/public/img/logoMaua.png" alt="Mauá Esports Logo" width="200"/>
</p>

<h1 align="center">Mauá Esports Portal</h1>

<p align="center">
  <strong>Mauá Esports Portal Academic Project</strong><br>
  <em>Team, championship and training hours management</em>
</p>

<p align="center">
  <a href="/README.md" target="_blank">🇧🇷 Português</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/PedroSegantini/PI-MauaEsports" target="_blank">📚 Original Repository</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/PedroSegantini/PI-MauaEsports/issues" target="_blank">🐛 Report Bug</a>
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



https://github.com/user-attachments/assets/55f16509-0100-4e69-b79c-6ade5c883d21



**Mauá Esports Portal** is a complete web platform for managing teams, championships and training hours for Mauá Esports.

> 📚 **Project Evolution**: The system was migrated to Node.js, Express and MongoDB, with a modern frontend in HTML, CSS and JavaScript, integrating Microsoft authentication and a complete admin panel.

## 🎓 Main Features

- **Public Site:** Institutional presentation, teams, championships and social networks.
- **Admin Panel:** CRUD for players, role assignment, site text editing, training hours query, training schedule editing.
- **Player Area:** Individual login, query of accumulated training hours.
- **Backend API:** User management, dynamic content, schedules and integration with MongoDB Atlas.

## 🛠️ Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt.js, Axios
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5, Axios
- **Authentication:** Microsoft OAuth (passport-microsoft)
- **Infrastructure:** MongoDB Atlas, dotenv


## 🌐 Customization

The portal allows you to edit institutional texts, register teams, championships and manage users via the admin panel.

## Main Endpoints

| Method | Route                  | Description                        | Access       |
| ------ | ---------------------- | ---------------------------------- | ------------ |
| POST   | /login                 | Authenticates user and returns JWT | Public       |
| GET    | /api/players           | Lists all users                    | Admin        |
| POST   | /api/players           | Creates new user                   | Admin        |
| PUT    | /api/players/:email    | Updates user                       | Admin        |
| DELETE | /api/players/:email    | Deletes user                       | Admin        |
| GET    | /api/my-hours          | Query user's training hours        | Logged in    |
| GET    | /content               | Fetch editable site content        | Public       |
| PATCH  | /content/:containerId  | Update specific site content       | Admin        |
| GET    | /trainings             | Query training schedules           | Logged/Admin |
| PUT    | /trainings/:modalityId | Update training schedules          | Admin        |


## 📄 License

This project is under the MIT License.
