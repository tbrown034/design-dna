import type { Metadata } from "next";
import { Suspense } from "react";
import { GenerateTasteButton } from "@/components/client/generate-taste-button";
import type { TasteProfileData } from "@/lib/ai/taste-schema";
import { requireUser } from "@/lib/dal";
import { getTasteProfile } from "@/lib/queries/taste";

export const metadata: Metadata = { title: "Taste profile" };

export default function TastePage() {
  return (
    <div>
      <p className="eyebrow">Personal taste</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight">
        Your taste profile
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        An honest read of your design tendencies, based on what you save, tag,
        and mix.
      </p>

      <Suspense fallback={<p className="mt-10 text-muted">Loading…</p>}>
        <TasteContent />
      </Suspense>
    </div>
  );
}

async function TasteContent() {
  const user = await requireUser();
  const row = await getTasteProfile(user.id);
  const profile = row?.summary as TasteProfileData | undefined;
  const evidence = row?.evidenceSnapshot as
    | { savedCount: number; taggedCount: number; mixCount: number }
    | undefined;

  return (
    <div className="mt-8">
      <GenerateTasteButton hasProfile={Boolean(profile)} />

      {!profile && (
        <div className="mt-8 rounded-2xl border border-dashed border-line-strong p-10 text-center">
          <p className="font-serif text-xl tracking-tight">
            No taste profile yet.
          </p>
          <p className="mt-2 text-sm text-muted">
            Save and tag a few influences, then analyze your taste.
          </p>
        </div>
      )}

      {profile && (
        <div className="mt-8">
          <h2 className="font-serif text-3xl tracking-tight">
            {profile.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed">
            {profile.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {profile.signatureWords.map((w) => (
              <span
                key={w}
                className="rounded-full bg-accent-soft px-3 py-1 text-sm text-ink"
              >
                {w}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <ListBlock title="Tendencies" items={profile.tendencies} />
            <ListBlock title="Worth exploring" items={profile.blindSpots} accent />
          </div>

          {evidence && (
            <p className="mt-8 font-mono text-xs text-muted">
              Based on {evidence.savedCount} saved, {evidence.taggedCount} tagged,{" "}
              {evidence.mixCount} mixes
              {row?.generatedAt
                ? ` · updated ${new Date(row.generatedAt).toLocaleDateString()}`
                : ""}
            </p>
          )}
        </div>
      )}
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
