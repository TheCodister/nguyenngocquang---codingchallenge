# Currency Swap App

A modern and user-friendly currency swap application built with React, Vite,
TypeScript, Tailwind CSS, and Hero UI. This project allows users to swap assets
between different currencies with real-time conversion rates.

## 🚀 Features

- Swap between supported cryptocurrencies
- Fetch real-time currency prices using React Query
- Interactive UI with **Hero UI** components
- Form validation and error handling
- Loading states for better user experience
- Responsive design

## 🛠️ Prerequisites

Make sure you have the following installed before running the project:

- **[Node.js](https://nodejs.org/)** (v16 or higher recommended)
- **[pnpm](https://pnpm.io/)** (preferred package manager)
- **[Vite](https://vitejs.dev/)** (Fast build tool for React)
- **[React](https://react.dev/)** (Latest version)
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)** (For styling)
- **[Hero UI](https://www.heroui.com/)** (For UI components)
- **[React Query](https://tanstack.com/query/latest)** (For fetching and caching
  currency data)
- **[Axios](https://axios-http.com/)** (For API calls)

## ❓ Why I Chose These Technologies

- **Node.js:** A powerful, asynchronous, event-driven JavaScript runtime. It is
  essential for running JavaScript-based applications, including both the
  frontend and backend of this project.
- **pnpm:** I prefer **pnpm** over **npm** or **Yarn** because it is faster and
  uses less memory when installing dependencies.
- **Vite:** Vite significantly improves the development experience by solving
  two major challenges in web development: **slow server startup** and **slow
  updates**. It provides instant HMR (Hot Module Replacement) and faster builds.
- **React:** A widely used modern frontend library that provides a
  component-based architecture, enabling efficient UI development. Its extensive
  ecosystem includes libraries that enhance UI design and improve application
  performance.
- **TypeScript:** Unlike JavaScript, TypeScript is **statically typed**,
  allowing for early error detection during **compile-time** rather than
  **runtime**. This makes debugging easier and enhances maintainability,
  especially in large projects.
- **Tailwind CSS:** Tailwind CSS streamlines styling by eliminating the need to
  create separate CSS files. It provides utility-first classes that make styling
  **faster** and **more efficient**. While class names may appear cluttered, the
  benefits of rapid development outweigh this downside.
- **Hero UI:** A UI component library that combines the flexibility of
  **Headless UI** with the design consistency of **Material UI**. It integrates
  seamlessly with Tailwind CSS, allowing for easy customization and a better
  user experience.
- **React Query:** A powerful tool for managing server state in React
  applications. It simplifies data fetching, caching, synchronization, and state
  management, significantly improving performance and developer productivity.
- **Axios:** An alternative to the built-in `fetch()` API that resolves
  **Promise Hell** by simplifying asynchronous requests. It provides better
  error handling, request cancellation, and easier integration with React Query.

## 📦 Installation

Clone the repository and install dependencies using `pnpm`:

```sh
# Clone the repository
git clone https://github.com/TheCodister/nguyenngocquang---codingchallenge.git
cd src/problem2

# Install dependencies
pnpm install
```

## 🏃‍♂️ Running the App

Start the development server:

```sh
pnpm dev
```

Then, open `http://localhost:5173/` in your browser.

### If you want to run the history storing and deleting feature, do the following:

```sh
cd ..
cd problem5
pnpm install
pnpm dev
```

The backend development server has start at http://localhost:3001/

## 🔧 Configuration

The application fetches currency prices from:

```
https://interview.switcheo.com/prices.json
```

## 🤝 Contribution

Feel free to fork this repository and contribute by submitting a pull request.
🚀

## 🔧 Changelog

- **Refactored API Calls**: Replaced `fetch` with `axios` in
  **useCreateConversion.ts**, **useDeleteConversion.ts**, and
  **useGetConversion.ts** for better readability and error handling.
- **Improved Maintainability**: Moved modal message content to
  **constants/modal-message** for easier future updates.
- **Optimized Performance**: Implemented `useMemo` and `useCallback` to reduce
  unnecessary re-renders.
- **Simplified Loading State**: Removed `isLoading` state—loading status is now
  managed directly by React Query.

## 📜 License

This project is licensed under the my License.
