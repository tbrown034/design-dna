"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { createMix } from "@/lib/actions/mixes";

export type BuilderEntry = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  palette: { hex: string }[];
};

export function MixBuilder({ entries }: { entries: BuilderEntry[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"weighted" | "additive">("weighted");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function toggle(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function create() {
    setError(null);
    if (selected.size === 0) {
      setError("Pick at least one influence.");
      return;
    }
    startTransition(async () => {
      try {
        await createMix({ name, mode, slugs: [...selected] });
      } catch (e) {
        // redirect() throws a control-flow signal — let it through.
        if (e && typeof e === "object" && "digest" in e) throw e;
        setError(e instanceof Error ? e.message : "Could not create mix.");
      }
    });
  }

  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => {
          const isSel = selected.has(entry.slug);
          return (
            <button
              key={entry.slug}
              type="button"
              onClick={() => toggle(entry.slug)}
              aria-pressed={isSel}
              className={`rounded-2xl border p-5 text-left transition-colors ${
                isSel
                  ? "border-ink bg-paper-raised ring-1 ring-ink"
                  : "border-line bg-paper-raised hover:border-ink"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5" aria-hidden>
                  {entry.palette.map((s) => (
                    <span
                      key={s.hex}
                      style={{ background: s.hex }}
                      className="h-5 w-5 rounded-full border border-line"
                    />
                  ))}
                </div>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs ${
                    isSel
                      ? "border-ink bg-ink text-paper"
                      : "border-line-strong text-transparent"
                  }`}
                >
                  ✓
                </span>
              </div>
              <p className="eyebrow mt-3">{entry.kind}</p>
              <h3 className="mt-1 font-serif text-lg tracking-tight">
                {entry.name}
              </h3>
              <p className="mt-1 text-xs text-muted">{entry.tagline}</p>
            </button>
          );
        })}
      </div>

      <div className="sticky bottom-4 mt-8 rounded-2xl border border-line bg-paper-raised p-5 shadow-sm">
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex-1">
            <span className="eyebrow">Mix name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Editorial fintech"
              className="mt-1.5 w-full rounded-lg border border-line-strong bg-paper px-3 py-2.5 outline-none focus:border-ink"
            />
          </label>

          <div>
            <span className="eyebrow">Mode</span>
            <div className="mt-1.5 flex rounded-lg border border-line-strong p-0.5">
              {(["weighted", "additive"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-md px-3 py-2 text-sm capitalize transition-colors ${
                    mode === m ? "bg-ink text-paper" : "text-muted hover:text-ink"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={create}
            disabled={pending}
            className="rounded-full bg-ink px-6 py-2.5 text-paper transition-colors hover:bg-accent disabled:opacity-60"
          >
            {pending ? "Creating" : `Create mix (${selected.size})`}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-accent" role="alert">
            {error}
          </p>
        )}
        <p className="mt-3 text-xs text-muted">
          {mode === "weighted"
            ? "Weighted: each influence gets a percentage that totals 100. You set the exact split next."
            : "Additive: influences are combined equally, no percentages."}{" "}
          Need more options?{" "}
          <Link href="/library" className="text-ink underline underline-offset-4">
            Save more from the library
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
