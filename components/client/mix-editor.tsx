"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  addMixComponents,
  removeMixComponent,
  updateMixComponents,
} from "@/lib/actions/mixes";
import { PATTERN_ELEMENTS, type PatternElement } from "@/lib/patterns";

export type EditorComponent = {
  id: string;
  slug: string;
  name: string;
  palette: { hex: string }[];
  weight: number | null;
  patternFocus: string | null;
};

type Available = { slug: string; name: string };

export function MixEditor({
  mixId,
  mode,
  components,
  available,
}: {
  mixId: string;
  mode: "weighted" | "additive";
  components: EditorComponent[];
  available: Available[];
}) {
  const router = useRouter();
  const [rows, setRows] = useState(components);
  const [adding, setAdding] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const total = rows.reduce((acc, r) => acc + (r.weight ?? 0), 0);
  const weightedValid = mode !== "weighted" || total === 100;

  function setWeight(id: string, value: number) {
    const v = Math.max(0, Math.min(100, Math.round(value || 0)));
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, weight: v } : r)));
    setSaved(false);
  }

  function setFocus(id: string, focus: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, patternFocus: focus || null } : r,
      ),
    );
    setSaved(false);
  }

  function balance() {
    const n = rows.length;
    if (n === 0) return;
    const base = Math.floor(100 / n);
    const rem = 100 - base * n;
    setRows((prev) =>
      prev.map((r, i) => ({ ...r, weight: base + (i < rem ? 1 : 0) })),
    );
    setSaved(false);
  }

  function save() {
    setError(null);
    if (!weightedValid) {
      setError(`Weights must total 100 (currently ${total}).`);
      return;
    }
    startTransition(async () => {
      try {
        await updateMixComponents(
          mixId,
          rows.map((r) => ({
            id: r.id,
            weight: mode === "weighted" ? (r.weight ?? 0) : null,
            patternFocus: (r.patternFocus as PatternElement) ?? null,
          })),
        );
        setSaved(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not save.");
      }
    });
  }

  function remove(componentId: string) {
    startTransition(async () => {
      await removeMixComponent(mixId, componentId);
      router.refresh();
    });
  }

  function addSelected() {
    if (adding.size === 0) return;
    startTransition(async () => {
      await addMixComponents(mixId, [...adding]);
      setAdding(new Set());
      router.refresh();
    });
  }

  return (
    <div className="mt-8">
      {mode === "weighted" && (
        <div className="mb-5 flex items-center gap-4">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
            <div
              className={`h-full rounded-full ${total === 100 ? "bg-accent" : "bg-muted"}`}
              style={{ width: `${Math.min(total, 100)}%` }}
            />
          </div>
          <span
            className={`font-mono text-sm ${total === 100 ? "text-ink" : "text-accent"}`}
          >
            {total}%
          </span>
          <button
            type="button"
            onClick={balance}
            className="rounded-full border border-line-strong px-3 py-1.5 text-xs transition-colors hover:border-ink"
          >
            Balance evenly
          </button>
        </div>
      )}

      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-paper-raised p-4"
          >
            <div className="flex gap-1" aria-hidden>
              {r.palette.map((s) => (
                <span
                  key={s.hex}
                  style={{ background: s.hex }}
                  className="h-5 w-5 rounded-full border border-line"
                />
              ))}
            </div>
            <span className="w-40 shrink-0 font-serif text-lg tracking-tight">
              {r.name}
            </span>

            {mode === "weighted" && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={r.weight ?? 0}
                  onChange={(e) => setWeight(r.id, Number(e.target.value))}
                  className="w-20 rounded-lg border border-line-strong bg-paper px-2 py-1.5 text-right outline-none focus:border-ink"
                />
                <span className="text-sm text-muted">%</span>
              </div>
            )}

            <label className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-muted">Focus</span>
              <select
                value={r.patternFocus ?? ""}
                onChange={(e) => setFocus(r.id, e.target.value)}
                className="rounded-lg border border-line-strong bg-paper px-2 py-1.5 outline-none focus:border-ink"
              >
                <option value="">Whole style</option>
                {PATTERN_ELEMENTS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => remove(r.id)}
              className="text-sm text-muted transition-colors hover:text-accent"
              aria-label={`Remove ${r.name}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="rounded-full bg-ink px-6 py-2.5 text-paper transition-colors hover:bg-accent disabled:opacity-60"
        >
          {pending ? "Saving" : "Save mix"}
        </button>
        {saved && <span className="text-sm text-muted">Saved.</span>}
        {error && (
          <span className="text-sm text-accent" role="alert">
            {error}
          </span>
        )}
      </div>

      {available.length > 0 && (
        <div className="mt-10 rounded-2xl border border-line bg-paper-raised p-5">
          <p className="eyebrow">Add more from your saved</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {available.map((a) => {
              const on = adding.has(a.slug);
              return (
                <button
                  key={a.slug}
                  type="button"
                  onClick={() =>
                    setAdding((prev) => {
                      const next = new Set(prev);
                      if (next.has(a.slug)) next.delete(a.slug);
                      else next.add(a.slug);
                      return next;
                    })
                  }
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    on
                      ? "border-ink bg-ink text-paper"
                      : "border-line-strong hover:border-ink"
                  }`}
                >
                  {a.name}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={addSelected}
            disabled={pending || adding.size === 0}
            className="mt-4 rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:border-ink disabled:opacity-50"
          >
            Add selected ({adding.size})
          </button>
        </div>
      )}
    </div>
  );
}
