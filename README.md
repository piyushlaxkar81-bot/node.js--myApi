# Node.js MyAPI

A simple REST API built with Node.js, Express.js and MySQL for user management and database operations.

## Overview

Node.js MyAPI is a backend REST API that demonstrates how to build API endpoints with Express.js and connect them to a MySQL database.

The project currently provides endpoints for checking the API status, fetching users and creating new users.

## Features

- RESTful API architecture
- Express.js server
- MySQL database integration
- Fetch all users
- Create new users
- Request body validation
- Duplicate email handling
- CORS support
- Environment variable configuration
- JSON API responses
- Postman API testing

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- CORS
- Nodemon
- Postman

## Project Structure

```text
node.js-myApi/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── userController.js
│   │
│   ├── models/
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   └── userRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── index.html
├── script.js
└── style.css


## API Endpoints

### 1. API Health Check

**GET**

```text
/
```

Response:

```json
{
  "success": true,
  "message": "API working successfully"
}
```

---

### 2. Get All Users

**GET**

```text
/api/users/getUser
```

Returns all users stored in the MySQL `users` table.

Example response:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Piyush",
      "email": "piyush@example.com"
    }
  ]
}
```

---

### 3. Create User

**POST**

```text
/api/users/postUser
```

Request body:

```json
{
  "name": "Piyush",
  "email": "piyush@example.com"
}
```

Successful response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "Piyush",
    "email": "piyush@example.com"
  }
}
```

### Validation

If `name` or `email` is missing:

```text
400 Bad Request
```

Response:

```json
{
  "success": false,
  "message": "Name and email are required"
}
```

If the email already exists:

```text
409 Conflict
```

Response:

```json
{
  "success": false,
  "message": "Email already exists"
}
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
```

> Never commit your `.env` file to GitHub. It is already excluded through `.gitignore`.

## Installation

Clone the repository:

```bash
git clone https://github.com/piyushlaxkar81-bot/node.js--myApi.git
```

Navigate into the project:

```bash
cd node.js--myApi
```

Install dependencies:

```bash
npm install
```

Create your `.env` file and configure your MySQL database credentials.

## Run the Project

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server runs on:

```text
http://localhost:5000
```

## Testing

The API can be tested using:

- Postman
- Browser for GET requests
- Frontend applications

## Database

The API currently works with a MySQL database containing a `users` table.

Example structure:

```sql
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Current Architecture

```text
Client
   │
   ▼
Express.js
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
MySQL
```

## Future Improvements

- Add authentication and authorization
- Add JWT-based authentication
- Add update and delete user endpoints
- Add pagination
- Add filtering and searching
- Improve database connection management
- Add API documentation
- Deploy the API to a cloud platform

## Author

**Piyush Lakhara**

GitHub:  
https://github.com/piyushlaxkar81-bot

LinkedIn:  
https://www.linkedin.com/in/piyush-lakhara/