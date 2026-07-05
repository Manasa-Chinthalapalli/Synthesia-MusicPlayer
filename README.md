<div align="center">

<h1>SYNTHESIA</h1>
<p><strong>A full-stack MERN music streaming application with secure authentication, curated playlists, and a real-time audio engine.</strong></p>

<p>
<a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/React-19-black?style=flat-square&logo=react&logoColor=61DAFB"></a>
<a href="https://nodejs.org/"><img alt="Node" src="https://img.shields.io/badge/Node.js-Express%205-black?style=flat-square&logo=node.js&logoColor=339933"></a>
<a href="https://www.mongodb.com/"><img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-black?style=flat-square&logo=mongodb&logoColor=47A248"></a>
<a href="https://redux-toolkit.js.org/"><img alt="Redux" src="https://img.shields.io/badge/State-Redux%20Toolkit-black?style=flat-square&logo=redux&logoColor=764ABC"></a>
<a href="https://vitejs.dev/"><img alt="Vite" src="https://img.shields.io/badge/Build-Vite-black?style=flat-square&logo=vite&logoColor=646CFF"></a>
<a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-black?style=flat-square"></a>
</p>

</div>

<br>

## About

**Synthesia** is a full-stack music streaming platform built on the MERN stack. It streams real, licensed tracks through the Jamendo catalog and wraps them in a production-style listening experience: mood- and genre-based playlists, live search, a persistent playback bar, and complete user accounts secured end-to-end with JWT authentication.

The project is deliberately structured the way a production application would be — a decoupled REST API on the backend, a component-driven, Redux-managed frontend, and a dedicated audio engine hook that owns all playback state so the UI stays declarative.

<br>

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

<br>

## Features

**Playback**
- Genre and mood-based playlists (Workout, Relaxing, Rock, and more)
- Live search across a real, continuously updated music catalog
- Full transport controls — play, pause, skip, shuffle, repeat
- Variable playback speed and volume control, with a seekable, time-synced progress bar
- A persistent player bar that survives navigation across the app

**Accounts and Security**
- Signup and login with salted, hashed passwords (bcrypt)
- Stateless session management via signed JWTs
- Self-service password recovery through a tokenized email flow (Nodemailer + Mailtrap)
- Editable user profiles with CDN-backed avatar uploads (ImageKit)

**Personalization**
- Per-user favourites, persisted server-side and synced on login

**Engineering**
- Centralized, predictable state via Redux Toolkit slices
- Modal-driven auth flows with no full-page reloads
- A single custom hook (`useAudioPlayer`) encapsulating all audio-element logic, decoupling playback state from the DOM

<br>

## Architecture

```
┌────────────────────┐       REST / JSON       ┌────────────────────┐
│   React Frontend     │ ───────────────────────▶ │   Express API        │
│   (Vite + Redux)      │ ◀─────────────────────── │   (Node.js)            │
└────────────────────┘                            └────────────────────┘
                                                             │
                                    ┌────────────────────────┼────────────────────────┐
                                    ▼                        ▼                        ▼
                               MongoDB                ImageKit CDN            Jamendo Music API
                          (users, favourites)         (avatar storage)          (track catalog)
```

<br>

## Tech Stack

| Layer          | Technology                                                |
| :------------- | :----------------------------------------------------------- |
| Frontend       | React 19, Redux Toolkit, React Router, Vite, Tailwind CSS      |
| Backend        | Node.js, Express 5                                              |
| Database       | MongoDB, Mongoose                                                 |
| Authentication | JSON Web Tokens, bcrypt                                            |
| Media          | ImageKit (avatars), Jamendo API (music catalog)                     |
| Email          | Nodemailer, Mailtrap                                                  |
| HTTP Client    | Axios                                                                   |

<br>

## Project Structure

```
Music-Player/
├── backend/
│   ├── config/            Database connection and ImageKit setup
│   ├── controllers/       Auth and song business logic
│   ├── middleware/        JWT route protection
│   ├── models/            Mongoose schemas
│   ├── routes/            Express route definitions
│   ├── utils/             Email delivery helper
│   └── index.js           Application entry point
│
└── frontend/
    └── src/
        ├── components/    Auth, player, search, songs, layout, shared UI
        ├── hooks/         useAudioPlayer — the playback engine
        ├── pages/         Route-level views
        ├── redux/         Store and feature slices (auth, ui)
        └── css/           Modular, component-scoped stylesheets
```

<br>

## Getting Started

### Prerequisites

- Node.js 18 or later
- A MongoDB instance — [Atlas](https://www.mongodb.com/cloud/atlas/register) (free tier) or local
- An [ImageKit](https://imagekit.io/) account, for avatar uploads
- A [Mailtrap](https://mailtrap.io/) account, for password-reset email delivery

### Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/Synthesia-MusicPlayer.git
cd Synthesia-MusicPlayer
```

**Backend**

```bash
cd backend
npm install
cp .env.example .env      # then fill in your values, see below
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
cp .env.example .env      # then set VITE_BASE_URL, see below
npm run dev
```

The frontend will be available at `http://localhost:5173`, communicating with the API at `http://localhost:5001`.

<br>

## Environment Variables

**`backend/.env`**

| Variable                | Description                                     |
| :----------------------- | :--------------------------------------------------- |
| `PORT`                    | Port the Express server listens on                    |
| `MONGODB_URI`             | MongoDB connection string                                |
| `JWT_SECRET`              | Secret used to sign authentication tokens                  |
| `JWT_EXPIRES_IN`          | Token lifetime, e.g. `7d`                                    |
| `FRONTEND_URL`            | Base URL used to build password-reset email links              |
| `IMAGEKIT_PUBLIC_KEY`     | ImageKit public API key                                          |
| `IMAGEKIT_PRIVATE_KEY`    | ImageKit private API key                                            |
| `IMAGEKIT_URL_ENDPOINT`   | ImageKit CDN endpoint                                                  |
| `MAILTRAP_HOST`           | Mailtrap SMTP host                                                        |
| `MAILTRAP_PORT`           | Mailtrap SMTP port                                                          |
| `MAILTRAP_USER`           | Mailtrap SMTP username                                                       |
| `MAILTRAP_PASS`           | Mailtrap SMTP password                                                         |

**`frontend/.env`**

| Variable         | Description                       |
| :---------------- | :------------------------------------ |
| `VITE_BASE_URL`    | Base URL of the running backend API     |

<br>

## API Reference

### Auth — `/api/auth`

| Method | Endpoint                | Description                       | Auth |
| :----- | :------------------------| :------------------------------------| :----: |
| POST   | `/signup`                  | Create a new account                  |  —   |
| POST   | `/login`                   | Authenticate and receive a token       |  —   |
| GET    | `/me`                      | Retrieve the current user profile       | Required |
| POST   | `/forgot-password`         | Send a password-reset email               |  —   |
| POST   | `/reset-password/:token`   | Reset password using an emailed token       |  —   |
| PATCH  | `/profile`                 | Update profile details or avatar              | Required |

### Songs — `/api/songs`

| Method | Endpoint               | Description                          | Auth |
| :----- | :-----------------------| :----------------------------------------| :----: |
| GET    | `/`                        | Fetch or search songs                       |  —   |
| GET    | `/playlistByTag/:tag`      | Retrieve songs for a given tag or genre         |  —   |
| POST   | `/favourite`               | Toggle a song's favourite status                   | Required |
| GET    | `/favourites`              | Retrieve the current user's favourites                | Required |

<br>

## Roadmap

- [ ] User-created, custom playlists
- [ ] Synchronized lyrics display
- [ ] Cross-device playback continuity
- [ ] Shareable tracks and playlists
- [ ] Light theme support

<br>

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a pull request

<br>

## License

This project is licensed under the **MIT License**. See [`LICENSE`](./LICENSE) for the full text.

<br>

<div align="center">
<sub>Built by Manasa Chinthalapalli</sub>
</div>
