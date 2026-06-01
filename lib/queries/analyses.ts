import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { urlAnalyses } from "@/lib/db/schema";

export async function getAnalyses(userId: string) {
  return db
    .select()
    .from(urlAnalyses)
    .where(eq(urlAnalyses.userId, userId))
    .orderBy(desc(urlAnalyses.createdAt));
}

export async function getAnalysis(userId: string, id: string) {
  return db.query.urlAnalyses.findFirst({
    where: and(eq(urlAnalyses.id, id), eq(urlAnalyses.userId, userId)),
  });
}
