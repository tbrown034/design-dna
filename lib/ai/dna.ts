import "server-only";
import { zodResponseFormat } from "openai/helpers/zod";
import { patternLabel } from "@/lib/patterns";
import { AI_MODEL, openai } from "./client";
import { DnaProfileSchema, type DnaProfile } from "./schemas";

export type MixComponentInput = {
  name: string;
  kind: string;
  weight: number | null;
  focus: string | null;
  traits: string[];
  typography: string;
  tags: string[];
};

export type MixInput = {
  name: string;
  mode: "weighted" | "additive";
  components: MixComponentInput[];
};

const SYSTEM = `You are a senior design director. You translate a blend of design influences into a single, coherent, opinionated design profile that a developer can hand to an AI coding tool.

Be concrete and specific about typography, color, spacing, information density, motion, and component styling. Resolve tensions between the influences into one clear point of view — do not just list them. Avoid generic filler and buzzwords. Write for a skilled developer who will act on this.`;

function describeMix(mix: MixInput): string {
  const lines = mix.components.map((c) => {
    const w =
      mix.mode === "weighted" && c.weight != null ? ` (${c.weight}%)` : "";
    const focus = c.focus ? ` — borrow specifically its ${patternLabel(c.focus)}` : "";
    return `- ${c.name}${w}${focus}\n  traits: ${c.traits.slice(0, 5).join(", ")}\n  type: ${c.typography}`;
  });

  return `Blend name: ${mix.name}
Blend mode: ${mix.mode === "weighted" ? "weighted percentages" : "equal/additive"}

Influences:
${lines.join("\n")}

Produce a unified design profile from this blend. Honor the weights — higher-percentage influences should dominate the resulting direction.`;
}

export async function generateDnaProfile(mix: MixInput): Promise<{
  profile: DnaProfile;
  model: string;
  inputTokens: number;
  outputTokens: number;
}> {
  const completion = await openai.chat.completions.parse({
    model: AI_MODEL,
    temperature: 0.7,
    max_completion_tokens: 1200,
    response_format: zodResponseFormat(DnaProfileSchema, "dna_profile"),
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: describeMix(mix) },
    ],
  });

  const profile = completion.choices[0]?.message.parsed;
  if (!profile) {
    throw new Error("The model did not return a profile. Try again.");
  }

  return {
    profile,
    model: AI_MODEL,
    inputTokens: completion.usage?.prompt_tokens ?? 0,
    outputTokens: completion.usage?.completion_tokens ?? 0,
  };
}
