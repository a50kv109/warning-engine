# Architectural Preconditions

Like a mathematical theorem, the WARNING ENGINE architecture operates correctly only when specific initial conditions are met. These are not limitations of the implementation, but rather fundamental engineering preconditions that guarantee the deterministic and universal nature of the system.

## 1. Semantic Normalization

WARNING ENGINE does not interpret the underlying domain. It assumes that all incoming indicators have already been reduced to a unified engineering semantics of **risk**. The engine operates under the premise that all incoming numbers mean the same thing conceptually.

## 2. Adapter Responsibility

Data normalization is strictly the responsibility of an **Adapter** (the external calling system), never the core engine. The adapter must convert raw, domain-specific data into unified engineering predictors.

Examples of Adapter transformations:
- `Fuel Remaining` ➔ `Fuel Deficit`
- `Free Memory` ➔ `Memory Pressure`
- `Battery Charge` ➔ `Battery Degradation`
- `Free Disk Space` ➔ `Disk Saturation`

After transformation, the adapter must ensure that the universal rule is upheld:
> **The higher the predictor's value, the higher the engineering risk.**

## 3. Domain Independence

The core engine is entirely blind to the physical or virtual origin of the data. It does not know if it is evaluating:
- An automobile
- A Linux server
- An IoT greenhouse
- A medical device
- A production line
- An AI runtime

The engine works exclusively with abstract engineering predictors. Domain-specific logic must never leak into the core.

## 4. Deterministic Evaluation

WARNING ENGINE assumes a strictly deterministic universe:
- Identical input predictors
- Identical weights
- Identical thresholds

Under these conditions, the output result must always, mathematically and logically, be identical. No hidden state or external context may influence the evaluation.

## 5. Separation of Responsibilities

Responsibilities are sharply divided:

**Adapter (External):**
- Ingests raw telemetry.
- Interprets the specific domain rules.
- Normalizes values to risk metrics.

**WARNING ENGINE (Internal):**
- Evaluates the normalized metrics.
- Aggregates the mathematical score.
- Computes the final engineering state.
- Remains completely oblivious to data origin.

## 6. Universal Risk Semantics

All input values flowing into the engine must use a single, unified semantic direction. It is strictly forbidden to mix contradictory semantics in the same pipeline (e.g., mixing "higher is better" with "higher is worse"). Any ambiguity must be resolved by the Adapter before the data is passed to the engine.
