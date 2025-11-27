export type Intent = "travel"|"risk"|"triage";

export function classifyIntent(text: string): Intent {
  const t = text.toLowerCase();
  if (/(fever|pain|vomit|symptom|rash|injury|triage|should i see)/.test(t)) return "triage";
  if (/(risk|safety|protest|crime|advisory|terror|unrest)/.test(t)) return "risk";
  return "travel";
}