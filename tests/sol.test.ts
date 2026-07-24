import { describe, it, expect } from 'vitest';
import { source, constraint, flow, compare, state } from '../src/engine/sol';
import { Predictor, Configuration } from '../src/engine/contracts';

describe('SOL Primitives', () => {
    const mockConfig: Configuration = {
        thresholds: { warning: 50, critical: 85 },
        weights: { 'p1': 1.0, 'p2': 2.0 }
    };

    it('SOURCE should correctly wrap predictors and config', () => {
        const predictors: Predictor[] = [{ id: 'p1', value: 10, timestamp: 0 }];
        const ctx = source(predictors, mockConfig);
        expect(ctx.predictors).toBe(predictors);
        expect(ctx.config).toBe(mockConfig);
    });

    it('CONSTRAINT should filter out invalid predictors', () => {
        const predictors: Predictor[] = [
            { id: 'p1', value: 10, timestamp: 0 },
            { id: 'p2', value: NaN, timestamp: 0 } // invalid
        ];
        const ctx = source(predictors, mockConfig);
        const validCtx = constraint(ctx);
        expect(validCtx.predictors.length).toBe(1);
        expect(validCtx.predictors[0].id).toBe('p1');
    });

    it('FLOW should calculate correct score using weights', () => {
        const predictors: Predictor[] = [
            { id: 'p1', value: 10, timestamp: 0 },
            { id: 'p2', value: 20, timestamp: 0 }
        ];
        const ctx = source(predictors, mockConfig);
        const result = flow(ctx);
        // p1: 10 * 1.0 = 10
        // p2: 20 * 2.0 = 40
        // Total = 50
        expect(result.score).toBe(50);
    });
});
