<p align="center">
  <img src="Frontend/public/img/logoMaua.png" alt="Mauá Esports Logo" width="200"/>
</p>

<h1 align="center">Mauá Esports Portal</h1>

<p align="center">
  <strong>Official portal for Mauá Esports</strong><br>
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

## 🚀 How to Install and Run

### Prerequisites

- Node.js 18+
- VS Code (Live Server recommended)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/PedroSegantini/PI-MauaEsports.git
   cd PI-MauaEsports
   ```
2. Set up the backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env # Edit with your credentials if needed
   npm run dev
   ```
3. Start the frontend:
   - Open `Frontend/public/index.html` with Live Server or a local server.

### Creating the first admin

1. Temporarily comment out the protection for the POST `/api/players` route in `backend/index.js`.
2. Create the admin user via Postman or similar:
   ```json
   {
     "name": "System Admin",
     "ra": "admin",
     "discordId": "0",
     "email": "admin@maua.br",
     "password": "admin",
     "role": "admin"
   }
   ```
3. Undo the comment to reactivate protection.

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

## 💻 For Developers

```bash
# 1. Clone the repository
git clone https://github.com/PedroSegantini/PI-MauaEsports.git

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies (if needed)
cd ../Frontend
npm install

# 4. Run the backend
cd ../backend
npm run dev

# 5. Run the frontend
# Use Live Server or open index.html
```

## 📚 Target Audience

- **University team managers**
- **Players and captains**
- **Sports entity admins**
- **Developers interested in Node.js/Express/MongoDB**

## 🤝 Contributing

Contributions are welcome! Submit a Pull Request or open an issue.

## 📄 License

This project is under the MIT License.
