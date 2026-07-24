# WARNING ENGINE

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Type](https://img.shields.io/badge/type-engineering%20library-orange.svg)

Deterministic engineering library for state evaluation and early warning.

WARNING ENGINE is a universal, domain-agnostic analytical core designed to transform raw telemetry into deterministic engineering decisions. It uses the stateless SOL (SOURCE, CONSTRAINT, FLOW, COMPARE, STATE) architectural pattern to evaluate weighted predictors and assert system health.

## Features

- **Domain-independent:** Embeddable in any technical system (infrastructure, robotics, IoT, automation).
- **Stateless architecture:** Zero side effects. Perfect for isolated, functional evaluation pipelines.
- **Adapter-driven normalization:** Accepts any normalized metric mapped to universal risk semantics.
- **Weighted predictor evaluation:** Combines multiple telemetry streams mathematically.
- **Deterministic thresholds:** Absolute boundary constraints to eliminate ambiguous states.
- **Interpretable warning results:** Generates transparent diagnostic objects: `OK`, `WARNING`, or `CRITICAL`.

## Architecture Overview

WARNING ENGINE enforces the strict SOL processing pipeline. It assumes all input data has been normalized by an upstream **Adapter**.

```text
[ External Telemetry ]
          ↓
[ Domain-Specific Adapter ] -> Normalizes data into standard Predictors
          ↓
[ Normalized Predictors ]
          ↓
[ WARNING ENGINE (SOL Pipeline) ]
          ↓
[ Warning Result (OK | WARNING | CRITICAL) ]
```

The SOL Pipeline guarantees that evaluation logic is mathematically pure, decoupled from external I/O, and rigorously validated via data contracts.

## Installation

```bash
npm install warning-engine
```

## Quick Example

```typescript
import { evaluateWarnings, Predictor, Configuration } from 'warning-engine';

// 1. Define strict evaluation thresholds and sensor weights
const config: Configuration = {
  thresholds: {
    warning: 50,
    critical: 85
  },
  weights: {
    'sensor-cpu': 1.5,
    'sensor-memory': 1.0,
    'sensor-network': 1.2
  }
};

// 2. Ingest normalized predictors from your Adapter
const predictors: Predictor[] = [
  { id: 'sensor-cpu', value: 45.2, timestamp: Date.now() },
  { id: 'sensor-memory', value: 60.1, timestamp: Date.now() },
  { id: 'sensor-network', value: 12.4, timestamp: Date.now() }
];

// 3. Execute the stateless SOL pipeline
const result = evaluateWarnings(predictors, config);

console.log(`System State: ${result.level}`);
console.log(`Aggregate Score: ${result.score}`);
```

## Project Structure

- `src/engine/` - Core SOL primitive implementations and Zod schemas.
- `src/components/` - React components for visual debugging and the test dashboard.
- `src/App.tsx` - Interactive demonstrator dashboard.

## Design Principles

This project is governed by strict engineering invariants:

1. **No External Side Effects:** Engine primitives (`SOURCE`, `CONSTRAINT`, `FLOW`, `COMPARE`, `STATE`) must NEVER make network requests, read from the filesystem, or query databases.
2. **Strict Data Contracts:** All structures must adhere to exact Zod schemas at runtime boundaries.
3. **Immutability:** Input arguments are never mutated; all outputs are distinct structures.
4. **No Domain Logic:** Inverse logic or custom metric mappings belong strictly in the upstream Adapter, not in the core engine.

For deep architectural documentation, refer to [ARCHITECTURE.md](./ARCHITECTURE.md) and [MANIFESTO.md](./MANIFESTO.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
