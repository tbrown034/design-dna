"use client";

import { useSaved } from "./saved-provider";

export function SaveButton({
  slug,
  size = "sm",
}: {
  slug: string;
  size?: "sm" | "lg";
}) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(slug);

  const base =
    size === "lg"
      ? "px-5 py-2.5 text-sm"
      : "px-3 py-1.5 text-xs";

  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={(e) => {
        // Cards may be wrapped in a link — don't navigate on save.
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={`rounded-full border font-medium transition-colors ${base} ${
        saved
          ? "border-ink bg-ink text-paper hover:bg-accent hover:border-accent"
          : "border-line-strong bg-paper-raised text-ink hover:border-ink"
      }`}
    >
      {saved ? "Saved" : "Save"}
    </button>
  );
}
