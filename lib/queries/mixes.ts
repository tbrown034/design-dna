import "server-only";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { mixComponents, mixes } from "@/lib/db/schema";

export async function getMixes(userId: string) {
  return db.query.mixes.findMany({
    where: eq(mixes.userId, userId),
    orderBy: desc(mixes.updatedAt),
    with: { components: { orderBy: asc(mixComponents.sortOrder) } },
  });
}

export async function getMix(userId: string, id: string) {
  return db.query.mixes.findFirst({
    where: and(eq(mixes.id, id), eq(mixes.userId, userId)),
    with: { components: { orderBy: asc(mixComponents.sortOrder) } },
  });
}
