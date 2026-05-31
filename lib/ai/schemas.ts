import { z } from "zod";

// The structured Design DNA profile the model must return. Field descriptions
// double as instructions to the model under structured outputs.
export const DnaProfileSchema = z.object({
  title: z
    .string()
    .describe("A short, evocative name for this design direction (3-5 words)."),
  summary: z
    .string()
    .describe("One tight paragraph capturing the overall feel and intent."),
  visualStyle: z
    .string()
    .describe(
      "Concrete guidance on typography, color, spacing, shape, and texture.",
    ),
  interactionPhilosophy: z
    .string()
    .describe("How it should feel to use: motion, feedback, pacing, restraint."),
  hierarchy: z
    .string()
    .describe("How information is prioritized and structured on the page."),
  tone: z
    .string()
    .describe("The voice and personality of copy and microcopy."),
  principles: z
    .array(z.string())
    .describe("4-7 short, actionable design principles."),
  doList: z
    .array(z.string())
    .describe("3-6 specific things to do."),
  dontList: z
    .array(z.string())
    .describe("3-6 specific things to avoid."),
});

export type DnaProfile = z.infer<typeof DnaProfileSchema>;
