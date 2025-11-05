# Angular Shopping Cart
[![angular-shopping-cart CI](https://github.com/delitamakanda/angular-shopping-cart/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/delitamakanda/angular-shopping-cart/actions/workflows/node.js.yml)

An Angular 20 demo application that showcases a complete shopping experience with product discovery, cart management, and a lightweight admin area. The project demonstrates how to structure a modern Angular workspace with standalone components, Angular Material, and reusable domain services backed by a hosted REST API.

## Table of contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Features
- **Product catalogue** with category filtering, detailed product pages, customer reviews, and rating widgets.
- **Shopping cart workflow** including quantity updates, confirmation prompts, and persistent state handled by dedicated cart services.
- **Authentication pages** (sign-up, login, password flows) that integrate with the remote API and guard protected routes.
- **Admin dashboard** placeholders for managing products and site content using Angular Material components.
- **Responsive layout** optimised for desktop and mobile thanks to Angular Material and modern CSS tooling.
- **Progressive Web App (PWA) ready** configuration through `@angular/service-worker` and `ngsw-config`.

## Tech stack
- [Angular](https://angular.dev/) 20 with standalone components and the Angular Router.
- [Angular Material](https://material.angular.io/) component library for UI.
- [RxJS](https://rxjs.dev/) for reactive data flow and asynchronous orchestration.
- Service worker integration for offline capabilities and caching.

## Getting started
1. **Prerequisites**
   - Node.js 20.19.x and npm 10.8.x (matching the versions defined in `package.json`).
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm start
   ```
   Visit `http://localhost:4200/`. The application reloads automatically when you edit source files.
4. **Run unit tests**
   ```bash
   npm test
   ```
5. **Build for production**
   ```bash
   npm run build
   ```
   Compiled assets are emitted to the `dist/` directory.

## Available scripts
| Command | Description |
| --- | --- |
| `npm start` | Start the development server with live reload. |
| `npm run build` | Create an optimized production build. |
| `npm run watch` | Rebuild on file changes using the development configuration. |
| `npm test` | Execute unit tests with Karma and Jasmine. |
| `npm run extract-i18n` | Generate translation source files using Angular i18n tooling. |
| `npm run localize` | Produce builds for each configured locale. |

## Project structure
```
src/
├── app/                # Core application modules, pages, and shared components
│   ├── core/           # Services, feature modules, and domain interfaces
│   ├── pages/          # Route-driven feature areas (home, product, admin, auth, ...)
│   └── shared/         # Reusable UI components, directives, and pipes
├── assets/             # Static assets such as images and icons
├── environments/       # Environment-specific configuration
└── styles/             # Global SCSS styles and theming
```

## Configuration
- API endpoints are defined in `src/environments/environment*.ts`. Update `apiUrl` to point at your own backend service.
- Service worker behaviour can be tweaked in `ngsw-config.json` before running a production build.

## Troubleshooting
- **Angular CLI command not found**: ensure you run scripts with `npm run ...` so the local CLI binary is used.
- **Node or npm version mismatch**: use a version manager (e.g. `nvm`) to match the `engines` field in `package.json`.
- **CORS or API errors**: verify that the configured `apiUrl` is reachable and supports the required endpoints.

---

Looking for the original CLI-generated instructions? Check [`docs.md`](docs.md) for the previous README contents.
