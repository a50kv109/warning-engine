# GLOSSARY

Terminology used across the WARNING ENGINE project and E-OS infrastructure.

- **Data Contract**: A strictly typed and validated data structure (often backed by Zod and TypeScript) that guarantees the exact shape of payloads entering or leaving the engine.
- **Predictor**: A normalized data point or signal representing an external event or state (e.g., CPU load, sensor reading).
- **Pure Function**: A function where the return value is only determined by its input values, without observable side effects.
- **Stateless Processing**: A computing paradigm where the engine does not retain memory of previous events between execution cycles.
- **SOL Primitive**: An architectural building block used to structure functional pipelines. SOL consists of SOURCE, CONSTRAINT, FLOW, COMPARE, and STATE.
- **E-OS**: The overarching ecosystem or operating system abstraction that hosts LLM agents and engine infrastructure.
- **Zod**: A TypeScript-first schema declaration and validation library used for runtime data integrity.
