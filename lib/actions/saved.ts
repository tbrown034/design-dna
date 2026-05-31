"use server";

import { and, eq } from "drizzle-orm";
import { getEntry } from "@/data/library";
import { requireUser } from "@/lib/dal";
import { db } from "@/lib/db";
import { savedItems } from "@/lib/db/schema";

// Toggle a library item in the user's collection. Server Actions are public
// POST endpoints, so this authenticates and validates the slug against the
// static seed before touching the database.
export async function toggleSave(slug: string): Promise<{ saved: boolean }> {
  const user = await requireUser();

  const entry = getEntry(slug);
  if (!entry) {
    throw new Error(`Unknown library item: ${slug}`);
  }

  const [existing] = await db
    .select({ id: savedItems.id })
    .from(savedItems)
    .where(
      and(eq(savedItems.userId, user.id), eq(savedItems.librarySlug, slug)),
    )
    .limit(1);

  if (existing) {
    await db.delete(savedItems).where(eq(savedItems.id, existing.id));
    return { saved: false };
  }

  await db.insert(savedItems).values({
    userId: user.id,
    librarySlug: slug,
    kind: entry.kind,
  });
  return { saved: true };
}
