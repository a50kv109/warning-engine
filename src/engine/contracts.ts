import { z } from "zod";

export const MetadataSchema = z.record(z.string(), z.any());

export const PredictorSchema = z.object({
  id: z.string(),
  value: z.number(),
  timestamp: z.number(),
  metadata: MetadataSchema.optional()
});

export const ThresholdsSchema = z.object({
  warning: z.number(),
  critical: z.number()
});

export const WeightsSchema = z.record(z.string(), z.number());

export const ConfigurationSchema = z.object({
  thresholds: ThresholdsSchema,
  weights: WeightsSchema.optional(),
  rules: z.array(z.string()).optional()
});

export const DiagnosticsSchema = z.object({
  processingTimeMs: z.number(),
  evaluatedPredictors: z.number(),
  anomaliesDetected: z.number()
});

export const WarningResultSchema = z.object({
  level: z.enum(["OK", "WARNING", "CRITICAL"]),
  score: z.number(),
  diagnostics: DiagnosticsSchema,
  timestamp: z.number()
});

export type Predictor = z.infer<typeof PredictorSchema>;
export type Configuration = z.infer<typeof ConfigurationSchema>;
export type WarningResult = z.infer<typeof WarningResultSchema>;
export type Diagnostics = z.infer<typeof DiagnosticsSchema>;
export type Thresholds = z.infer<typeof ThresholdsSchema>;
export type Weights = z.infer<typeof WeightsSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
