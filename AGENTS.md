# Guidelines for Codex Contributors

This repository contains small React + TypeScript examples built with Vite. Each component showcases a different approach (fetch, axios, Apollo) and has its own unit tests.

## Project structure
- `src/components/*` – individual examples. Each directory contains an `index.tsx` for the component and an `index.test.tsx` for unit tests.
- `src/App.tsx` – sets up routes for the examples using `react-router`.
- `src/main.tsx` – application entry point.
- `vite.config.ts` – configures Vite and Vitest (jsdom environment, coverage via v8, `src/setupTests.ts` is loaded).

## Development
- Use functional components with TypeScript.
- Keep tests next to the components they test.
- Run `npm test` (or `npx vitest run`) to run the test suite.
- Run `npm run lint` to execute ESLint.

