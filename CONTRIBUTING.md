# CONTRIBUTING

We welcome contributions from engineers across the E-OS ecosystem.

## Engineering Workflow

1. **Issue Tracking**: Ensure there is an approved Issue detailing the architectural impact before opening a Pull Request.
2. **Branch Naming**: Use the format `feature/sol-[component]` or `fix/sol-[component]`.
3. **Development Cycle**:
   ```bash
   npm run dev      # Run the test dashboard
   npm run build    # Verify compilation
   ```
4. **Pull Request Requirements**:
   - Must adhere strictly to the Pure Function / Stateless Processing constraints.
   - Any new SOL primitive modifications must be proven deterministic.
   - Run the linter to adhere to project standards.

## Code of Conduct

Maintain professional engineering discourse. Architectural debates should be resolved by referencing the [MANIFESTO](./MANIFESTO.md) and [ARCHITECTURE](./ARCHITECTURE.md) documents.
