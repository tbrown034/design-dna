// One-off verification of the save write-path against Neon. Exercises the same
// DB operations toggleSave() runs: insert, read-back, unique-constraint, delete.
// Run with: pnpm tsx scripts/verify-save.ts
process.loadEnvFile(".env.local");

import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { getEntry } from "../data/library";
import * as schema from "../lib/db/schema";
import { savedItems, user } from "../lib/db/schema";

const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

async function main() {
  const [u] = await db.select().from(user).limit(1);
  if (!u) throw new Error("No user in DB — sign up first.");
  console.log("user:", u.email, u.id);

  const slug = "linear";
  const entry = getEntry(slug);
  if (!entry) throw new Error("seed lookup failed");

  // Clean any prior state for an idempotent run.
  await db
    .delete(savedItems)
    .where(and(eq(savedItems.userId, u.id), eq(savedItems.librarySlug, slug)));

  // Insert (the "save" branch).
  await db
    .insert(savedItems)
    .values({ userId: u.id, librarySlug: slug, kind: entry.kind });
  console.log("inserted save for", slug);

  // Read back (the /saved query path).
  const saved = await db
    .select()
    .from(savedItems)
    .where(eq(savedItems.userId, u.id));
  console.log(
    "saved slugs:",
    saved.map((s) => `${s.librarySlug}(${s.kind})`).join(", "),
  );

  // Unique constraint must reject a duplicate save.
  let rejected = false;
  try {
    await db
      .insert(savedItems)
      .values({ userId: u.id, librarySlug: slug, kind: entry.kind });
  } catch {
    rejected = true;
  }
  console.log("duplicate rejected by unique index:", rejected);

  // Cleanup (the "unsave" branch).
  await db
    .delete(savedItems)
    .where(and(eq(savedItems.userId, u.id), eq(savedItems.librarySlug, slug)));
  const after = await db
    .select()
    .from(savedItems)
    .where(
      and(eq(savedItems.userId, u.id), eq(savedItems.librarySlug, slug)),
    );
  console.log("after unsave, rows for slug:", after.length);

  if (!rejected || after.length !== 0) {
    throw new Error("verification failed");
  }
  console.log("OK — save/unsave/unique all verified");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
