import { z } from "zod";

export const TravelAdvice = z.object({
  country: z.string(),
  best_time_to_visit: z.string().optional(),
  visa_notes: z.string().optional(),
  neighborhoods: z.array(z.string()).default([]),
  must_do: z.array(z.string()).default([]),
  scams_to_avoid: z.array(z.string()).default([]),
  packing_list: z.array(z.string()).default([]),
  sample_itinerary: z.array(z.string()).default([]),
  sources: z.array(z.string().url()).default([]),
  last_updated_utc: z.string()
});