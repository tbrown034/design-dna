// The design elements a user can focus on when borrowing from an influence
// (used by Mix & Match focus and by Pattern Extraction in a later phase).
export const PATTERN_ELEMENTS = [
  { value: "header", label: "Header" },
  { value: "nav", label: "Navigation" },
  { value: "typography", label: "Typography" },
  { value: "buttons", label: "Buttons" },
  { value: "cards", label: "Cards" },
  { value: "tables", label: "Tables" },
  { value: "search", label: "Search" },
  { value: "forms", label: "Forms" },
  { value: "layout", label: "Layout" },
  { value: "color_palette", label: "Color palette" },
  { value: "information_density", label: "Information density" },
] as const;

export type PatternElement = (typeof PATTERN_ELEMENTS)[number]["value"];

// A liked element with an optional free-text note ("what exactly I liked").
export type PatternTag = { element: string; note: string | null };

export function patternLabel(value: string): string {
  return PATTERN_ELEMENTS.find((p) => p.value === value)?.label ?? value;
}

// A display phrase for a tag: "Typography — love the mono labels", or just
// "Typography" when there's no note. Used in AI prompts and summaries.
export function tagPhrase(tag: PatternTag): string {
  const label = patternLabel(tag.element);
  return tag.note ? `${label} — ${tag.note}` : label;
}
