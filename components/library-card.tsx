import Link from "next/link";
import { SaveButton } from "@/components/client/save-button";
import type { LibraryEntry } from "@/data/library";

export function LibraryCard({ entry }: { entry: LibraryEntry }) {
  return (
    <div className="group relative rounded-2xl border border-line bg-paper-raised p-5 transition-colors hover:border-ink">
      <div className="absolute right-4 top-4 z-10">
        <SaveButton slug={entry.slug} />
      </div>
      <Link href={`/library/${entry.slug}`} className="block">
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
        <h3 className="mt-1 pr-16 font-serif text-xl tracking-tight">
          {entry.name}
        </h3>
        <p className="mt-1 text-sm text-muted">{entry.tagline}</p>
      </Link>
    </div>
  );
}
