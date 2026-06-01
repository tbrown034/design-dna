import { z } from "zod";

export const UrlAnalysisSchema = z.object({
  overview: z
    .string()
    .describe("One paragraph on the site's overall design impression."),
  typography: z.string().describe("Observations on type choices and hierarchy."),
  color: z.string().describe("Observations on color usage and palette."),
  spacing: z.string().describe("Observations on spacing, density, and rhythm."),
  navigation: z.string().describe("How navigation and wayfinding are handled."),
  hierarchy: z.string().describe("How visual and information hierarchy works."),
  interaction: z
    .string()
    .describe("Notes on interaction patterns and components evident in the markup."),
  closestStyles: z
    .array(z.string())
    .describe("2-4 of our library style names this most resembles."),
  takeaways: z
    .array(z.string())
    .describe("3-6 borrowable lessons a developer could apply."),
});

export type UrlAnalysisData = z.infer<typeof UrlAnalysisSchema>;
