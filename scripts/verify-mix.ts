// Verifies the Mix & Match write-path against Neon: create mix + components,
// read back via the relational query, update weights, delete (cascade).
// Run with: pnpm tsx scripts/verify-mix.ts
process.loadEnvFile(".env.local");

import { neon } from "@neondatabase/serverless";
import { and, asc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/db/schema";
import { mixComponents, mixes, user } from "../lib/db/schema";

const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

async function main() {
  const [u] = await db.select().from(user).limit(1);
  if (!u) throw new Error("No user — sign in first.");

  // Create
  const [mix] = await db
    .insert(mixes)
    .values({ userId: u.id, name: "Verify mix", mode: "weighted" })
    .returning();
  await db.insert(mixComponents).values([
    { mixId: mix.id, librarySlug: "financial-times", weight: 70, sortOrder: 0 },
    { mixId: mix.id, librarySlug: "apple", weight: 30, sortOrder: 1 },
  ]);
  console.log("created mix", mix.id);

  // Read back via relational query (the /mixes/[id] path)
  const loaded = await db.query.mixes.findFirst({
    where: and(eq(mixes.id, mix.id), eq(mixes.userId, u.id)),
    with: { components: { orderBy: asc(mixComponents.sortOrder) } },
  });
  const total = (loaded?.components ?? []).reduce(
    (a, c) => a + (c.weight ?? 0),
    0,
  );
  console.log(
    "loaded:",
    loaded?.components.map((c) => `${c.librarySlug}=${c.weight}%`).join(", "),
    "total",
    total,
  );

  // Update a weight + focus
  const first = loaded!.components[0];
  await db
    .update(mixComponents)
    .set({ weight: 60, patternFocus: "typography" })
    .where(eq(mixComponents.id, first.id));
  const [updated] = await db
    .select()
    .from(mixComponents)
    .where(eq(mixComponents.id, first.id));
  console.log("updated:", updated.weight, updated.patternFocus);

  // Delete mix → components cascade
  await db.delete(mixes).where(eq(mixes.id, mix.id));
  const leftover = await db
    .select()
    .from(mixComponents)
    .where(eq(mixComponents.mixId, mix.id));
  console.log("components after delete (should be 0):", leftover.length);

  if (total !== 100 || updated.weight !== 60 || leftover.length !== 0) {
    throw new Error("verification failed");
  }
  console.log("OK — mix create/read/update/delete + cascade verified");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
