import { structured } from "../llm.js";
import { TravelAdvice } from "../schemas/travel.js";
import fs from "fs";

const sys = fs.readFileSync("src/prompts/system/travel.txt","utf8");

export async function travelAdvisor(input: { country:string; month?:string; preferences?:string[] }) {
  const user = `
Country: ${input.country}
Month: ${input.month||"unspecified"}
Traveler preferences: ${(input.preferences||[]).join(", ")||"unspecified"}
Return JSON matching TravelAdvice schema.
Set last_updated_utc to current UTC timestamp.
`.trim();

  return structured({ system: sys, user, schema: TravelAdvice, force_json: true });
}