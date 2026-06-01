// Verifies the Phase 4-7 write-paths against Neon: pattern tags, taste profile
// upsert, url analysis row, mood board project + items (+cascade).
// Run with: pnpm tsx scripts/verify-rest.ts
process.loadEnvFile(".env.local");

import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/db/schema";
import {
  moodboardItems,
  patternExtractions,
  patternTags,
  projects,
  tasteProfiles,
  urlAnalyses,
  user,
} from "../lib/db/schema";

const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

async function main() {
  const [u] = await db.select().from(user).limit(1);
  if (!u) throw new Error("No user — sign in first.");
  const uid = u.id;

  // --- Pattern extraction ---
  const [ext] = await db
    .insert(patternExtractions)
    .values({ userId: uid, sourceType: "library", sourceId: "stripe" })
    .returning();
  await db.insert(patternTags).values([
    { extractionId: ext.id, element: "buttons" },
    { extractionId: ext.id, element: "color_palette" },
  ]);
  const tags = await db
    .select()
    .from(patternTags)
    .where(eq(patternTags.extractionId, ext.id));
  console.log("pattern tags:", tags.map((t) => t.element).join(", "));
  await db.delete(patternExtractions).where(eq(patternExtractions.id, ext.id));
  const tagsAfter = await db
    .select()
    .from(patternTags)
    .where(eq(patternTags.extractionId, ext.id));
  console.log("tags after cascade delete:", tagsAfter.length);

  // --- Taste profile upsert (unique userId) ---
  const tp = { headline: "Test taste", summary: "s", tendencies: [], blindSpots: [], signatureWords: [] };
  await db
    .insert(tasteProfiles)
    .values({ userId: uid, summary: tp, evidenceSnapshot: { savedCount: 1 } })
    .onConflictDoUpdate({
      target: tasteProfiles.userId,
      set: { summary: { ...tp, headline: "Updated taste" } },
    });
  await db
    .insert(tasteProfiles)
    .values({ userId: uid, summary: tp, evidenceSnapshot: { savedCount: 2 } })
    .onConflictDoUpdate({
      target: tasteProfiles.userId,
      set: { summary: { ...tp, headline: "Updated taste" } },
    });
  const tprows = await db
    .select()
    .from(tasteProfiles)
    .where(eq(tasteProfiles.userId, uid));
  console.log(
    "taste rows for user (should be 1):",
    tprows.length,
    "| headline:",
    (tprows[0]?.summary as { headline: string })?.headline,
  );
  await db.delete(tasteProfiles).where(eq(tasteProfiles.userId, uid));

  // --- URL analysis row ---
  const [an] = await db
    .insert(urlAnalyses)
    .values({
      userId: uid,
      url: "stripe.com",
      normalizedUrl: "https://stripe.com",
      status: "complete",
      analysis: { overview: "x", closestStyles: ["Modern SaaS"], takeaways: [] },
    })
    .returning();
  console.log("url analysis status:", an.status);
  await db.delete(urlAnalyses).where(eq(urlAnalyses.id, an.id));

  // --- Mood board project + items + cascade ---
  const [proj] = await db
    .insert(projects)
    .values({ userId: uid, name: "Verify board" })
    .returning();
  await db.insert(moodboardItems).values([
    { projectId: proj.id, userId: uid, type: "url", sourceUrl: "https://x.com", sortOrder: 0 },
    { projectId: proj.id, userId: uid, type: "note", note: "a note", sortOrder: 1 },
  ]);
  const items = await db
    .select()
    .from(moodboardItems)
    .where(eq(moodboardItems.projectId, proj.id));
  console.log("board items:", items.length, items.map((i) => i.type).join(","));
  await db
    .delete(projects)
    .where(and(eq(projects.id, proj.id), eq(projects.userId, uid)));
  const itemsAfter = await db
    .select()
    .from(moodboardItems)
    .where(eq(moodboardItems.projectId, proj.id));
  console.log("items after board delete (cascade):", itemsAfter.length);

  if (
    tags.length !== 2 ||
    tagsAfter.length !== 0 ||
    tprows.length !== 1 ||
    items.length !== 2 ||
    itemsAfter.length !== 0
  ) {
    throw new Error("verification failed");
  }
  console.log("OK — patterns, taste, analysis, mood board all verified");
}

main().catch((e) => {
  console.error("FAILED:", e?.message ?? e);
  process.exit(1);
});
