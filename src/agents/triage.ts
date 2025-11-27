import { structured } from "../llm.js";
import { Triage } from "../schemas/triage.js";
import { ruleGate } from "../tools/medical.js";
import { findNearestFacilities } from "../tools/places.js";
import fs from "fs";

const sys =
  fs.readFileSync("src/prompts/system/triage.txt","utf8") + "\n" +
  fs.readFileSync("src/prompts/guardrails/medical.txt","utf8");

export async function triageAgent(input: {
  symptoms: string[];
  age?: number;
  pregnant?: boolean;
  lat?: number; lon?: number;
  locale_emergency_number?: string;
}) {
  const gated = ruleGate({ symptoms: input.symptoms, age: input.age, pregnant: input.pregnant });

  const facilities = (input.lat!=null && input.lon!=null)
    ? await findNearestFacilities(input.lat, input.lon, "hospital")
    : [];

  const user = `
Patient context:
- Age: ${input.age ?? "unknown"}
- Pregnant: ${input.pregnant ? "yes" : "no/unknown"}
- Symptoms: ${input.symptoms.join(", ")}
Forced urgency: ${gated.force ?? "none"} (if emergency, obey)
Local emergency number: ${input.locale_emergency_number || "112"}
Nearest facilities: ${facilities.map(f=>`${f.name} ~${f.distance_km}km`).join("; ") || "unknown"}
Return JSON matching Triage schema.
`.trim();

  const triage = await structured({ system: sys, user, schema: Triage, force_json: true });

  if (gated.force === "emergency") triage.urgency = "emergency";
  if ((!triage.nearest_facilities || triage.nearest_facilities.length===0) && facilities.length) {
    triage.nearest_facilities = facilities as any;
  }
  triage.disclaimer ||= "Information only, not a diagnosis. Seek licensed care or emergency services if unsure.";

  return triage;
}