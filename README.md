
# Workout Tracker API

This is a Workout Tracker API built with Node.js, Express, and TypeScript. It allows users to manage workout plans, exercises, workout sessions, and logs.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) 

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/shayanbista/workoutTracker.git
```

### 2. Install dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file at the root of the project and define the following environment variables:

```plaintext
# Server settings
PORT=3000

# Database settings
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=workout_tracker

# JWT settings
JWT_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRATION=3600
JWT_REFRESH_EXPIRATION=86400
```

### 4. Set up the database

Make sure your database (e.g., PostgreSQL) is up and running. Then, run the database migrations to create the required tables:

```bash
npm run migration:run
```

To seed the database with initial data:

```bash
npm run seed
```

### 5. Running the application

To start the application in development mode, use the following command:

```bash
npm run dev
```

This will start the server with hot-reloading enabled.

### 6. Build the project (for production)

To build the project for production, run:

```bash
npm run build
```

Then, start the built project:

```bash
npm run start
```

## Project Structure

```
backend/
│
├── node_modules/      # Node modules and dependencies
├── src/
│   ├── controller/    # Controllers for handling routes
│   ├── entity/        # Database entities for TypeORM
│   ├── error/         # Custom error handlers and classes
│   ├── interface/     # TypeScript interfaces for type safety
│   ├── middleware/    # Middleware for authentication, validation, etc.
│   ├── migration/     # Database migration files
│   ├── route/         # Express routes
│   ├── schema/        # Validation schemas for request bodies
│   ├── seeds/         # Database seed files for initial data
│   ├── service/       # Services for business logic
│   ├── utils/         # Utility functions and helpers
│   ├── config.ts      # Configuration for the application
│   ├── dataSource.ts  # Data source configuration for TypeORM
│   └── index.ts       # Entry point of the application
├── .env               # Environment variables configuration
├── .env.example       # Example environment configuration
├── .gitignore         # Files and directories to ignore in version control
├── package-lock.json  # Lockfile for npm
├── package.json       # NPM dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

### Running Tests

You can run the tests using the following command:

```bash
npm test
```

## API Endpoints

### Authentication

- **POST** `/auth/login`: Login to the system and retrieve an access and refresh token.

### User

- **GET** `/users`: Fetch all users.
- **POST** `/users`: Create a new user.

### Exercise

- **POST** `/exercises`: Add a new exercise.
- **GET** `/exercises`: Fetch all exercises.
- **GET** `/exercises/:id`: Get a specific exercise by its ID.

### Workout Plan

- **POST** `/workoutPlans`: Create a new workout plan.
- **PUT** `/workoutPlans/:id`: Update a workout plan.
- **DELETE** `/workoutPlans/:id`: Delete a workout plan.

### Workout Plan Exercise

- **POST** `/workoutPlanExercises`: Add an exercise to a workout plan.
- **PUT** `/workoutPlanExercises/:id`: Update an exercise in a workout plan.
- **DELETE** `/workoutPlanExercises/:id`: Remove an exercise from a workout plan.

### Workout Session

- **POST** `/workoutPlanSessions/:id`: Add a new workout session.
- **PUT** `/workoutPlanExercises/:id`: Update a session in a workout Session.
- **DELETE** `/workoutPlanSessions/:id`: Delete a workout session.

### Workout Log

- **POST** `/workoutLogs`: Log a completed workout.
- **GET** `/workoutLogs`: Fetch all workout logs.

## Database Migrations

To run the database migrations, use:

```bash
npm run migration:run
```

## Database Seeding

To seed the database with initial data, use:

```bash
npm run seed
```
