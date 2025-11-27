import { structured } from "../llm.js";
import { RiskReport } from "../schemas/risk.js";
import { getRiskIntel } from "../tools/riskFeeds.js";
import fs from "fs";

const sys = fs.readFileSync("src/prompts/system/risk.txt","utf8");

export async function riskAnalyst(input: { country:string }) {
  const intel = await getRiskIntel(input.country);
  const user = `
Country: ${input.country}
Use these sources as baseline: ${intel.sources.join(", ")}
Entry baseline: visa=${intel.entry.visa}
Return JSON matching RiskReport schema. Do not fabricate unknowns.
Set last_updated_utc to current UTC timestamp.
`.trim();

  return structured({ system: sys, user, schema: RiskReport, force_json: true });
}