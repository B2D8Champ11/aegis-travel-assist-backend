import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function structured<T>(args: {
  system: string;
  user: string;
  schema: any;
  force_json?: boolean;
}) {
  const res = await client.responses.create({
    model: process.env.MODEL || "gpt-4.1",
    input: [
      { role: "system", content: args.system },
      { role: "user", content: args.user },
    ],
    temperature: 0.2,
    response_format: args.force_json ? { type: "json_object" } : undefined,
  });

  const text = (res.output_text || "").trim();
  const json = JSON.parse(text);
  return args.schema.parse(json);
}