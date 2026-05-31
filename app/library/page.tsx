import type { Metadata } from "next";
import { LibraryCard } from "@/components/library-card";
import type { LibraryEntry } from "@/data/library";
import { getLibrarySections } from "@/lib/queries/library";

export const metadata: Metadata = {
  title: "Library",
  description:
    "Browse twenty generic design styles and sixteen specific brand influences. Save the ones that match your taste.",
};

export default async function LibraryPage() {
  const { styles, influences } = await getLibrarySections();

  return (
    <div>
      <p className="eyebrow">The library</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
        Browse design influences
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Twenty generic styles and sixteen specific brands. Save what resonates,
        then combine your collection into a design profile.
      </p>

      <Section
        title="Generic styles"
        subtitle="Broad aesthetics to anchor a direction."
        entries={styles}
      />
      <Section
        title="Specific influences"
        subtitle="Real products and publications with a strong point of view."
        entries={influences}
      />
    </div>
  );
}

function Section({
  title,
  subtitle,
  entries,
}: {
  title: string;
  subtitle: string;
  entries: LibraryEntry[];
}) {
  return (
    <section className="mt-12">
      <div className="flex items-baseline justify-between border-b border-line pb-3">
        <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
        <span className="font-mono text-xs text-muted">
          {entries.length} entries
        </span>
      </div>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <LibraryCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </section>
  );
}
