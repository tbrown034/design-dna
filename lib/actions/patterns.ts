"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getEntry } from "@/data/library";
import { requireUser } from "@/lib/dal";
import { db } from "@/lib/db";
import { patternExtractions, patternTags } from "@/lib/db/schema";
import { PATTERN_ELEMENTS, type PatternElement } from "@/lib/patterns";

const VALID = new Set(PATTERN_ELEMENTS.map((p) => p.value));

// Replaces the set of liked elements (each with an optional note) for a library
// entry. One extraction per (user, library slug); tags are rewritten to match
// the selection.
export async function setPatternTags(
  slug: string,
  tags: { element: string; note?: string | null }[],
) {
  const user = await requireUser();
  if (!getEntry(slug)) throw new Error(`Unknown library item: ${slug}`);

  // Validate, dedupe by element (first wins), and normalize notes.
  const seen = new Set<PatternElement>();
  const clean: { element: PatternElement; note: string | null }[] = [];
  for (const t of tags) {
    const element = t.element as PatternElement;
    if (!VALID.has(element) || seen.has(element)) continue;
    seen.add(element);
    const note = (t.note ?? "").trim();
    clean.push({ element, note: note ? note.slice(0, 280) : null });
  }

  let [extraction] = await db
    .select()
    .from(patternExtractions)
    .where(
      and(
        eq(patternExtractions.userId, user.id),
        eq(patternExtractions.sourceType, "library"),
        eq(patternExtractions.sourceId, slug),
      ),
    )
    .limit(1);

  if (clean.length === 0) {
    // No selection — remove the extraction entirely (tags cascade).
    if (extraction) {
      await db
        .delete(patternExtractions)
        .where(eq(patternExtractions.id, extraction.id));
    }
    revalidatePath("/saved");
    return;
  }

  if (!extraction) {
    [extraction] = await db
      .insert(patternExtractions)
      .values({ userId: user.id, sourceType: "library", sourceId: slug })
      .returning();
  }

  // Rewrite tags to match the current selection.
  await db
    .delete(patternTags)
    .where(eq(patternTags.extractionId, extraction.id));
  await db.insert(patternTags).values(
    clean.map((t) => ({
      extractionId: extraction.id,
      element: t.element,
      note: t.note,
    })),
  );

  revalidatePath("/saved");
}
