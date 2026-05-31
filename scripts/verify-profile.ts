// Verifies DNA profile storage: jsonb profile round-trip + per-tool prompts +
// relational read-back. Uses a fake profile (OpenAI path verified separately in
// verify-ai.ts) to avoid an extra API call.
// Run with: pnpm tsx scripts/verify-profile.ts
process.loadEnvFile(".env.local");

import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { buildToolPrompt, PROMPT_TOOLS } from "../lib/ai/prompts";
import type { DnaProfile } from "../lib/ai/schemas";
import * as schema from "../lib/db/schema";
import { dnaProfiles, generatedPrompts, mixes, user } from "../lib/db/schema";

const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

const fakeProfile: DnaProfile = {
  title: "Editorial Precision",
  summary: "A serif-led, dense yet calm fintech aesthetic.",
  visualStyle: "Warm paper, serif headlines, restrained accent.",
  interactionPhilosophy: "Fast, quiet, keyboard-friendly.",
  hierarchy: "Strong headline ladder, measured columns.",
  tone: "Authoritative but plain-spoken.",
  principles: ["Lead with type", "Reserve color for signal"],
  doList: ["Use a real type scale"],
  dontList: ["Avoid gratuitous gradients"],
};

async function main() {
  const [u] = await db.select().from(user).limit(1);
  if (!u) throw new Error("No user — sign in first.");

  const [mix] = await db
    .insert(mixes)
    .values({ userId: u.id, name: "Profile verify mix", mode: "weighted" })
    .returning();

  const [profileRow] = await db
    .insert(dnaProfiles)
    .values({
      userId: u.id,
      mixId: mix.id,
      title: fakeProfile.title,
      status: "complete",
      profile: fakeProfile,
      model: "test",
      inputTokens: 1,
      outputTokens: 1,
    })
    .returning();

  await db.insert(generatedPrompts).values(
    PROMPT_TOOLS.map((t) => ({
      userId: u.id,
      dnaProfileId: profileRow.id,
      tool: t.value,
      content: buildToolPrompt(fakeProfile, t.value, mix.name),
    })),
  );

  const loaded = await db.query.dnaProfiles.findFirst({
    where: eq(dnaProfiles.id, profileRow.id),
    with: { prompts: true },
  });

  const stored = loaded?.profile as DnaProfile | undefined;
  console.log("title round-trip:", stored?.title);
  console.log("principles round-trip:", stored?.principles.length);
  console.log("prompt count:", loaded?.prompts.length);
  console.log(
    "claude prompt starts:",
    loaded?.prompts.find((p) => p.tool === "claude")?.content.slice(0, 40),
  );

  // Cleanup (cascade removes profile + prompts)
  await db.delete(mixes).where(eq(mixes.id, mix.id));
  await db.delete(dnaProfiles).where(eq(dnaProfiles.id, profileRow.id));
  const leftover = await db
    .select()
    .from(generatedPrompts)
    .where(eq(generatedPrompts.dnaProfileId, profileRow.id));
  console.log("prompts after delete (should be 0):", leftover.length);

  if (
    stored?.title !== fakeProfile.title ||
    loaded?.prompts.length !== PROMPT_TOOLS.length ||
    leftover.length !== 0
  ) {
    throw new Error("verification failed");
  }
  console.log("OK — profile jsonb + prompts + cascade verified");
}

main().catch((e) => {
  console.error("FAILED:", e?.message ?? e);
  process.exit(1);
});
