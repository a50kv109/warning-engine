import { Predictor, Configuration, WarningResult } from "./contracts";
import { source, constraint, flow, compare, state } from "./sol";

/**
 * Main entry point for the WARNING ENGINE.
 * Implements a pure functional pipeline based on SOL primitives.
 */
export const evaluateWarnings = (predictors: Predictor[], config: Configuration): WarningResult => {
    // In a real environment, prefer performance.now() for accuracy
    const startTime = Date.now();
    
    // SOL Pipeline
    const srcCtx = source(predictors, config);
    const validCtx = constraint(srcCtx);
    const flowRes = flow(validCtx);
    const level = compare(flowRes, config);
    
    return state(level, flowRes, validCtx, startTime);
};

export * from "./contracts";
export * from "./sol";
