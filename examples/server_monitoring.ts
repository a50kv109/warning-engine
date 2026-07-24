import { evaluateWarnings, Predictor, Configuration } from '../src/engine';

/**
 * Example 1: Basic Server Monitoring
 * Demonstrates evaluating basic CPU and Memory metrics.
 */

const serverConfig: Configuration = {
    thresholds: {
        warning: 70,
        critical: 90
    },
    weights: {
        'cpu_load': 1.5,
        'memory_usage': 1.0
    }
};

const serverPredictors: Predictor[] = [
    { id: 'cpu_load', value: 45, timestamp: Date.now() },
    { id: 'memory_usage', value: 60, timestamp: Date.now() }
];

const result = evaluateWarnings(serverPredictors, serverConfig);

console.log('--- SERVER MONITORING EXAMPLE ---');
console.log('Score:', result.score);
console.log('Status:', result.level);
console.log('Diagnostics:', result.diagnostics);
