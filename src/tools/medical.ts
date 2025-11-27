type Sym = { symptoms: string[], age?: number, pregnant?: boolean };

const RED_FLAGS = [
  /chest pain/i, /shortness of breath/i, /stroke/i, /uncontrolled bleeding/i,
  /loss of consciousness/i, /severe allergic reaction/i, /neck stiffness with fever/i
];

export function ruleGate(input: Sym){
  const text = input.symptoms.join(", ");
  const flagged = RED_FLAGS.filter(rx=>rx.test(text)).map(rx=>rx.source);
  if (flagged.length) return { force: "emergency" as const, redFlags: flagged };
  return { force: null as null, redFlags: [] as string[] };
}