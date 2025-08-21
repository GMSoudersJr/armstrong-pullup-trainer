# Armstrong Pullup Trainer

## Project Overview

This is a SvelteKit-based cross-platform application for the Armstrong Pullup Program. It is designed to be a progressive web app (PWA) and a native mobile app using Capacitor. The application uses IndexedDB to store user workout data and is built with Svelte and TypeScript.

## Building and Running

### Development

To run the application in development mode, use the following command:

```bash
npm run dev
```

### Building

To build the application for production, use the following command:

```bash
npm run build
```

### Testing

To run the unit tests, use the following command:

```bash
npm run test:unit
```

To run the end-to-end tests, use the following command:

```bash
npm run test:e2e
```

To run all tests, use the following command:

```bash
npm run test
```

## Development Conventions

### Code Style

The project uses Prettier for code formatting and ESLint for linting. To format the code, run:

```bash
npm run format
```

To check for linting errors, run:

```bash
npm run lint
```

### Testing

The project uses Vitest for unit tests and Playwright for end-to-end tests. Test files are located alongside the source files with the `.test.ts` or `.spec.ts` extension.

### Git Hooks

The project uses Husky for Git hooks. A pre-commit hook is configured to run `lint-staged`, which formats the code before committing.
