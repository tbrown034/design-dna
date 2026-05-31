import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DeleteMixButton } from "@/components/client/delete-mix-button";
import { GenerateProfileButton } from "@/components/client/generate-profile-button";
import { MixEditor } from "@/components/client/mix-editor";
import { getEntry } from "@/data/library";
import { requireUser } from "@/lib/dal";
import { getMix } from "@/lib/queries/mixes";
import { getSavedItems } from "@/lib/queries/saved";

export const metadata: Metadata = { title: "Mix" };

export default async function MixPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <Link
        href="/mixes"
        className="font-mono text-xs text-muted transition-colors hover:text-ink"
      >
        ← Mixes
      </Link>
      <Suspense fallback={<p className="mt-10 text-muted">Loading mix…</p>}>
        <MixDetail id={id} />
      </Suspense>
    </div>
  );
}

async function MixDetail({ id }: { id: string }) {
  const user = await requireUser();
  const mix = await getMix(user.id, id);
  if (!mix) notFound();

  const components = mix.components
    .map((c) => {
      const entry = getEntry(c.librarySlug);
      if (!entry) return null;
      return {
        id: c.id,
        slug: c.librarySlug,
        name: entry.name,
        palette: entry.palette.map((p) => ({ hex: p.hex })),
        weight: c.weight,
        patternFocus: c.patternFocus,
      };
    })
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const inMix = new Set(components.map((c) => c.slug));
  const saved = await getSavedItems(user.id);
  const available = saved
    .map((s) => getEntry(s.librarySlug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => !inMix.has(e.slug))
    .map((e) => ({ slug: e.slug, name: e.name }));

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">{mix.mode} mix</p>
          <h1 className="mt-1 font-serif text-4xl tracking-tight">
            {mix.name}
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <DeleteMixButton mixId={mix.id} />
          <GenerateProfileButton mixId={mix.id} />
        </div>
      </div>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Set your weights and focus, then generate a design profile and ready-to-paste
        AI prompts from this mix.
      </p>

      <MixEditor
        // Remount on add/remove so local weight state stays in sync.
        key={components.map((c) => c.id).join(",")}
        mixId={mix.id}
        mode={mix.mode}
        components={components}
        available={available}
      />
    </div>
  );
}
