# My Blog: Full-Stack Blog Application

A full-stack blog site built for the CCSFEN1L laboratory activities. The **React** frontend talks to an **Express** backend through **Axios**, and the backend stores everything in **MongoDB**.

## Features

- Public blog page with search, category filter, and Latest / Popular sorting
- View a blog, like it, and read its comments
- User registration and login (passwords are hashed with bcrypt)
- Admin panel with a sidebar: Dashboard, Blog List, Comments List, and Profile
- Dashboard with KPI cards and charts (views, likes, comments, blogs per category)
- Create, update, delete, and like blogs
- Confirmation popups, success / failed popups, loading indicators, and error handling when the server is unreachable

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, Vite, React Router, Axios, Recharts |
| Backend | Node.js, Express 5, Mongoose, bcryptjs, dotenv, cors |
| Database | MongoDB (local Community Server, viewed with MongoDB Compass) |

## Project Structure

```
<repo>/
├── client/
│   └── client/                 React + Vite frontend
│       └── src/
│           ├── components/     card, config, loading, modal, navbar, pages, styles
│           ├── services/       api.js and the service files (article, auth, comment, statistics, profile)
│           ├── App.jsx
│           └── main.jsx
└── server/                     Express + MongoDB backend
    ├── models/                 Article, User, Comment
    ├── routes/                 article, user, comment, statistics routes
    ├── utils/                  helper functions
    ├── seed.js                 fills the database with sample data
    ├── server.js               app entry point
    └── .env                    environment variables (you create this)
```

> The Vite app lives in `client/client`. Run all frontend commands from that folder.

## Prerequisites

Install these first:

1. **Node.js** version 20.19 or newer (the LTS release is recommended). Check with `node -v`.
2. **Git**. Check with `git --version`.
3. **MongoDB Community Server**. Download it from mongodb.com (Community Edition, Windows `.msi`). In the installer, choose **Complete** and keep **Install MongoDB as a Service** checked.
4. **MongoDB Compass** (optional but recommended). It is the app you use to look at your database.

## 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

## 2. Set Up the Database

MongoDB runs as a Windows service in the background, so there is no app to open for the server itself.

**Check that the service is running** (PowerShell):

```powershell
Get-Service MongoDB
```

The status should be `Running`. If it says `Stopped`, open PowerShell **as Administrator** and run:

```powershell
Start-Service MongoDB
```

**Check the connection in Compass:**

1. Open MongoDB Compass and click **Add new connection**.
2. Use this connection string:
   ```
   mongodb://127.0.0.1:27017
   ```
3. Click **Save & Connect**. You should see the `admin`, `config`, and `local` databases.

You do not need to create the `blogdb` database by hand. The seed script in step 3 creates it together with the `articles`, `users`, and `comments` collections.

## 3. Set Up the Backend

```bash
cd server
npm install
```

**Create the environment file.** Make a new file named `.env` inside the `server` folder (the name starts with a dot and has no `.txt` at the end):

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blogdb
```

**Seed the database** with sample data (2 users, 5 blogs, 7 comments):

```bash
npm run seed
```

> Warning: `npm run seed` deletes everything in the `articles`, `users`, and `comments` collections before inserting the sample data. Do not run it if you want to keep your own data.

**Start the server:**

```bash
npm run dev
```

You should see:

```
Successfully connected to MongoDB!
Server running on port 5000
```

Open `http://localhost:5000` in a browser. It should show `{"message":"API is running"}`.

## 4. Set Up the Frontend

Open a **second terminal** and leave the backend running in the first one.

```bash
cd client/client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

The frontend reaches the backend at `http://localhost:5000`. If you change the backend port, update `baseURL` in `client/client/src/services/api.js` as well.

## 5. Running the Project (Every Time)

You need **two terminals** running at the same time:

| Terminal | Folder | Command |
|---|---|---|
| 1 (backend) | `server` | `npm run dev` |
| 2 (frontend) | `client/client` | `npm run dev` |

Make sure the MongoDB service is running first.

## Demo Accounts

Created by `npm run seed`:

| Name | Email | Password |
|---|---|---|
| Renz San Diego | renz@example.com | password123 |
| Guest User | guest@example.com | guest123 |

You can also create your own account on the Register page.

## Available Scripts

**Backend (`server`)**

| Command | What it does |
|---|---|
| `npm run dev` | Starts the server with auto-restart (nodemon) |
| `npm run seed` | Resets the database to the sample data |

**Frontend (`client/client`)**

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Vite dev server |
| `npm run build` | Creates a production build |
| `npm run lint` | Runs ESLint |
| `npm run preview` | Previews the production build |

## API Reference

Base URL: `http://localhost:5000`

**Articles**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/articles` | Get all articles (with comment counts) |
| GET | `/articles/:id` | Get a specific article |
| POST | `/articles/create` | Create an article |
| PATCH | `/articles/:id` | Update an article |
| PATCH | `/articles/:id/like` | Add one like |
| DELETE | `/articles/:id` | Delete an article and its comments |

**Users**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Log in |
| GET | `/users/:id` | Get profile information |
| PATCH | `/users/:id` | Update profile information |
| PATCH | `/users/:id/password` | Change password |

**Comments**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/comments` | Get all comments (use `?article=<id>` to filter) |
| GET | `/comments/:id` | Get a single comment |
| POST | `/comments/create` | Create a comment |
| PATCH | `/comments/:id` | Update a comment |
| DELETE | `/comments/:id` | Delete a comment |

**Statistics**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/statistics` | Totals and chart data for the dashboard |

## Using MongoDB Atlas Instead (Optional)

If you prefer a cloud database, create a free cluster on MongoDB Atlas, create a database user, and allow your IP address. Then replace `MONGO_URI` in `server/.env` with the connection string from Atlas, and add `/blogdb` before the `?`:

```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/blogdb?retryWrites=true&w=majority
```

## Troubleshooting

| Problem | Fix |
|---|---|
| `ECONNREFUSED 127.0.0.1:27017` | The MongoDB service is not running. Run `Start-Service MongoDB` in an Administrator PowerShell. |
| `The uri parameter to openUri() must be a string, got undefined` | The `.env` file is missing or in the wrong folder. It must be inside `server`. |
| `EADDRINUSE: address already in use :::5000` | Another program uses port 5000. Change `PORT` in `.env` and `baseURL` in `src/services/api.js`. |
| Home page says "Failed to load blogs" | The backend is not running, or the seed was never run. Start the server and run `npm run seed`. |
| `Invalid hook call` in the browser console | React is installed twice. Run `npm install` only inside `client/client`, and delete any stray `node_modules` or `package.json` in the outer `client` folder. |
| `Failed to resolve import ...` | A file is missing or the import path or file name has the wrong spelling or capitalization. |
| `Remove-Item` / `EPERM` when deleting `node_modules` | Stop the dev server (`Ctrl + C`) first, then delete the folder. |
| Logged out after refreshing the page | Expected. The login state is kept in memory only. |

## Notes

- This is a school project. Login does not use tokens (JWT) or sessions, so it is not production-ready.
- Do not commit `server/.env` or any `node_modules` folder. Add them to `.gitignore`:

  ```
  node_modules/
  .env
  ```
