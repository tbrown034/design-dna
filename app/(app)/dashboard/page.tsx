import Link from "next/link";
import { getSession } from "@/lib/dal";

const CARDS = [
  {
    href: "/library",
    title: "Browse the library",
    body: "Twenty design styles and sixteen specific influences. Save the ones that resonate.",
  },
  {
    href: "/saved",
    title: "Your saved influences",
    body: "Everything you have collected, ready to combine.",
  },
  {
    href: "/mixes",
    title: "Build a mix",
    body: "Combine influences with weights — 70% Financial Times, 20% Apple, 10% Linear.",
  },
];

export default async function DashboardPage() {
  const session = await getSession();
  const name = session?.user.name ?? "there";

  return (
    <div>
      <p className="eyebrow">Dashboard</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight">
        Hello, {name}.
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Collect design influences, combine them into a profile, and turn that
        profile into prompts your AI tools can actually use.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-line bg-paper-raised p-6 transition-colors hover:border-ink"
          >
            <h2 className="font-serif text-xl tracking-tight">{card.title}</h2>
            <p className="mt-2 text-sm text-muted">{card.body}</p>
            <span className="mt-4 inline-block text-sm text-accent">
              Open →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
