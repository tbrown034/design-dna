import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AnalyzeForm } from "@/components/client/analyze-form";
import { requireUser } from "@/lib/dal";
import { getAnalyses } from "@/lib/queries/analyses";

export const metadata: Metadata = { title: "Analyze a URL" };

export default function AnalyzePage() {
  return (
    <div>
      <p className="eyebrow">Design analysis</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight">
        Analyze any website
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Paste a URL and get a structured read of its typography, color, spacing,
        navigation, and hierarchy.
      </p>

      <AnalyzeForm />

      <Suspense fallback={null}>
        <PastAnalyses />
      </Suspense>
    </div>
  );
}

async function PastAnalyses() {
  const user = await requireUser();
  const rows = await getAnalyses(user.id);
  if (rows.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="eyebrow">Recent analyses</h2>
      <div className="mt-4 space-y-2">
        {rows.map((r) => (
          <Link
            key={r.id}
            href={`/analyze/${r.id}`}
            className="flex items-center justify-between rounded-xl border border-line bg-paper-raised px-4 py-3 transition-colors hover:border-ink"
          >
            <span className="truncate font-mono text-sm">{r.normalizedUrl}</span>
            <span
              className={`ml-3 shrink-0 font-mono text-xs ${
                r.status === "complete"
                  ? "text-muted"
                  : r.status === "failed"
                    ? "text-accent"
                    : "text-muted"
              }`}
            >
              {r.status}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
