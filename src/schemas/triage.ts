import { z } from "zod";

export const Facility = z.object({
  name: z.string(),
  type: z.enum(["hospital","clinic","pharmacy"]),
  distance_km: z.number(),
  map_url: z.string().url().optional(),
  phone: z.string().optional()
});

export const Triage = z.object({
  urgency: z.enum(["self_care","pharmacist","non_urgent_clinic","urgent_care","emergency"]),
  rationale: z.string(),
  red_flags: z.array(z.string()).default([]),
  self_care_steps: z.array(z.string()).default([]),
  when_to_seek_help: z.array(z.string()).default([]),
  nearest_facilities: z.array(Facility).default([]),
  disclaimer: z.string()
});