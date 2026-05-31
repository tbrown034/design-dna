import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getEntry } from "@/data/library";
import { requireUser } from "@/lib/dal";
import { getMixes } from "@/lib/queries/mixes";

export const metadata: Metadata = { title: "Mixes" };

export default function MixesPage() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow">Mix &amp; match</p>
          <h1 className="mt-2 font-serif text-4xl tracking-tight">Your mixes</h1>
          <p className="mt-3 max-w-xl text-muted">
            Blend saved influences with weights, then turn a mix into a design
            profile.
          </p>
        </div>
        <Link
          href="/mixes/new"
          className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-accent"
        >
          New mix
        </Link>
      </div>

      <Suspense fallback={<p className="mt-10 text-muted">Loading mixes…</p>}>
        <MixList />
      </Suspense>
    </div>
  );
}

async function MixList() {
  const user = await requireUser();
  const mixes = await getMixes(user.id);

  if (mixes.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-line-strong p-10 text-center">
        <p className="font-serif text-xl tracking-tight">No mixes yet.</p>
        <p className="mt-2 text-sm text-muted">
          Start one from the influences you have saved.
        </p>
        <Link
          href="/mixes/new"
          className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-accent"
        >
          Create your first mix
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {mixes.map((mix) => {
        const components = [...mix.components].sort(
          (a, b) => a.sortOrder - b.sortOrder,
        );
        return (
          <Link
            key={mix.id}
            href={`/mixes/${mix.id}`}
            className="rounded-2xl border border-line bg-paper-raised p-6 transition-colors hover:border-ink"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl tracking-tight">{mix.name}</h2>
              <span className="font-mono text-xs text-muted">{mix.mode}</span>
            </div>
            <div className="mt-4 space-y-2">
              {components.map((c) => {
                const entry = getEntry(c.librarySlug);
                if (!entry) return null;
                return (
                  <div key={c.id} className="flex items-center gap-3 text-sm">
                    <span className="w-32 shrink-0 truncate">{entry.name}</span>
                    {mix.mode === "weighted" && (
                      <>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${c.weight ?? 0}%` }}
                          />
                        </div>
                        <span className="w-9 text-right font-mono text-xs text-muted">
                          {c.weight ?? 0}%
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
