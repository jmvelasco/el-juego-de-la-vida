# El Juego de la Vida - React & TypeScript

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg)](https://react.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-9.39-4B32C3.svg)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.7-F7B93E.svg)](https://prettier.io/)
[![Jest](https://img.shields.io/badge/Jest-30.2-C21325.svg)](https://jestjs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, production-ready React application with TypeScript, integrated linting, formatting, and testing.

## ✨ Features

- **React 19** - Utilizing the latest React features and concurrent rendering
- **TypeScript 5.9** - Strict mode enabled for maximum type safety
- **ESLint 9** - Flat config system with TypeScript & React support
- **Prettier 3.7** - Opinionated code formatter
- **Jest 30** - Delightful JavaScript Testing Framework
- **Husky 9** & **lint-staged** - Git hooks for code quality
- **esbuild** - Lightning fast bundling for the UI
- **Pico.css** - Minimalist, semantic CSS framework for a clean UI
- **React Context API** - Centralized state management for world configuration

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.12
- npm >= 10.5

### Installation

```bash
git clone https://github.com/YOUR-USERNAME/el-juego-de-la-vida.git
cd el-juego-de-la-vida
npm install
```

### Running the Application

```bash
npm run dev:ui    # Builds and serves the UI at http://localhost:3000
```

## 🎓 Educational Guide: Adding React to TypeScript

This project evolved from a pure TypeScript template to a React application. Here is the step-by-step guide of the additions made:

### 1. Basic Dependencies

First, we added the core React libraries:

```bash
npm install react react-dom
```

### 2. TypeScript Configuration for React

To enable JSX and browser support, `tsconfig.json` was updated:

- **`jsx`: "react-jsx"**: Enables the modern JSX transform (no need to import React in every file).
- **`lib`: ["ES2020", "DOM"]**: Added `"DOM"` so TypeScript recognizes global variables like `document` and `window`.

### 3. Type Definitions

React is written in JavaScript, so we need type definitions for TypeScript to understand it:

```bash
npm install --save-dev @types/react @types/react-dom
```

### 4. Entry Point & Component

We created `src/index.tsx` as the entry point:

- Used `createRoot` from `react-dom/client` for React 18+ rendering.
- Defined components using `JSX.Element` return types.

### 5. Build Pipeline (esbuild)

Since browsers cannot run `.tsx` files directly, we added `esbuild` for fast bundling:

```bash
# package.json script
"build:ui": "esbuild src/index.tsx --bundle --outfile=dist/bundle.js"
```

### 6. Live Reload (Refresco Automático)

To improve development speed, we added the ability to see changes in the browser automatically:

- **Dependencies**: Added `live-server` for the reloading server and `npm-run-all` to run multiple tasks.
- **`build:ui:watch`**: Added `--watch` to the `esbuild` command so it rebuilds on every save.
- **`serve`**: Configured `live-server` to serve the project and watch for file changes to refresh the browser.
- **`dev:ui`**: Uses `npm-run-all --parallel` to run both the watcher and the server at the same time.

```bash
npm run dev:ui    # Start developing with Live Reload!
```

### 7. UI Testing (Análisis de QA)

Como expertos en QA, detectamos la necesidad de validar que la capa de UI (React) se integra correctamente con el motor:

- **`jsdom`**: Cambiamos el `testEnvironment` en `jest.config.js` de `node` a `jsdom` para simular un navegador en los tests.
- **React Testing Library**: Instalamos esta librería para testear componentes desde la perspectiva del usuario (qué se ve en el DOM).
- **Match Tokens**: Actualizamos la configuración de Jest para reconocer archivos `.tsx` y reportar cobertura sobre ellos.

```bash
npm test    # Ejecuta todos los tests, incluyendo el nuevo App.test.tsx
```

### 8. Estado Global con Context API

Para evitar el "prop drilling" y centralizar la lógica de configuración del mundo (filas, columnas, velocidad), implementamos un Contexto:

- **`LifeWorldProvider`**: Envuelve la aplicación y gestiona el estado compartido.
- **`useLifeWorldContext`**: Hook personalizado para acceder de forma sencilla a los parámetros y funciones del juego.

### 9. Estilado con Pico.css

En lugar de pesadas librerías de componentes o configuraciones complejas de CSS Modules, optamos por **Pico.css**:

- **Semantic HTML**: Pico da estilo automáticamente a los elementos HTML nativos basándose en su semántica.
- **Inline Styles**: Para layouts muy específicos y dinámicos (como el tamaño de las celdas del tablero), utilizamos estilos en línea en React, manteniendo el proyecto ligero.

## 📋 Available Scripts

### Development

- `npm run dev`: watch mode for TypeScript (lib output)
- `npm run compile`: type-check without emitting
- `npm run dev:ui`: build and serve the application locally

### Quality Assurance

- `npm run lint`: run ESLint
- `npm run format:check`: verify code formatting
- `npm test`: run tests with Jest
- `npm run validate`: full check (compile + lint + test)

Este proyecto fue iniciado a partir de la [plantilla de TypeScript de Software Crafters](https://github.com/softwarecrafters-io/ts-eslint-prettier-jest).

## 📄 License

MIT © El Artesano del Byte
