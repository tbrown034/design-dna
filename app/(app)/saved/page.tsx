import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getEntry } from "@/data/library";
import { requireUser } from "@/lib/dal";
import { getSavedItems } from "@/lib/queries/saved";

export const metadata: Metadata = { title: "Saved" };

export default function SavedPage() {
  return (
    <div>
      <p className="eyebrow">Your collection</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight">
        Saved influences
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Everything you have collected, ready to combine into a mix.
      </p>

      <Suspense fallback={<p className="mt-10 text-muted">Loading collection…</p>}>
        <SavedList />
      </Suspense>
    </div>
  );
}

async function SavedList() {
  const user = await requireUser();
  const items = await getSavedItems(user.id);

  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-line-strong p-10 text-center">
        <p className="font-serif text-xl tracking-tight">Nothing saved yet.</p>
        <p className="mt-2 text-sm text-muted">
          Browse the library and save the styles and brands you like.
        </p>
        <Link
          href="/library"
          className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-accent"
        >
          Open the library
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const entry = getEntry(item.librarySlug);
        if (!entry) return null;
        return (
          <Link
            key={item.id}
            href={`/library/${entry.slug}`}
            className="group rounded-2xl border border-line bg-paper-raised p-5 transition-colors hover:border-ink"
          >
            <div className="flex gap-1.5" aria-hidden>
              {entry.palette.map((s) => (
                <span
                  key={s.hex}
                  style={{ background: s.hex }}
                  className="h-6 w-6 rounded-full border border-line"
                />
              ))}
            </div>
            <p className="eyebrow mt-4">{entry.kind}</p>
            <h3 className="mt-1 font-serif text-xl tracking-tight">
              {entry.name}
            </h3>
            <p className="mt-1 text-sm text-muted">{entry.tagline}</p>
          </Link>
        );
      })}
    </div>
  );
}
