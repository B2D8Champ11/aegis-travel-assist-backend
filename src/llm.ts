import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function structured<T>(args: {
  system: string;
  user: string;
  schema: any;   // zod schema
  force_json?: boolean;
}) {
  const completion = await client.chat.completions.create({
    model: process.env.MODEL || "gpt-4.1",
    messages: [
      { role: "system", content: args.system },
      { role: "user", content: args.user },
    ],
    temperature: 0.2,
    // Only ask for JSON when we explicitly want it
    ...(args.force_json
      ? { response_format: { type: "json_object" } as any }
      : {}),
  });

  const text = completion.choices[0]?.message?.content ?? "";
  const json = JSON.parse(text);
  return args.schema.parse(json);
}
