import { z } from "zod";

export const TasteProfileSchema = z.object({
  headline: z
    .string()
    .describe("A short, evocative name for this person's design taste (3-6 words)."),
  summary: z
    .string()
    .describe("One paragraph describing their overall design tendencies."),
  tendencies: z
    .array(z.string())
    .describe("4-6 specific patterns you notice in what they save and tag."),
  blindSpots: z
    .array(z.string())
    .describe("2-4 directions they rarely explore, framed as gentle suggestions."),
  signatureWords: z
    .array(z.string())
    .describe("5-8 single adjectives that capture their taste."),
});

export type TasteProfileData = z.infer<typeof TasteProfileSchema>;
