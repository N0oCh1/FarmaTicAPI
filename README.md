# FarmaTicAPI

A **Node.js / Express** REST API template following the **MVC** pattern with **JWT** authentication.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Scripts](#scripts)

---

## Project Structure

```
FarmaTicAPI/
├── src/
│   ├── config/
│   │   └── database.js          # DB connection placeholder
│   ├── controllers/
│   │   ├── authController.js    # register / login handlers
│   │   └── userController.js    # protected user handlers
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT validation middleware
│   │   ├── errorHandler.js      # Centralised error handler
│   │   └── validate.js          # express-validator helper
│   ├── models/
│   │   └── userModel.js         # In-memory user model (replace with ORM)
│   └── routes/
│       ├── authRoutes.js        # Public auth routes
│       ├── userRoutes.js        # Protected user routes
│       └── index.js             # Route aggregator
├── tests/
│   └── api.test.js              # Supertest integration tests
├── app.js                       # Express app setup
├── server.js                    # HTTP server entry point
├── .env.example                 # Environment variable template
└── package.json
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/N0oCh1/FarmaTicAPI.git
cd FarmaTicAPI

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and set JWT_SECRET and DB_URI

# 4. Start the development server
npm run dev
```

---

## Environment Variables

| Variable        | Description                                 | Default       |
|-----------------|---------------------------------------------|---------------|
| `PORT`          | HTTP server port                            | `3000`        |
| `NODE_ENV`      | Environment (`development` / `production`)  | `development` |
| `JWT_SECRET`    | Secret key used to sign/verify JWTs         | **required**  |
| `JWT_EXPIRES_IN`| JWT expiry duration (e.g. `1h`, `7d`)       | `1h`          |
| `DB_URI`        | Database connection string                  | *(optional)*  |

---

## API Endpoints

### Public

| Method | Path                      | Description              |
|--------|---------------------------|--------------------------|
| `GET`  | `/health`                 | Health check             |
| `POST` | `/api/v1/auth/register`   | Register a new user      |
| `POST` | `/api/v1/auth/login`      | Login and receive a JWT  |

### Protected (Bearer JWT required)

| Method | Path                 | Description                    |
|--------|----------------------|--------------------------------|
| `GET`  | `/api/v1/users/me`   | Get current user profile       |
| `GET`  | `/api/v1/users`      | Get all users                  |

---

## Authentication Flow

1. **Register** → `POST /api/v1/auth/register` with `{ name, email, password }`.  
   The response contains a signed JWT.

2. **Login** → `POST /api/v1/auth/login` with `{ email, password }`.  
   The response contains a signed JWT.

3. **Protected requests** → Include the JWT in the `Authorization` header:
   ```
   Authorization: Bearer <token>
   ```

---

## Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm start`     | Start server (`node server.js`)      |
| `npm run dev`   | Start with nodemon (auto-reload)     |
| `npm test`      | Run Jest integration tests           |
