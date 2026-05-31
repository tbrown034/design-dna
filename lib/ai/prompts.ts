import type { DnaProfile } from "./schemas";

export const PROMPT_TOOLS = [
  { value: "claude", label: "Claude" },
  { value: "chatgpt", label: "ChatGPT" },
  { value: "cursor", label: "Cursor" },
  { value: "v0", label: "v0" },
  { value: "generic", label: "Generic" },
] as const;

export type PromptTool = (typeof PROMPT_TOOLS)[number]["value"];

const INTROS: Record<PromptTool, string> = {
  claude:
    "Use the following design direction when building this interface. Treat it as the authoritative source of taste; favor it over your defaults.",
  chatgpt:
    "Follow this design direction when generating UI. Apply it consistently across every screen and component.",
  cursor:
    "Apply this design direction to all components you generate or edit in this project. Match its typography, spacing, and styling exactly.",
  v0:
    "Generate the UI using this design direction. Prefer these choices for type, color, spacing, and component styling over generic defaults.",
  generic:
    "Use this design direction as the visual and interaction specification for the interface.",
};

// Deterministic — no extra model call. Formats the structured profile into a
// ready-to-paste, design-focused prompt for a given AI tool.
export function buildToolPrompt(
  profile: DnaProfile,
  tool: PromptTool,
  mixName: string,
): string {
  const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

  return `${INTROS[tool]}

# Design direction: ${profile.title}
(derived from the "${mixName}" influence mix)

## Overview
${profile.summary}

## Visual style
${profile.visualStyle}

## Hierarchy
${profile.hierarchy}

## Interaction
${profile.interactionPhilosophy}

## Tone of voice
${profile.tone}

## Principles
${list(profile.principles)}

## Do
${list(profile.doList)}

## Don't
${list(profile.dontList)}

Focus on design quality — typography, spacing, color, hierarchy, and restraint. Do not explain the design back to me; just build to it.`;
}
