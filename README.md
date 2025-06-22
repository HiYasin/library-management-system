# Library Management System Backend

A RESTful API server for managing a library system, built with Express.js, TypeScript, and Mongoose.

**Live Demo**: [https://library-management-server-faisal.vercel.app/](https://library-management-server-faisal.vercel.app/)

## Features
- Add, update, retrieve, and delete books
- Filter, sort, and paginate book listings
- Borrow books with quantity and due date validation
- View summary of borrowed books (with aggregation)
- Comprehensive validation and error handling
- Environment-based configuration

## API Endpoints

### Books
- `POST /api/books` — Add a new book
- `GET /api/books` — List all books (supports filtering, sorting, and limit)
  - Query params:
    - `filter` (genre)
    - `sortBy` (field)
    - `sort` (`asc` or `desc`)
    - `limit` (number)
- `GET /api/books/:bookId` — Get a single book by ID
- `PUT /api/books/:bookId` — Update a book by ID
- `DELETE /api/books/:bookId` — Delete a book by ID

### Borrow
- `POST /api/borrow` — Borrow a book
- `GET /api/borrow` — Get summary of borrowed books

## Getting Started

### Prerequisites
- Node.js (v18 or above recommended)
- npm
- MongoDB database (local or Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/HiYasin/library-management-system.git
   cd library-management-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and set the following variables:
   ```env
   PORT=3000
   DB_URL=<your-mongodb-connection-string>
   API_BASE_URL=http://localhost:3000/api
   NODE_ENV=development
   ```

### Running the Server
```bash
npm run dev
```
The server will start on the port specified in your `.env` file (default: 3000).

## Project Structure

```
library-management-server/
├── src/
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Server entry point
│   └── app/
│       ├── controllers/      # Route controllers
│       ├── interfaces/       # TypeScript interfaces
│       ├── middlewares/      # Error & endpoint handlers
│       └── models/           # Mongoose schema & models
├── .env                      # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```
