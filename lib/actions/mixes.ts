"use server";

import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getEntry } from "@/data/library";
import { requireUser } from "@/lib/dal";
import { db } from "@/lib/db";
import { mixComponents, mixes } from "@/lib/db/schema";
import type { PatternElement } from "@/lib/patterns";

type Mode = "weighted" | "additive";

// Evenly distribute 100 across n components (remainder to the first few).
function evenWeights(n: number): number[] {
  const base = Math.floor(100 / n);
  const rem = 100 - base * n;
  return Array.from({ length: n }, (_, i) => base + (i < rem ? 1 : 0));
}

async function assertOwnedMix(mixId: string, userId: string) {
  const mix = await db.query.mixes.findFirst({
    where: and(eq(mixes.id, mixId), eq(mixes.userId, userId)),
  });
  if (!mix) throw new Error("Mix not found");
  return mix;
}

export async function createMix(input: {
  name: string;
  mode: Mode;
  slugs: string[];
}) {
  const user = await requireUser();
  const slugs = [...new Set(input.slugs)].filter((s) => getEntry(s));
  if (slugs.length === 0) {
    throw new Error("Pick at least one influence to mix.");
  }

  const [mix] = await db
    .insert(mixes)
    .values({
      userId: user.id,
      name: input.name.trim() || "Untitled mix",
      mode: input.mode,
    })
    .returning();

  const weights = evenWeights(slugs.length);
  await db.insert(mixComponents).values(
    slugs.map((slug, i) => ({
      mixId: mix.id,
      librarySlug: slug,
      weight: input.mode === "weighted" ? weights[i] : null,
      sortOrder: i,
    })),
  );

  redirect(`/mixes/${mix.id}`);
}

export async function updateMixComponents(
  mixId: string,
  updates: { id: string; weight: number | null; patternFocus: PatternElement | null }[],
) {
  const user = await requireUser();
  const mix = await assertOwnedMix(mixId, user.id);

  if (mix.mode === "weighted") {
    const sum = updates.reduce((acc, u) => acc + (u.weight ?? 0), 0);
    if (sum !== 100) {
      throw new Error(`Weights must total 100 (currently ${sum}).`);
    }
  }

  for (const u of updates) {
    await db
      .update(mixComponents)
      .set({
        weight: mix.mode === "weighted" ? u.weight : null,
        patternFocus: u.patternFocus,
      })
      .where(and(eq(mixComponents.id, u.id), eq(mixComponents.mixId, mixId)));
  }
  await db.update(mixes).set({ updatedAt: new Date() }).where(eq(mixes.id, mixId));
  revalidatePath(`/mixes/${mixId}`);
}

export async function removeMixComponent(mixId: string, componentId: string) {
  const user = await requireUser();
  await assertOwnedMix(mixId, user.id);
  await db
    .delete(mixComponents)
    .where(and(eq(mixComponents.id, componentId), eq(mixComponents.mixId, mixId)));
  await db.update(mixes).set({ updatedAt: new Date() }).where(eq(mixes.id, mixId));
  revalidatePath(`/mixes/${mixId}`);
}

export async function addMixComponents(mixId: string, slugs: string[]) {
  const user = await requireUser();
  await assertOwnedMix(mixId, user.id);

  const existing = await db
    .select({ slug: mixComponents.librarySlug })
    .from(mixComponents)
    .where(eq(mixComponents.mixId, mixId));
  const have = new Set(existing.map((e) => e.slug));
  const toAdd = [...new Set(slugs)].filter((s) => getEntry(s) && !have.has(s));
  if (toAdd.length === 0) return;

  const [{ max }] = await db
    .select({ max: sql<number>`coalesce(max(${mixComponents.sortOrder}), -1)` })
    .from(mixComponents)
    .where(eq(mixComponents.mixId, mixId));

  await db.insert(mixComponents).values(
    toAdd.map((slug, i) => ({
      mixId,
      librarySlug: slug,
      weight: null,
      sortOrder: max + 1 + i,
    })),
  );
  await db.update(mixes).set({ updatedAt: new Date() }).where(eq(mixes.id, mixId));
  revalidatePath(`/mixes/${mixId}`);
}

export async function renameMix(mixId: string, name: string) {
  const user = await requireUser();
  await assertOwnedMix(mixId, user.id);
  await db
    .update(mixes)
    .set({ name: name.trim() || "Untitled mix", updatedAt: new Date() })
    .where(eq(mixes.id, mixId));
  revalidatePath(`/mixes/${mixId}`);
}

export async function deleteMix(mixId: string) {
  const user = await requireUser();
  await assertOwnedMix(mixId, user.id);
  await db.delete(mixes).where(eq(mixes.id, mixId));
  redirect("/mixes");
}
