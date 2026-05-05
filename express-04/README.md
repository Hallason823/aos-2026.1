# Resume API

REST API built with **Express + PostgreSQL (NeonDB)** for a curriculum/resume application.

## Entities & Relationships

```text
Person
  ├── Education   (Person hasMany Education)
  ├── Experience  (Person hasMany Experience)
  ├── Skill       (Person hasMany Skill)
  └── Project     (Person hasMany Project)
```

## Setup

- Clone the repo and install dependencies:

```bash
npm install
```

- Copy `.env.sample` to `.env` and fill in your NeonDB connection string:

```bash
cp .env.sample .env
```

- To seed the database, set `ERASE_DATABASE_ON_SYNC=true` in `.env` once, then revert to `false`.

- Start the server:

```bash
npm start
```

## API Routes

> Base URL (local): `http://localhost:3000`

### Person

| Method | Route              | Description          |
| ------ | ------------------ | -------------------- |
| GET    | /persons           | List all persons     |
| GET    | /persons/:personId | Get a person by ID   |
| POST   | /persons           | Create a person      |
| PUT    | /persons/:personId | Update a person      |
| DELETE | /persons/:personId | Delete a person      |

### Education

| Method | Route                    | Description                  |
| ------ | ------------------------ | ---------------------------- |
| GET    | /educations              | List all education entries   |
| GET    | /educations/:educationId | Get an education entry by ID |
| POST   | /educations              | Create an education entry    |
| PUT    | /educations/:educationId | Update an education entry    |
| DELETE | /educations/:educationId | Delete an education entry    |

### Experience

| Method | Route                      | Description              |
| ------ | -------------------------- | ------------------------ |
| GET    | /experiences               | List all experiences     |
| GET    | /experiences/:experienceId | Get an experience by ID  |
| POST   | /experiences               | Create an experience     |
| PUT    | /experiences/:experienceId | Update an experience     |
| DELETE | /experiences/:experienceId | Delete an experience     |

### Skill

| Method | Route            | Description        |
| ------ | ---------------- | ------------------ |
| GET    | /skills          | List all skills    |
| GET    | /skills/:skillId | Get a skill by ID  |
| POST   | /skills          | Create a skill     |
| PUT    | /skills/:skillId | Update a skill     |
| DELETE | /skills/:skillId | Delete a skill     |

### Project

| Method | Route                | Description          |
| ------ | -------------------- | -------------------- |
| GET    | /projects            | List all projects    |
| GET    | /projects/:projectId | Get a project by ID  |
| POST   | /projects            | Create a project     |
| PUT    | /projects/:projectId | Update a project     |
| DELETE | /projects/:projectId | Delete a project     |
