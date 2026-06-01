"use client";

import { useState, useTransition } from "react";
import { setPatternTags } from "@/lib/actions/patterns";
import { PATTERN_ELEMENTS } from "@/lib/patterns";

export function PatternTagger({
  slug,
  initial,
}: {
  slug: string;
  initial: string[];
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set(initial));
  const [pending, startTransition] = useTransition();

  const count = selected.size;

  function toggle(value: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function save() {
    startTransition(async () => {
      await setPatternTags(slug, [...selected]);
      setOpen(false);
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="text-xs text-muted underline underline-offset-4 transition-colors hover:text-ink"
      >
        {count > 0 ? `Liked: ${count} element${count > 1 ? "s" : ""}` : "Tag what you like"}
      </button>
    );
  }

  return (
    <div
      className="mt-3 rounded-xl border border-line p-3"
      onClick={(e) => e.preventDefault()}
    >
      <p className="eyebrow">What do you like here?</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {PATTERN_ELEMENTS.map((p) => {
          const on = selected.has(p.value);
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => toggle(p.value)}
              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                on
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="rounded-full bg-ink px-3 py-1.5 text-xs text-paper transition-colors hover:bg-accent disabled:opacity-60"
        >
          {pending ? "Saving" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-muted hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
