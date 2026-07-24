# DEVELOPMENT

This document outlines the local setup and development workflow for WARNING ENGINE.

## Environment

- Node.js >= 20
- npm >= 10

## Setup

```bash
git clone <repository>
cd warning-engine
npm install
```

## Available Scripts

- `npm run dev`: Starts the Vite development server with the React dashboard.
- `npm run build`: Compiles the TypeScript application into static assets.
- `npm run lint`: Runs ESLint over the codebase (ensure no stateful mutations are sneaking into the engine).
- `npm run preview`: Preview the production build locally.

## Testing Strategy

While the `vitest` infrastructure is pending full test-suite rollout, the primary method of validating the engine is through the React UI dashboard (`npm run dev`). 

The dashboard injects randomized `Predictor` arrays into the engine pipeline to verify that `evaluateWarnings()` operates correctly without runtime exceptions.

## Adding New Predictor Types

1. Add the specific required fields to `MetadataSchema` in `src/engine/contracts.ts` if needed.
2. Update the default weights in `src/App.tsx` (the test bench) to accommodate the new ID.
