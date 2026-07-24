# ARCHITECTURE

## Structural Overview

WARNING ENGINE implements the SOL (Source, Constraint, Flow, Compare, State) architectural primitive. It utilizes a pure functional pipeline to guarantee deterministic outputs.

### The Pipeline

```text
[Predictors, Configuration] 
       ↓
    SOURCE
       ↓
  CONSTRAINT (Filters Invalid)
       ↓
     FLOW (Calculates Weights/Score)
       ↓
    COMPARE (Evaluates Thresholds)
       ↓
    STATE (Terminal Result)
       ↓
 [WarningResult]
```

## Runtime Environment

The engine is implemented in **TypeScript** to natively align with JSON payloads common in E-OS ecosystems and LLM function calling. It is optimized for V8-based environments (Node.js, Edge Runtime, Browser).

## Architectural Preconditions

For WARNING ENGINE to function universally across domains, it relies on fundamental preconditions (such as **Semantic Normalization** and **Adapter Responsibility**). The core engine evaluates risk, but external adapters are required to convert domain-specific metrics into a universal risk semantic (e.g., converting "Fuel Remaining" to "Fuel Deficit"). 

Please read [Architectural Preconditions](Architectural_Preconditions.md) for the complete rules governing data ingestion and domain separation.

## Modules

### `src/engine/contracts.ts`
Defines the strict `Zod` schemas for runtime validation and static TypeScript interfaces. This file is the source of truth for the system's Domain Model.

### `src/engine/sol.ts`
Contains the pure function implementations for each SOL primitive:
- `source()`: Initializes the processing context.
- `constraint()`: Purges malformed or out-of-bounds data.
- `flow()`: Implements the mathematical summation and anomaly tracking.
- `compare()`: Maps the continuous mathematical score to discrete status levels.
- `state()`: Compiles the final report, generating timestamps and performance diagnostics.

### `src/engine/index.ts`
The barrel export and composition layer. It exposes `evaluateWarnings()`, which pipes the output of one SOL primitive into the input of the next.

## Design Decisions

- **Why TypeScript?** The E-OS infrastructure extensively uses JSON for inter-agent communication. TypeScript's structural typing combined with Zod offers the most seamless, overhead-free translation from wire JSON to strong runtime types.
- **Why Pure Functions?** By eliminating `this` context and class state, we guarantee that the engine is thread-safe, scalable without locks, and completely predictable for unit testing.
