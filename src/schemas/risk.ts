import { z } from "zod";

export const Threat = z.object({
  type: z.enum(["crime","civil_unrest","terrorism","natural_disaster","health","cyber"]),
  level: z.enum(["low","moderate","high","extreme"]),
  summary: z.string(),
  sources: z.array(z.string().url()).default([])
});

export const RiskReport = z.object({
  country: z.string(),
  overall_risk: z.enum(["low","moderate","high","extreme"]),
  threats: z.array(Threat),
  entry_requirements: z.object({
    visa: z.string().optional(),
    vaccines: z.array(z.string()).default([])
  }),
  advice: z.array(z.string()).default([]),
  last_updated_utc: z.string()
});