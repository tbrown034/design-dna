import "server-only";
import { zodResponseFormat } from "openai/helpers/zod";
import { AI_MODEL, openai } from "./client";
import { TasteProfileSchema, type TasteProfileData } from "./taste-schema";

export type TasteEvidence = {
  saved: { name: string; kind: string; tags: string[] }[];
  likedElements: { name: string; elements: string[] }[];
  mixes: { name: string; influences: string[] }[];
};

const SYSTEM = `You are a perceptive design critic. Given the design influences a person saves, the specific elements they like, and the mixes they build, infer their underlying design taste. Be specific and observational — point to real patterns in their choices. Avoid flattery and generic statements. If the evidence is thin, say so honestly within the summary.`;

function describe(e: TasteEvidence): string {
  const saved = e.saved
    .map((s) => `${s.name} (${s.kind}; ${s.tags.slice(0, 4).join(", ")})`)
    .join("; ");
  const liked = e.likedElements
    .map((l) => `${l.name}: ${l.elements.join(", ")}`)
    .join("; ");
  const mixes = e.mixes
    .map((m) => `${m.name} = ${m.influences.join(" + ")}`)
    .join("; ");

  return `Saved influences: ${saved || "none yet"}
Specific elements they liked: ${liked || "none tagged yet"}
Mixes they built: ${mixes || "none yet"}

Infer this person's design taste from the above.`;
}

export async function generateTasteProfile(evidence: TasteEvidence): Promise<{
  profile: TasteProfileData;
  model: string;
  inputTokens: number;
  outputTokens: number;
}> {
  const completion = await openai.chat.completions.parse({
    model: AI_MODEL,
    temperature: 0.7,
    max_completion_tokens: 900,
    response_format: zodResponseFormat(TasteProfileSchema, "taste_profile"),
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: describe(evidence) },
    ],
  });

  const profile = completion.choices[0]?.message.parsed;
  if (!profile) throw new Error("The model did not return a taste profile.");

  return {
    profile,
    model: AI_MODEL,
    inputTokens: completion.usage?.prompt_tokens ?? 0,
    outputTokens: completion.usage?.completion_tokens ?? 0,
  };
}
