# ESTRATEGICAMENTE

[Español](README.md) · [English](README.en.md)

> Individual project developed as part of my web development training at [TripleTen](https://tripleten.com/).

A full-stack digital marketing website combining an editorial landing page with a feed of insights from the public Dev.to API, user authentication, and a personal library of saved articles.

- Repository: [github.com/Giiraldo/project-estrategicamente](https://github.com/Giiraldo/project-estrategicamente)
- Frontend demo: [project-estrategicamente-pqxi.vercel.app](https://project-estrategicamente-pqxi.vercel.app)
- API: [project-estrategicamente.vercel.app](https://project-estrategicamente.vercel.app)

## Features

- Responsive landing page with a custom visual identity, value proposition, and calls to action.
- Marketing insights feed powered by the public [Dev.to API](https://dev.to).
- Topic search and category filters for marketing, SEO, social media, content, branding, and analytics.
- “Load more” pagination, local caching of the latest query, and loading, error, and empty states.
- User registration and sign-in with JWT authentication and bcrypt-hashed passwords.
- Persistent browser session, restored and validated against the API.
- Authenticated personal library for saving and removing articles.
- Home, about, authentication, saved-library, and not-found pages.
- Accessible interactions including keyboard navigation, labels, alt text, visible focus, and status messages.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router |
| Styling | Custom CSS, normalize.css, Sora, Manrope, and Instrument Serif |
| Backend | Node.js, Express 5, TypeScript |
| Database | MongoDB Atlas with Mongoose |
| Authentication | JWT, bcryptjs |
| External API | Dev.to API (`/api/articles?tag=marketing`) |
| Deployment | Vercel (frontend and API) and MongoDB Atlas |

## Project structure

```text
.
├── client/                 # React + Vite application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env.example
│   └── vercel.json
├── server/                 # Express + MongoDB API
│   ├── api/                # Vercel serverless entry point
│   ├── src/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── test/
│   ├── .env.example
│   └── vercel.json
└── README.md
```

## Local setup

### Requirements

- Node.js 20 or later.
- MongoDB Atlas or a local MongoDB instance.

### 1. API

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Add your credentials to `server/.env`. The API runs at `http://localhost:3001`.

| Environment variable | Description |
| --- | --- |
| `PORT` | Local port. Defaults to `3001`. |
| `MONGODB_URI` | MongoDB connection string. |
| `JWT_SECRET` | Long, random secret used to sign tokens. |
| `CLIENT_ORIGIN` | Allowed CORS origin(s), comma-separated; `*` is also supported. |

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

| Environment variable | Description |
| --- | --- |
| `VITE_API_URL` | API base URL. Defaults to `http://localhost:3001`. |

The frontend runs at `http://localhost:5173`.

## Scripts

### Client

```bash
npm run dev       # Development server
npm run build     # TypeScript check and production build
npm run lint      # oxlint
npm run preview   # Preview the production build
```

### Server

```bash
npm run dev        # Server with automatic reload
npm run typecheck  # TypeScript check
npm run build      # Compile to dist/
npm start          # Run the compiled server
npm test           # Integration tests with in-memory MongoDB
```

## API

All user and article routes require `Authorization: Bearer <token>`, except registration and sign-in.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/health` | API health status. |
| `POST` | `/signup` | Creates an account and returns a token. |
| `POST` | `/signin` | Signs in and returns a token. |
| `GET` | `/users/me` | Returns the authenticated user. |
| `GET` | `/articles` | Lists the user's saved articles. |
| `POST` | `/articles` | Saves an article to the user's library. |
| `DELETE` | `/articles/:id` | Removes an article from the user's library. |

### Data models

- `User`: name between 2 and 30 characters, unique valid email, and hashed password.
- `SavedArticle`: a Dev.to article associated with a user, with a unique index on `owner` and `articleId`.

## Tests

```bash
cd server
npm test
```

The integration tests cover health checks, registration, validation, sign-in, protected routes, saving, listing, duplicate handling, and deletion. They use `mongodb-memory-server` and do not require an external database.

## Deployment

### MongoDB Atlas

1. Create a MongoDB Atlas cluster; the free tier is sufficient for this project.
2. Create a database user and configure network access for the deployment environment. Avoid broad network access rules in production.
3. Use a database named `estrategicamente` and store its connection string in `MONGODB_URI`.

### API on Vercel

1. Import the repository and set `server` as the root directory.
2. Configure `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_ORIGIN=https://project-estrategicamente-pqxi.vercel.app`.
3. Deploy. `server/vercel.json` routes requests to `api/index.ts` and includes the dependencies needed to compile TypeScript.
4. Check the API with `GET https://project-estrategicamente.vercel.app/health`.

> `CLIENT_ORIGIN` must exactly match the frontend origin, without a trailing slash.

### Frontend on Vercel

1. Create a second Vercel project from this repository and set `client` as the root directory.
2. Configure `VITE_API_URL=https://project-estrategicamente.vercel.app`.
3. Deploy. `client/vercel.json` enables React Router routes to load on direct navigation and refresh.
4. The frontend is available at `https://project-estrategicamente-pqxi.vercel.app`.

## Technical decisions

- The public Dev.to API is called directly from the client because it supports CORS; the backend handles authentication and persistence.
- The session is stored in `localStorage` and validated against `GET /users/me` when the app starts.
- The backend caches its MongoDB connection so it can run both locally and in Vercel serverless functions.
- The deployment uses two Vercel projects from the same repository: `server` for the API and `client` for the SPA.
- `server/tsconfig.json` declares `typeRoots`, and `server/src/app.ts` references `express.d.ts` so TypeScript types resolve in Vercel's serverless environment.
- Passwords are never returned in API responses, and validation errors are shown in Spanish.

## Author

Jerson Foronda · [@Giiraldo](https://github.com/Giiraldo)
