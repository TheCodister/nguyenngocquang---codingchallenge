# Currency Swap API

A fast and scalable backend service for handling currency conversions, built with **Express.js**, **TypeScript**, and **Prisma ORM**. This backend provides APIs to fetch real-time conversion rates and manage conversion history.

## 🚀 Features

- RESTful API endpoints for currency conversion
- Stores conversion history in **PostgreSQL** using **Prisma ORM**
- Validates requests with **Zod** for type safety
- Implements **CORS** for frontend integration
- Error handling and logging

## 🛠️ Prerequisites

Make sure you have the following installed before running the backend:

- **[Node.js](https://nodejs.org/)** (v16 or higher recommended)
- **[pnpm](https://pnpm.io/)** (preferred package manager)
- **[SQLite](https://www.sqlite.org//)** (for storing conversion data)
- **[Prisma](https://www.prisma.io/)** (ORM for database management)

## ❓ Why I Chose These Technologies

- **Node.js:** A powerful, asynchronous, event-driven JavaScript runtime. It is
  essential for running JavaScript-based applications, including both the
  frontend and backend of this project.
- **pnpm:** I prefer **pnpm** over **npm** or **Yarn** because it is faster and
  uses less memory when installing dependencies.
- **SQLite**: Since this is a simple application, SQLite is sufficient for handling basic CRUD operations. For larger projects, I would typically use PostgreSQL.
- **Prisma**: Prisma is a modern and powerful ORM that provides better control over data compared to traditional ORMs. It also enhances developer productivity with its intuitive API and type safety.

## 📦 Installation

Clone the repository and install dependencies using `pnpm`:

```sh
# Clone the repository
git clone https://github.com/TheCodister/nguyenngocquang---codingchallenge.git
cd src/problem5

# Install dependencies
pnpm install
```

## 🏃‍♂️ Running the Server

Before starting the server, configure your environment variables in a `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost:5432/currency_db
PORT=3001
```

Run database migrations and seed data:

```sh
pnpm prisma migrate dev
pnpm prisma db seed
```

Start the Express server:

```sh
pnpm dev
```

The server will run at `http://localhost:3001/`.

## 🔧 API Endpoints

### Get All Conversions

```
GET /api/v1/conversions
```

**Response:**

```json
[
  {
    "id": "1",
    "fromCurrency": "USD",
    "toCurrency": "EUR",
    "fromAmount": 100,
    "toAmount": 90,
    "createdAt": "2025-02-11T12:34:56Z"
  }
]
```

### Create a Conversion

```
POST /api/v1/conversions
```

**Request Body:**

```json
{
  "fromCurrency": "USD",
  "toCurrency": "EUR",
  "fromAmount": 100,
  "toAmount": 90
}
```

**Response:**

```json
{
  "id": "2",
  "fromCurrency": "USD",
  "toCurrency": "EUR",
  "fromAmount": 100,
  "toAmount": 90,
  "createdAt": "2025-02-11T12:40:00Z"
}
```

### Delete a Conversion

```
DELETE /api/v1/conversions/:id
```

**Response:**

```json
{
  "message": "Conversion deleted successfully"
}
```

## 🤝 Contribution

Feel free to fork this repository and contribute by submitting a pull request. 🚀

## 📜 License

This project is licensed under the my License.
