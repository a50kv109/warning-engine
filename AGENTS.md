# AGENTS

Instructions and context for AI agents interacting with this repository in the E-OS ecosystem.

## Context Definition

This repository implements **WARNING ENGINE v1.0**, a deterministic, stateless evaluation engine based on the SOL architectural pattern.

## Normative Hierarchy (Source of Truth)

When making decisions or solving problems, an AI Agent MUST prioritize documents in the following order:
1. **MANIFESTO.md**: Supreme philosophy. If a change violates statelessness or pure functions, it is rejected.
2. **ARCHITECTURE.md**: The structural design. The SOL pipeline order cannot be bypassed.
3. **src/engine/contracts.ts**: The runtime reality. Data contracts (Zod schemas) define the absolute boundary.
4. **Implementation Code**: The code itself is subordinate to the above documents. If code conflicts with the Architecture, the code is a bug.

## Hard Invariants (Forbidden Actions)

- **Do NOT** bypass Zod validation (`safeParse`) at the `CONSTRAINT` stage.
- **Do NOT** introduce class-based state, singletons, or global variables in `src/engine`.
- **Do NOT** add external side effects (I/O, database queries, API calls, filesystem reads) inside the SOL primitives.
- **Do NOT** mutate input arguments. Always return new objects in the functional pipeline.
- **Do NOT** introduce domain-specific logic or data normalization rules (e.g., handling "Inverse Logic Predictors" like free disk space) into the core engine. This is strictly the responsibility of external Adapters.

## Project Scope Boundary (Anti-Creep)

WARNING ENGINE is strictly an analytical core. When developing or maintaining this project:
- **Do NOT** transform it into a data storage system, a monitoring platform, or an end-user application.
- **Do NOT** add database connectors, external API integrations for fetching telemetry, or complex UI dashboards.
- The architectural responsibility is strictly bounded to computing the engineering state based on provided inputs. It is a library/engine to be consumed by other systems, not a standalone platform.

## Code Generation Rules

When modifying code in this repository:
1. **Never introduce Class-based state** into the `src/engine` directory. Rely exclusively on pure functional pipelines.
2. **Respect Data Contracts**: Any modification to data structures must first be updated in `src/engine/contracts.ts` (Zod schemas).
3. **No External Side Effects**: Engine primitives (SOURCE, CONSTRAINT, FLOW, COMPARE, STATE) must NEVER make network requests, read from the filesystem, or query databases. All data must be passed via arguments.

## Tooling Usage
- Run `npm run lint` and `npm run test` after any structural change to ensure SOL primitive contracts have not been broken.
- Prefer TypeScript interfaces inferred from Zod schemas `z.infer<typeof Schema>` rather than duplicating type definitions.
