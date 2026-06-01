"use server";

import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/dal";
import { db } from "@/lib/db";
import { moodboardItems, projects } from "@/lib/db/schema";

export async function createProject(name: string, description?: string) {
  const user = await requireUser();
  const [project] = await db
    .insert(projects)
    .values({
      userId: user.id,
      name: name.trim() || "Untitled board",
      description: description?.trim() || null,
    })
    .returning();
  redirect(`/projects/${project.id}`);
}

export async function deleteProject(id: string) {
  const user = await requireUser();
  await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, user.id)));
  redirect("/projects");
}

async function assertOwnedProject(projectId: string, userId: string) {
  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
  });
  if (!project) throw new Error("Board not found");
  return project;
}

export async function addUrlItem(
  projectId: string,
  sourceUrl: string,
  note?: string,
) {
  const user = await requireUser();
  await assertOwnedProject(projectId, user.id);
  const url = sourceUrl.trim();
  if (!url) throw new Error("Enter a URL.");

  const [{ max }] = await db
    .select({ max: sql<number>`coalesce(max(${moodboardItems.sortOrder}), -1)` })
    .from(moodboardItems)
    .where(eq(moodboardItems.projectId, projectId));

  await db.insert(moodboardItems).values({
    projectId,
    userId: user.id,
    type: "url",
    sourceUrl: url,
    note: note?.trim() || null,
    sortOrder: max + 1,
  });
  revalidatePath(`/projects/${projectId}`);
}

export async function addNoteItem(projectId: string, note: string) {
  const user = await requireUser();
  await assertOwnedProject(projectId, user.id);
  const text = note.trim();
  if (!text) throw new Error("Write a note.");

  const [{ max }] = await db
    .select({ max: sql<number>`coalesce(max(${moodboardItems.sortOrder}), -1)` })
    .from(moodboardItems)
    .where(eq(moodboardItems.projectId, projectId));

  await db.insert(moodboardItems).values({
    projectId,
    userId: user.id,
    type: "note",
    note: text,
    sortOrder: max + 1,
  });
  revalidatePath(`/projects/${projectId}`);
}

export async function deleteItem(projectId: string, itemId: string) {
  const user = await requireUser();
  await assertOwnedProject(projectId, user.id);
  await db
    .delete(moodboardItems)
    .where(
      and(eq(moodboardItems.id, itemId), eq(moodboardItems.projectId, projectId)),
    );
  revalidatePath(`/projects/${projectId}`);
}
