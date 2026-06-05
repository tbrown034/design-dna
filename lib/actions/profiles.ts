"use server";

import { and, asc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getEntry } from "@/data/library";
import { generateDnaProfile, type MixInput } from "@/lib/ai/dna";
import { buildToolPrompt, PROMPT_TOOLS } from "@/lib/ai/prompts";
import { requireUser } from "@/lib/dal";
import { db } from "@/lib/db";
import {
  dnaProfiles,
  generatedPrompts,
  mixComponents,
  mixes,
} from "@/lib/db/schema";
import { tagPhrase } from "@/lib/patterns";
import { getPatternTagsBySlug } from "@/lib/queries/patterns";

export async function generateProfile(mixId: string) {
  const user = await requireUser();

  const mix = await db.query.mixes.findFirst({
    where: and(eq(mixes.id, mixId), eq(mixes.userId, user.id)),
    with: { components: { orderBy: asc(mixComponents.sortOrder) } },
  });
  if (!mix) throw new Error("Mix not found");
  if (mix.components.length === 0) {
    throw new Error("Add at least one influence to the mix first.");
  }

  // Per-influence elements the user tagged as liked, so the profile leans into
  // the specifics they cared about rather than discarding that signal.
  const tagsBySlug = await getPatternTagsBySlug(user.id);

  const input: MixInput = {
    name: mix.name,
    mode: mix.mode,
    components: mix.components.map((c) => {
      const e = getEntry(c.librarySlug);
      return {
        name: e?.name ?? c.librarySlug,
        kind: e?.kind ?? "style",
        weight: c.weight,
        focus: c.patternFocus,
        traits: e?.traits ?? [],
        typography: e?.typography ?? "",
        tags: e?.tags ?? [],
        liked: (tagsBySlug[c.librarySlug] ?? []).map(tagPhrase),
      };
    }),
  };

  const { profile, model, inputTokens, outputTokens } =
    await generateDnaProfile(input);

  const [row] = await db
    .insert(dnaProfiles)
    .values({
      userId: user.id,
      mixId: mix.id,
      title: profile.title,
      status: "complete",
      profile,
      model,
      inputTokens,
      outputTokens,
    })
    .returning();

  // Deterministic per-tool prompts — no extra model calls.
  await db.insert(generatedPrompts).values(
    PROMPT_TOOLS.map((t) => ({
      userId: user.id,
      dnaProfileId: row.id,
      tool: t.value,
      content: buildToolPrompt(profile, t.value, mix.name),
    })),
  );

  redirect(`/profiles/${row.id}`);
}

export async function deleteProfile(id: string) {
  const user = await requireUser();
  const p = await db.query.dnaProfiles.findFirst({
    where: and(eq(dnaProfiles.id, id), eq(dnaProfiles.userId, user.id)),
  });
  if (!p) throw new Error("Profile not found");
  await db.delete(dnaProfiles).where(eq(dnaProfiles.id, id));
  redirect("/profiles");
}
