# Secure REST API & Task Management System

A full-stack application built for a technical assignment, featuring secure authentication, role-based access control, and a task management system.

##  Features

- **Authentication**: Secure Login and Registration using JWT.
- **Role-Based Access Control (RBAC)**:
  - `USER`: Can create, view, update, and delete their own tasks.
  - `ADMIN`: Has full access and can delete any task in the system.
- **Task Management**: Full CRUD operations for tasks.
- **API Documentation**: Interactive Swagger UI.
- **Frontend**: Modern React UI built with Vite and Axios.
- **Database**: PostgreSQL managed with Prisma ORM.

##  Tech Stack

- **Backend**: Node.js, Express, Prisma, PostgreSQL, JWT, bcrypt.
- **Frontend**: React (Vite), Axios, React Router.
- **Documentation**: Swagger UI.

##  Project Structure

```
.
├── backend/            # Express Server & Prisma Setup
│   ├── prisma/         # Schema & Migrations
│   └── src/            # API Source Code
└── frontend/           # React Application
    ├── src/            # UI Components & Services
    └── index.html
```

##  Setup Instructions

### 1. Prerequisites
- Node.js (v16+)
- PostgreSQL installed and running.

### 2. Backend Setup
1. Navigate to `backend/`.
2. Install dependencies: `npm install`.
3. Create a `.env` file (see `.env.example` if available, or use the format below).
4. Run migrations: `npx prisma migrate dev --name init`.
5. Start the server: `npm run dev`.

**Backend .env format:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
JWT_SECRET="your_secret_key"
PORT=5000
```

### 3. Frontend Setup
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.
4. Open `http://localhost:5173` in your browser.

## API Documentation

Once the backend is running, visit:
**`http://localhost:5000/api-docs`**

##  Scalability & Future Improvements

To take this project to a production-grade level, the following could be implemented:

1. **Microservices Architecture**: Separate the Auth and Task services to allow independent scaling.
2. **Caching**: Use **Redis** to cache frequently accessed tasks and session data.
3. **Load Balancing**: Use Nginx or AWS ALB to distribute traffic across multiple instances.
4. **Containerization**: Use **Docker** and Kubernetes for consistent deployment and scaling.
5. **Rate Limiting**: Implement `express-rate-limit` to prevent API abuse.
6. **Logging**: Use Winston or Morgan for structured logging and monitoring (e.g., ELK stack).

##  License
This project is for educational/assignment purposes.
