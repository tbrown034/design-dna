import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MixBuilder } from "@/components/client/mix-builder";
import { getEntry } from "@/data/library";
import { requireUser } from "@/lib/dal";
import { getSavedItems } from "@/lib/queries/saved";

export const metadata: Metadata = { title: "New mix" };

export default function NewMixPage() {
  return (
    <div>
      <Link
        href="/mixes"
        className="font-mono text-xs text-muted transition-colors hover:text-ink"
      >
        ← Mixes
      </Link>
      <p className="eyebrow mt-6">New mix</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight">
        Pick the influences to blend
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Choose from your saved styles and brands. You can set the exact weights
        in the next step.
      </p>

      <Suspense fallback={<p className="mt-10 text-muted">Loading your saved influences…</p>}>
        <BuilderLoader />
      </Suspense>
    </div>
  );
}

async function BuilderLoader() {
  const user = await requireUser();
  const items = await getSavedItems(user.id);
  const entries = items
    .map((i) => getEntry(i.librarySlug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .map((e) => ({
      slug: e.slug,
      name: e.name,
      kind: e.kind,
      tagline: e.tagline,
      palette: e.palette.map((p) => ({ hex: p.hex })),
    }));

  if (entries.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-line-strong p-10 text-center">
        <p className="font-serif text-xl tracking-tight">
          You need some saved influences first.
        </p>
        <p className="mt-2 text-sm text-muted">
          Save a few styles or brands, then come back to mix them.
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

  return <MixBuilder entries={entries} />;
}
