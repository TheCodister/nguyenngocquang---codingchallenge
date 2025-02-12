# 🚀 Coding Challenge

This repository contains solutions to five coding challenges for 99Tech, covering JavaScript and TypeScript problem-solving, React development, and backend implementation with Express.js.

## 📌 Completed Problems

### **1️⃣ Three Ways to Sum to `n` (JavaScript)**

Implement three different methods to compute the sum of numbers up to `n`.

- **Approach 1:** Iterative loop
- **Approach 2:** Recursion
- **Approach 3:** Mathematical formula (`n * (n + 1) / 2`)
- **And 2 MORE APPROACH**

### **2️⃣ Currency Swap React App**

A modern, user-friendly currency swap application built with:

- **React, Vite, TypeScript**
- **Tailwind CSS, Hero UI** for styling
- **React Query, Axios** for API calls
- **Form validation & error handling**

### **3️⃣ Code Inspection & Optimization**

Analyze a given messy React codebase and list computational inefficiencies & anti-patterns, including:

- **Unnecessary re-renders**
- **Inefficient API calls**
- **Improper state management**
- **Performance bottlenecks**

### **4️⃣ Three Ways to Sum to `n` (TypeScript)**

Reimplement the sum-to-`n` problem in **TypeScript**, ensuring:

- **Type safety**
- **Optimized performance**
- **Improved readability**

### **5️⃣ Currency Swap Express.js API**

A backend service for the currency swap app, built with:

- **Express.js** for RESTful API
- **Prisma ORM** for database interactions
- **SQLite** for data storage
- **API endpoints for currency conversion & history management**

## 🔧 Setup & Installation

### **Frontend (React App - Problem 2)**

```sh
cd src/problem2
pnpm install
pnpm dev
```

### **Backend (Express.js API - Problem 5)**

```sh
cd src/problem5
#Initialize prisma
pnpm prisma init
#Migration
pnpm prisma migrate dev --name init
#Generate prisma client
pnpm prisma generate
pnpm install
pnpm dev
```

## 🤝 Contributions

Feel free to fork this repository, improve the solutions, and submit a pull request.

## 📜 License

This project is licensed under **[Your License]**.
