import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SaveButton } from "@/components/client/save-button";
import { allSlugs, getEntry } from "@/data/library";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};
  return { title: entry.name, description: entry.summary };
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  return (
    <article className="max-w-3xl">
      <Link
        href="/library"
        className="font-mono text-xs text-muted transition-colors hover:text-ink"
      >
        ← Library
      </Link>

      <header className="mt-6">
        <p className="eyebrow">{entry.kind}</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
            {entry.name}
          </h1>
          <SaveButton slug={entry.slug} size="lg" />
        </div>
        <p className="mt-3 text-lg text-muted">{entry.tagline}</p>
      </header>

      <p className="mt-8 text-lg leading-relaxed">{entry.summary}</p>

      <section className="mt-10">
        <h2 className="eyebrow">Palette</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {entry.palette.map((s) => (
            <div key={s.hex} className="flex items-center gap-2">
              <span
                style={{ background: s.hex }}
                className="h-9 w-9 rounded-lg border border-line"
              />
              <div className="leading-tight">
                <div className="text-sm">{s.name}</div>
                <div className="font-mono text-xs text-muted">{s.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="eyebrow">Design traits</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {entry.traits.map((t) => (
            <li
              key={t}
              className="flex items-start gap-2 text-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="eyebrow">Typography</h2>
        <p className="mt-3 text-muted">{entry.typography}</p>
      </section>

      <section className="mt-10 flex flex-wrap items-center gap-2">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </section>

      {entry.url && (
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block text-sm text-accent underline underline-offset-4"
        >
          Visit {entry.name} →
        </a>
      )}
    </article>
  );
}
