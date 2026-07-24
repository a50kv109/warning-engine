# API REFERENCE

## Core Evaluation

### `evaluateWarnings(predictors: Predictor[], config: Configuration): WarningResult`

The primary entry point for the engine.

#### Parameters:
- `predictors` (`Predictor[]`): Array of sensor data or signals to evaluate.
- `config` (`Configuration`): The rules, weights, and thresholds to apply.

#### Returns:
- `WarningResult`: The definitive status object.

---

## Data Contracts (Zod Schemas)

### `Predictor`
```typescript
interface Predictor {
  id: string;         // Unique identifier for the signal source
  value: number;      // Continuous numerical value
  timestamp: number;  // Epoch MS
  metadata?: Record<string, any>;
}
```

### `Configuration`
```typescript
interface Configuration {
  thresholds: Thresholds;
  weights?: Record<string, number>; // Multiplier for specific predictor IDs
  rules?: string[];
}
```

### `Thresholds`
```typescript
interface Thresholds {
  warning: number;
  critical: number;
}
```

### `WarningResult`
```typescript
interface WarningResult {
  level: "OK" | "WARNING" | "CRITICAL";
  score: number;
  diagnostics: Diagnostics;
  timestamp: number;
}
```

### `Diagnostics`
```typescript
interface Diagnostics {
  processingTimeMs: number;
  evaluatedPredictors: number;
  anomaliesDetected: number;
}
```

---

## SOL Primitives API

Exposed for advanced composition or unit testing.

- `source(predictors, config) => SourceContext`
- `constraint(ctx) => SourceContext`
- `flow(ctx) => FlowResult`
- `compare(flowRes, config) => "OK" | "WARNING" | "CRITICAL"`
- `state(level, flowRes, ctx, startTime) => WarningResult`
