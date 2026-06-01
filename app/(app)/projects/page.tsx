import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { NewProjectButton } from "@/components/client/new-project-button";
import { requireUser } from "@/lib/dal";
import { getProjects } from "@/lib/queries/moodboard";

export const metadata: Metadata = { title: "Boards" };

export default function ProjectsPage() {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Mood boards</p>
          <h1 className="mt-2 font-serif text-4xl tracking-tight">Your boards</h1>
          <p className="mt-3 max-w-xl text-muted">
            Collect reference links and notes, organized by project.
          </p>
        </div>
        <NewProjectButton />
      </div>

      <Suspense fallback={<p className="mt-10 text-muted">Loading boards…</p>}>
        <ProjectList />
      </Suspense>
    </div>
  );
}

async function ProjectList() {
  const user = await requireUser();
  const rows = await getProjects(user.id);

  if (rows.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-line-strong p-10 text-center">
        <p className="font-serif text-xl tracking-tight">No boards yet.</p>
        <p className="mt-2 text-sm text-muted">
          Create a board to start collecting references.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((p) => (
        <Link
          key={p.id}
          href={`/projects/${p.id}`}
          className="rounded-2xl border border-line bg-paper-raised p-6 transition-colors hover:border-ink"
        >
          <h2 className="font-serif text-xl tracking-tight">{p.name}</h2>
          {p.description && (
            <p className="mt-2 text-sm text-muted">{p.description}</p>
          )}
        </Link>
      ))}
    </div>
  );
}
