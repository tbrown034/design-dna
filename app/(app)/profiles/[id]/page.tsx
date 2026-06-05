import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DeleteProfileButton } from "@/components/client/delete-profile-button";
import { ExportTabs } from "@/components/client/export-tabs";
import { PromptTabs } from "@/components/client/prompt-tabs";
import { EXPORT_FORMATS, buildExport } from "@/lib/ai/exports";
import { PROMPT_TOOLS } from "@/lib/ai/prompts";
import type { DnaProfile } from "@/lib/ai/schemas";
import { requireUser } from "@/lib/dal";
import { getProfile } from "@/lib/queries/profiles";

export const metadata: Metadata = { title: "Design profile" };

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <Link
        href="/profiles"
        className="font-mono text-xs text-muted transition-colors hover:text-ink"
      >
        ← Profiles
      </Link>
      <Suspense fallback={<p className="mt-10 text-muted">Loading profile…</p>}>
        <ProfileDetail id={id} />
      </Suspense>
    </div>
  );
}

async function ProfileDetail({ id }: { id: string }) {
  const user = await requireUser();
  const row = await getProfile(user.id, id);
  if (!row) notFound();

  const profile = row.profile as DnaProfile | null;
  if (!profile) {
    return (
      <p className="mt-10 text-muted">
        This profile didn&apos;t finish generating. Try generating it again from
        the mix.
      </p>
    );
  }

  const labelFor = (tool: string) =>
    PROMPT_TOOLS.find((t) => t.value === tool)?.label ?? tool;
  const prompts = [...row.prompts]
    .sort(
      (a, b) =>
        PROMPT_TOOLS.findIndex((t) => t.value === a.tool) -
        PROMPT_TOOLS.findIndex((t) => t.value === b.tool),
    )
    .map((p) => ({ tool: p.tool, label: labelFor(p.tool), content: p.content }));

  const exports = EXPORT_FORMATS.map((f) => ({
    format: f.value,
    label: f.label,
    filename: f.filename,
    blurb: f.blurb,
    content: buildExport(profile, f.value),
  }));

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Design DNA profile</p>
          <h1 className="mt-1 font-serif text-4xl tracking-tight sm:text-5xl">
            {profile.title}
          </h1>
        </div>
        <DeleteProfileButton profileId={row.id} />
      </div>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed">{profile.summary}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Block title="Visual style" body={profile.visualStyle} />
        <Block title="Hierarchy" body={profile.hierarchy} />
        <Block title="Interaction" body={profile.interactionPhilosophy} />
        <Block title="Tone of voice" body={profile.tone} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <ListBlock title="Principles" items={profile.principles} />
        <ListBlock title="Do" items={profile.doList} />
        <ListBlock title="Don't" items={profile.dontList} accent />
      </div>

      <section className="mt-14">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl tracking-tight">
            Prompts for your AI tools
          </h2>
        </div>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Paste one of these into your tool to carry this design direction into
          what you build next.
        </p>
        <div className="mt-5">
          <PromptTabs prompts={prompts} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl tracking-tight">Take it with you</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Reusable artifacts you keep and drop into a project — a CLAUDE.md
          section, a Claude Code skill, or a standalone style guide. Copy or
          download.
        </p>
        <div className="mt-5">
          <ExportTabs exports={exports} />
        </div>
      </section>
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
