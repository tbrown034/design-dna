"use server";

import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getEntry } from "@/data/library";
import { generateTasteProfile, type TasteEvidence } from "@/lib/ai/taste";
import { requireUser } from "@/lib/dal";
import { db } from "@/lib/db";
import {
  mixComponents,
  mixes,
  savedItems,
  tasteProfiles,
} from "@/lib/db/schema";
import { getPatternTagsBySlug } from "@/lib/queries/patterns";

export async function generateTaste() {
  const user = await requireUser();

  const saved = await db
    .select()
    .from(savedItems)
    .where(eq(savedItems.userId, user.id));

  if (saved.length === 0) {
    throw new Error("Save a few influences first so there's something to read.");
  }

  const tagsBySlug = await getPatternTagsBySlug(user.id);

  const userMixes = await db.query.mixes.findMany({
    where: eq(mixes.userId, user.id),
    with: { components: { orderBy: asc(mixComponents.sortOrder) } },
  });

  const evidence: TasteEvidence = {
    saved: saved
      .map((s) => {
        const e = getEntry(s.librarySlug);
        return e
          ? { name: e.name, kind: e.kind, tags: e.tags }
          : null;
      })
      .filter((x): x is NonNullable<typeof x> => Boolean(x)),
    likedElements: Object.entries(tagsBySlug)
      .map(([slug, elements]) => {
        const e = getEntry(slug);
        return e ? { name: e.name, elements } : null;
      })
      .filter((x): x is NonNullable<typeof x> => Boolean(x)),
    mixes: userMixes.map((m) => ({
      name: m.name,
      influences: m.components
        .map((c) => getEntry(c.librarySlug)?.name ?? c.librarySlug)
        .filter(Boolean),
    })),
  };

  const { profile, model, inputTokens, outputTokens } =
    await generateTasteProfile(evidence);

  const evidenceSnapshot = {
    savedCount: evidence.saved.length,
    taggedCount: evidence.likedElements.length,
    mixCount: evidence.mixes.length,
  };

  // One current taste profile per user (unique userId) — upsert.
  await db
    .insert(tasteProfiles)
    .values({
      userId: user.id,
      summary: profile,
      evidenceSnapshot,
      generatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: tasteProfiles.userId,
      set: { summary: profile, evidenceSnapshot, generatedAt: new Date() },
    });

  revalidatePath("/taste");
}
