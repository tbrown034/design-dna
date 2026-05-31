import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { dnaProfiles } from "@/lib/db/schema";

export async function getProfiles(userId: string) {
  return db.query.dnaProfiles.findMany({
    where: eq(dnaProfiles.userId, userId),
    orderBy: desc(dnaProfiles.createdAt),
  });
}

export async function getProfile(userId: string, id: string) {
  return db.query.dnaProfiles.findFirst({
    where: and(eq(dnaProfiles.id, id), eq(dnaProfiles.userId, userId)),
    with: { prompts: true },
  });
}
