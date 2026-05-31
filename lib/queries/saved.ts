import "server-only";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { savedItems } from "@/lib/db/schema";

export async function getSavedSlugs(userId: string): Promise<string[]> {
  const rows = await db
    .select({ slug: savedItems.librarySlug })
    .from(savedItems)
    .where(eq(savedItems.userId, userId));
  return rows.map((r) => r.slug);
}

export async function getSavedItems(userId: string) {
  return db
    .select()
    .from(savedItems)
    .where(eq(savedItems.userId, userId))
    .orderBy(desc(savedItems.createdAt));
}
