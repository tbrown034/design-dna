import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const MIX_EXAMPLE = [
  { label: "Financial Times", weight: 70 },
  { label: "Apple", weight: 20 },
  { label: "Linear", weight: 10 },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
          <p className="eyebrow">A point of view for AI-built interfaces</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            AI can build a website in seconds. It just can&apos;t tell you what
            it should feel like.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Design DNA helps you capture the interfaces, typography, and
            interaction patterns you love — then combine them into a reusable
            design profile that gives your AI tools real taste.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/library"
              className="rounded-full bg-ink px-6 py-3 text-paper transition-colors hover:bg-accent"
            >
              Browse the library
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-line-strong px-6 py-3 text-ink transition-colors hover:border-ink"
            >
              Start a profile
            </Link>
          </div>
        </section>

        <section className="border-y border-line bg-paper-raised">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <p className="eyebrow">An example mix</p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div className="space-y-3">
                {MIX_EXAMPLE.map((row) => (
                  <div key={row.label} className="flex items-center gap-4">
                    <span className="w-40 shrink-0 font-serif text-lg">
                      {row.label}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${row.weight}%` }}
                      />
                    </div>
                    <span className="w-10 text-right font-mono text-sm text-muted">
                      {row.weight}%
                    </span>
                  </div>
                ))}
              </div>
              <p className="max-w-md text-muted">
                Weight your influences, extract the patterns you actually want —
                FT&apos;s typographic hierarchy, Apple&apos;s spacing,
                Linear&apos;s restraint — and Design DNA writes the prompt that
                carries that taste into Claude, Cursor, or v0.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 sm:grid-cols-3">
            <Step
              n="01"
              title="Collect"
              body="Browse generic styles and specific brands. Save the ones that match your taste."
            />
            <Step
              n="02"
              title="Combine"
              body="Mix influences with weights and pull out the exact patterns you want to borrow."
            />
            <Step
              n="03"
              title="Carry it forward"
              body="Generate a structured design profile and ready-to-paste prompts for AI tools."
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted">
          Design DNA — a taste-transfer tool for design-led builders.
        </div>
      </footer>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div>
      <span className="font-mono text-sm text-accent">{n}</span>
      <h3 className="mt-2 font-serif text-2xl tracking-tight">{title}</h3>
      <p className="mt-2 text-muted">{body}</p>
    </div>
  );
}
