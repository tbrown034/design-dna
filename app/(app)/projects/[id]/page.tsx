import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BoardComposer } from "@/components/client/board-composer";
import { DeleteItemButton } from "@/components/client/delete-item-button";
import { DeleteProjectButton } from "@/components/client/delete-project-button";
import { requireUser } from "@/lib/dal";
import { getProject } from "@/lib/queries/moodboard";

export const metadata: Metadata = { title: "Board" };

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <Link
        href="/projects"
        className="font-mono text-xs text-muted transition-colors hover:text-ink"
      >
        ← Boards
      </Link>
      <Suspense fallback={<p className="mt-10 text-muted">Loading board…</p>}>
        <BoardDetail id={id} />
      </Suspense>
    </div>
  );
}

async function BoardDetail({ id }: { id: string }) {
  const user = await requireUser();
  const project = await getProject(user.id, id);
  if (!project) notFound();

  const items = [...project.items].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Mood board</p>
          <h1 className="mt-1 font-serif text-4xl tracking-tight">
            {project.name}
          </h1>
          {project.description && (
            <p className="mt-2 text-muted">{project.description}</p>
          )}
        </div>
        <DeleteProjectButton projectId={project.id} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[20rem_1fr]">
        <div>
          <BoardComposer projectId={project.id} />
        </div>

        <div>
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line-strong p-10 text-center">
              <p className="font-serif text-lg tracking-tight">
                This board is empty.
              </p>
              <p className="mt-2 text-sm text-muted">
                Add reference links and notes from the left.
              </p>
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 break-inside-avoid rounded-2xl border border-line bg-paper-raised p-4"
                >
                  {item.type === "url" && item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-mono text-sm text-ink underline-offset-4 hover:underline"
                    >
                      {item.sourceUrl.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  {item.note && (
                    <p
                      className={`text-sm ${item.type === "url" ? "mt-2 text-muted" : ""}`}
                    >
                      {item.note}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-xs text-muted">
                      {item.type}
                    </span>
                    <DeleteItemButton projectId={project.id} itemId={item.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
