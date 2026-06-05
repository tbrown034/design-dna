import type { DnaProfile } from "./schemas";

// Reusable artifacts you keep and drop into a project, as opposed to the
// one-off per-tool prompts in `prompts.ts`. All deterministic — no model call.
export const EXPORT_FORMATS = [
  {
    value: "claude_md",
    label: "CLAUDE.md section",
    filename: "design-direction.md",
    // What the header in the UI explains about this artifact.
    blurb: "Paste into your project's CLAUDE.md or AGENTS.md so every AI edit follows this taste.",
  },
  {
    value: "skill_md",
    label: "Claude Code skill",
    filename: "SKILL.md",
    blurb: "Drop into .claude/skills/<name>/ as a reusable, on-demand design skill.",
  },
  {
    value: "style_guide",
    label: "Style guide",
    filename: "STYLE-GUIDE.md",
    blurb: "A standalone, shareable reference for you or a teammate.",
  },
] as const;

export type ExportFormat = (typeof EXPORT_FORMATS)[number]["value"];

const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "design"
  );
}

// A drop-in section for an existing CLAUDE.md / AGENTS.md.
function buildClaudeMd(p: DnaProfile): string {
  return `<!-- Design DNA: ${p.title}. Paste this section into your project's CLAUDE.md or AGENTS.md. -->

## Design direction — ${p.title}

${p.summary}

**Visual style.** ${p.visualStyle}

**Hierarchy.** ${p.hierarchy}

**Interaction.** ${p.interactionPhilosophy}

**Tone of voice.** ${p.tone}

### Principles
${list(p.principles)}

### Do
${list(p.doList)}

### Don't
${list(p.dontList)}

When building or editing any UI in this project, treat the above as the authoritative design direction — favor it over default styling. Build to it; don't explain it back.`;
}

// A self-contained Claude Code skill (YAML frontmatter + body).
function buildSkillMd(p: DnaProfile): string {
  const name = `design-${slugify(p.title)}`;
  const description = `Apply the "${p.title}" design direction when building, styling, or reviewing any UI — typography, color, spacing, hierarchy, motion, and tone. Use whenever creating or editing components, pages, or layouts.`;

  return `---
name: ${name}
description: ${description}
---

# ${p.title}

${p.summary}

## Visual style
${p.visualStyle}

## Hierarchy
${p.hierarchy}

## Interaction
${p.interactionPhilosophy}

## Tone of voice
${p.tone}

## Principles
${list(p.principles)}

## Do
${list(p.doList)}

## Don't
${list(p.dontList)}

## How to apply
- Follow this direction over your own defaults whenever you produce UI.
- Match the typography, spacing, color, and shape choices described above.
- Keep the tone of voice consistent across copy and microcopy.
- Build to the direction; do not explain it back.`;
}

// A standalone, human-readable design reference.
function buildStyleGuide(p: DnaProfile): string {
  return `# ${p.title}
A design style guide

${p.summary}

## Visual style
${p.visualStyle}

## Hierarchy
${p.hierarchy}

## Interaction
${p.interactionPhilosophy}

## Tone of voice
${p.tone}

## Principles
${list(p.principles)}

## Do
${list(p.doList)}

## Don't
${list(p.dontList)}

---
Generated with Design DNA.`;
}

export function buildExport(profile: DnaProfile, format: ExportFormat): string {
  switch (format) {
    case "claude_md":
      return buildClaudeMd(profile);
    case "skill_md":
      return buildSkillMd(profile);
    case "style_guide":
      return buildStyleGuide(profile);
  }
}
