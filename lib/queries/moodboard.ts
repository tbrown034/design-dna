import "server-only";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { moodboardItems, projects } from "@/lib/db/schema";

export async function getProjects(userId: string) {
  return db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.createdAt));
}

export async function getProject(userId: string, id: string) {
  return db.query.projects.findFirst({
    where: and(eq(projects.id, id), eq(projects.userId, userId)),
    with: { items: { orderBy: asc(moodboardItems.sortOrder) } },
  });
}
