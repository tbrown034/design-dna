import "server-only";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { patternExtractions, patternTags } from "@/lib/db/schema";

// Returns a map of librarySlug -> selected element values for the user's
// library-sourced pattern extractions.
export async function getPatternTagsBySlug(
  userId: string,
): Promise<Record<string, string[]>> {
  const extractions = await db
    .select()
    .from(patternExtractions)
    .where(eq(patternExtractions.userId, userId));

  const libraryOnes = extractions.filter((e) => e.sourceType === "library");
  if (libraryOnes.length === 0) return {};

  const tags = await db
    .select()
    .from(patternTags)
    .where(
      inArray(
        patternTags.extractionId,
        libraryOnes.map((e) => e.id),
      ),
    );

  const idToSlug = new Map(libraryOnes.map((e) => [e.id, e.sourceId]));
  const out: Record<string, string[]> = {};
  for (const t of tags) {
    const slug = idToSlug.get(t.extractionId);
    if (!slug) continue;
    (out[slug] ??= []).push(t.element);
  }
  return out;
}
