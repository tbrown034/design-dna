import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DeleteAnalysisButton } from "@/components/client/delete-analysis-button";
import type { UrlAnalysisData } from "@/lib/ai/analyze-schema";
import { requireUser } from "@/lib/dal";
import { getAnalysis } from "@/lib/queries/analyses";

export const metadata: Metadata = { title: "Analysis" };

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <Link
        href="/analyze"
        className="font-mono text-xs text-muted transition-colors hover:text-ink"
      >
        ← Analyze
      </Link>
      <Suspense fallback={<p className="mt-10 text-muted">Loading…</p>}>
        <AnalysisDetail id={id} />
      </Suspense>
    </div>
  );
}

async function AnalysisDetail({ id }: { id: string }) {
  const user = await requireUser();
  const row = await getAnalysis(user.id, id);
  if (!row) notFound();

  if (row.status === "failed") {
    return (
      <div className="mt-6">
        <h1 className="font-serif text-3xl tracking-tight">
          Couldn&apos;t analyze that site
        </h1>
        <p className="mt-2 font-mono text-sm text-muted">{row.normalizedUrl}</p>
        <p className="mt-4 text-accent">{row.errorMessage}</p>
        <p className="mt-2 text-sm text-muted">
          Some sites block automated requests. Try another URL.
        </p>
      </div>
    );
  }

  const a = row.analysis as UrlAnalysisData | null;
  if (!a) {
    return <p className="mt-10 text-muted">Still processing — refresh shortly.</p>;
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Design analysis</p>
          <a
            href={row.normalizedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block font-serif text-3xl tracking-tight underline-offset-4 hover:underline"
          >
            {row.normalizedUrl.replace(/^https?:\/\//, "")}
          </a>
        </div>
        <DeleteAnalysisButton id={row.id} />
      </div>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed">{a.overview}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Block title="Typography" body={a.typography} />
        <Block title="Color" body={a.color} />
        <Block title="Spacing & density" body={a.spacing} />
        <Block title="Navigation" body={a.navigation} />
        <Block title="Hierarchy" body={a.hierarchy} />
        <Block title="Interaction" body={a.interaction} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <ListBlock title="Closest library styles" items={a.closestStyles} />
        <ListBlock title="Borrowable takeaways" items={a.takeaways} accent />
      </div>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5">
      <h3 className="eyebrow">{title}</h3>
      <p className="mt-2 leading-relaxed">{body}</p>
    </div>
  );
}

function ListBlock({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5">
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent ? "bg-accent" : "bg-ink"}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
