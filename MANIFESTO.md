# MANIFESTO

## Core Philosophy

**WARNING ENGINE** is built on the absolute necessity of deterministic rule evaluation. In mission-critical environments, logic cannot be opaque, mutable, or side-effect dependent. 

We assert that evaluating the state of an external system is a pure, functional translation of inputs (Predictors) into a deterministic output (WarningResult).

## Immutable Tenets

1. **Determinism Above All**
   Given the identical `Predictors` and `Configuration`, the engine must produce an identically equivalent `WarningResult` on every evaluation, regardless of time, platform, or environment.
   
2. **Stateless Processing**
   The engine retains no memory of previous evaluations. Time-series aggregation or memory is strictly the responsibility of external callers. The engine itself is purely transformational.

3. **Strict Data Contracts**
   All runtime boundaries are heavily guarded by Zod validation schemas. An invalid predictor must be rejected at the boundary. The engine operates under the absolute assurance that internal data structures are sound.

4. **SOL Architecture**
   - **SOURCE**: Entry point. Ingestion.
   - **CONSTRAINT**: Boundary validation. Rejection of invalidity.
   - **FLOW**: The active logic pipeline. Transformations and calculations.
   - **COMPARE**: The logical decision point based on threshold matrices.
   - **STATE**: The terminal representation of the evaluation result.

5. **Clarity of Mechanism**
   Code must prioritize explicit readability over clever conciseness. Debugging an evaluation failure should require looking at only pure functions, never unearthing hidden state.
