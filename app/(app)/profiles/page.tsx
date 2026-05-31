import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requireUser } from "@/lib/dal";
import { getProfiles } from "@/lib/queries/profiles";

export const metadata: Metadata = { title: "Profiles" };

export default function ProfilesPage() {
  return (
    <div>
      <p className="eyebrow">Design DNA</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight">Your profiles</h1>
      <p className="mt-3 max-w-xl text-muted">
        Generated design directions and the AI prompts that carry them.
      </p>

      <Suspense fallback={<p className="mt-10 text-muted">Loading profiles…</p>}>
        <ProfileList />
      </Suspense>
    </div>
  );
}

async function ProfileList() {
  const user = await requireUser();
  const profiles = await getProfiles(user.id);

  if (profiles.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-line-strong p-10 text-center">
        <p className="font-serif text-xl tracking-tight">No profiles yet.</p>
        <p className="mt-2 text-sm text-muted">
          Build a mix, then generate a design profile from it.
        </p>
        <Link
          href="/mixes"
          className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-accent"
        >
          Go to mixes
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {profiles.map((p) => (
        <Link
          key={p.id}
          href={`/profiles/${p.id}`}
          className="rounded-2xl border border-line bg-paper-raised p-6 transition-colors hover:border-ink"
        >
          <p className="eyebrow">Profile</p>
          <h2 className="mt-1 font-serif text-xl tracking-tight">{p.title}</h2>
          <p className="mt-2 font-mono text-xs text-muted">
            {p.model ?? "—"}
          </p>
        </Link>
      ))}
    </div>
  );
}
