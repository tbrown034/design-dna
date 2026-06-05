// One-off verification of the pattern-extraction write-path against Neon,
// including the free-text `note` column on pattern_tags. Mirrors what
// setPatternTags() does: upsert an extraction, rewrite tags with notes, read
// them back, then clean up. Run with: pnpm tsx scripts/verify-patterns.ts
process.loadEnvFile(".env.local");

import { neon } from "@neondatabase/serverless";
import { and, eq, inArray, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/db/schema";
import { patternExtractions, patternTags, user } from "../lib/db/schema";

const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

async function main() {
  // 1. Confirm the `note` column actually exists in the DB.
  const cols = await db.execute(
    sql`select column_name from information_schema.columns where table_name = 'pattern_tags'`,
  );
  const names = cols.rows.map((r) => r.column_name);
  console.log("pattern_tags columns:", names.join(", "));
  if (!names.includes("note")) {
    throw new Error("MISSING `note` column on pattern_tags — run `pnpm db:push`.");
  }

  const [u] = await db.select().from(user).limit(1);
  if (!u) throw new Error("No user in DB — sign in first.");
  console.log("user:", u.email);

  const slug = "__verify_patterns__";

  // Clean any prior state for an idempotent run.
  const prior = await db
    .select()
    .from(patternExtractions)
    .where(
      and(
        eq(patternExtractions.userId, u.id),
        eq(patternExtractions.sourceId, slug),
      ),
    );
  if (prior.length) {
    await db.delete(patternExtractions).where(
      inArray(
        patternExtractions.id,
        prior.map((p) => p.id),
      ),
    );
  }

  // 2. Insert an extraction + tags with notes.
  const [ext] = await db
    .insert(patternExtractions)
    .values({ userId: u.id, sourceType: "library", sourceId: slug })
    .returning();
  await db.insert(patternTags).values([
    { extractionId: ext.id, element: "header", note: "love the hairline border" },
    { extractionId: ext.id, element: "typography", note: null },
  ]);

  // 3. Read back and assert the note round-trips.
  const rows = await db
    .select()
    .from(patternTags)
    .where(eq(patternTags.extractionId, ext.id));
  const header = rows.find((r) => r.element === "header");
  console.log("read back:", rows.map((r) => `${r.element}=${r.note ?? "∅"}`).join(", "));
  if (header?.note !== "love the hairline border") {
    throw new Error("note did not round-trip");
  }

  // 4. Clean up.
  await db.delete(patternExtractions).where(eq(patternExtractions.id, ext.id));
  console.log("OK — note column works end to end.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
