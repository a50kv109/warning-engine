import { Predictor, Configuration, WarningResult, PredictorSchema } from "./contracts";

export interface SourceContext {
    predictors: Predictor[];
    config: Configuration;
}

// 1. SOURCE: Entry point
export const source = (predictors: Predictor[], config: Configuration): SourceContext => {
    return { predictors, config };
};

// 2. CONSTRAINT: Validation and boundaries
export const constraint = (ctx: SourceContext): SourceContext => {
    // Pure function: returns a new context with valid predictors only, validated by Zod
    const validPredictors = ctx.predictors.filter(p => {
        const parsed = PredictorSchema.safeParse(p);
        return parsed.success && parsed.data.value >= 0;
    });
    return { ...ctx, predictors: validPredictors };
};

// 3. FLOW: Active transformation pipeline
export interface FlowResult {
    score: number;
    anomalies: number;
}

export const flow = (ctx: SourceContext): FlowResult => {
    let score = 0;
    let anomalies = 0;

    for (const p of ctx.predictors) {
        const weight = ctx.config.weights?.[p.id] ?? 1.0;
        const weightedValue = p.value * weight;
        score += weightedValue;
        
        if (weightedValue > ctx.config.thresholds.critical * 0.5) {
            anomalies++;
        }
    }

    return { score, anomalies };
};

// 4. COMPARE: Logical evaluation
export const compare = (flowRes: FlowResult, config: Configuration): "OK" | "WARNING" | "CRITICAL" => {
    if (flowRes.score >= config.thresholds.critical) return "CRITICAL";
    if (flowRes.score >= config.thresholds.warning) return "WARNING";
    return "OK";
};

// 5. STATE: Terminal point
export const state = (
    level: "OK" | "WARNING" | "CRITICAL", 
    flowRes: FlowResult, 
    ctx: SourceContext, 
    startTime: number
): WarningResult => {
    return {
        level,
        score: flowRes.score,
        timestamp: Date.now(),
        diagnostics: {
            processingTimeMs: Date.now() - startTime,
            evaluatedPredictors: ctx.predictors.length,
            anomaliesDetected: flowRes.anomalies
        }
    };
};
