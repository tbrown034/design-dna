"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { analyzeUrl, normalizeUrl } from "@/lib/ai/analyze";
import { requireUser } from "@/lib/dal";
import { db } from "@/lib/db";
import { urlAnalyses } from "@/lib/db/schema";

export async function analyze(rawUrl: string) {
  const user = await requireUser();

  let normalized: string;
  try {
    normalized = normalizeUrl(rawUrl);
  } catch {
    throw new Error("That doesn't look like a valid URL.");
  }

  const [row] = await db
    .insert(urlAnalyses)
    .values({
      userId: user.id,
      url: rawUrl.trim(),
      normalizedUrl: normalized,
      status: "processing",
    })
    .returning();

  try {
    const { analysis, model, inputTokens, outputTokens } =
      await analyzeUrl(normalized);
    await db
      .update(urlAnalyses)
      .set({
        status: "complete",
        analysis,
        model,
        inputTokens,
        outputTokens,
        completedAt: new Date(),
      })
      .where(eq(urlAnalyses.id, row.id));
  } catch (e) {
    await db
      .update(urlAnalyses)
      .set({
        status: "failed",
        errorMessage:
          e instanceof Error ? e.message : "Could not analyze that site.",
        completedAt: new Date(),
      })
      .where(eq(urlAnalyses.id, row.id));
  }

  redirect(`/analyze/${row.id}`);
}

export async function deleteAnalysis(id: string) {
  const user = await requireUser();
  await db
    .delete(urlAnalyses)
    .where(and(eq(urlAnalyses.id, id), eq(urlAnalyses.userId, user.id)));
  redirect("/analyze");
}
