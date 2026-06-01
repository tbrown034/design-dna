import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { tasteProfiles } from "@/lib/db/schema";

export async function getTasteProfile(userId: string) {
  return db.query.tasteProfiles.findFirst({
    where: eq(tasteProfiles.userId, userId),
  });
}
