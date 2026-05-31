// Verifies the OpenAI structured-output call used for DNA profiles. One cheap
// call. Run with: pnpm tsx scripts/verify-ai.ts
process.loadEnvFile(".env.local");

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { DnaProfileSchema } from "../lib/ai/schemas";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

async function main() {
  const completion = await openai.chat.completions.parse({
    model,
    temperature: 0.7,
    max_completion_tokens: 1200,
    response_format: zodResponseFormat(DnaProfileSchema, "dna_profile"),
    messages: [
      {
        role: "system",
        content:
          "You are a senior design director. Produce a unified, opinionated design profile from a blend of influences. Be concrete; avoid filler.",
      },
      {
        role: "user",
        content:
          'Blend "Editorial fintech" (weighted): Financial Times (70%) — serif headlines, salmon paper, dense grid; Apple (20%) — oversized type, whitespace; Linear (10%) — dark restraint, fast UI. Produce a unified profile honoring the weights.',
      },
    ],
  });

  const profile = completion.choices[0]?.message.parsed;
  if (!profile) throw new Error("no parsed profile");

  console.log("model:", model);
  console.log("title:", profile.title);
  console.log("summary:", profile.summary.slice(0, 160), "...");
  console.log("principles:", profile.principles.length);
  console.log("do/dont:", profile.doList.length, profile.dontList.length);
  console.log(
    "tokens in/out:",
    completion.usage?.prompt_tokens,
    completion.usage?.completion_tokens,
  );
  console.log("OK — OpenAI structured profile generation works");
}

main().catch((e) => {
  console.error("FAILED:", e?.message ?? e);
  process.exit(1);
});
