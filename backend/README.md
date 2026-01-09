# Secure REST API Backend

## Setup
```bash
cd backend
npm install            # install dependencies (express, cors, dotenv, bcrypt, jsonwebtoken, prisma, @prisma/client)
npm install -D nodemon # dev dependency for hot reload
npx prisma generate     # generate Prisma client
```

## Development
Add a script to `package.json`:
```json
"scripts": {
  "dev": "nodemon src/app.js"
}
```
Run the server in development mode:
```bash
npm run dev
```

## Database
Make sure PostgreSQL is running and update the `DATABASE_URL` in `.env` with your credentials.
Then run the initial migration:
```bash
npx prisma migrate dev --name init
```

## API Endpoints
- `POST /api/auth/register` – Register a new user.
- `POST /api/auth/login` – Login and receive a JWT.

## Notes
- JWT secret is defined in `.env` as `JWT_SECRET`.
- Passwords are hashed with bcrypt.
- Prisma client is used for database access.
