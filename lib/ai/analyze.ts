import "server-only";
import { zodResponseFormat } from "openai/helpers/zod";
import { AI_MODEL, openai } from "./client";
import { UrlAnalysisSchema, type UrlAnalysisData } from "./analyze-schema";

export function normalizeUrl(input: string): string {
  let u = input.trim();
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
  const parsed = new URL(u); // throws on invalid — caller handles
  parsed.hash = "";
  return parsed.toString().replace(/\/$/, "");
}

// Fetch a page and reduce it to a compact, text-only design brief: title,
// meta, headings, link labels, inline styles, and a sample of class names.
// No screenshot service needed; safe-ish since we only read public HTML.
async function fetchPageContext(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DesignDNA/1.0; +https://design-dna-gamma.vercel.app)",
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error(`Site returned ${res.status}.`);
  const html = await res.text();

  const pick = (re: RegExp, n = 30) =>
    [...html.matchAll(re)].slice(0, n).map((m) => m[1].trim()).filter(Boolean);

  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
  const desc =
    html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
    )?.[1] ?? "";
  const headings = pick(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi).map((h) =>
    h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
  const links = pick(/<a[^>]*>([\s\S]*?)<\/a>/gi, 40).map((a) =>
    a.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
  const classes = [
    ...new Set(pick(/class=["']([^"']+)["']/gi, 120).join(" ").split(/\s+/)),
  ]
    .slice(0, 120)
    .join(" ");
  const colors = [
    ...new Set(pick(/(#[0-9a-fA-F]{3,8})/g, 200)),
  ].slice(0, 40);
  const fonts = [
    ...new Set(pick(/font-family:\s*([^;"'}]+)/gi, 30)),
  ].slice(0, 12);

  return `URL: ${url}
Title: ${title}
Description: ${desc}
Headings: ${headings.slice(0, 20).join(" | ")}
Nav/link labels: ${links.slice(0, 30).join(" | ")}
Detected colors: ${colors.join(", ")}
Detected font-families: ${fonts.join(" ; ")}
Sample class names: ${classes}`;
}

const SYSTEM = `You are a design analyst. From a structured summary of a web page's markup (title, headings, navigation labels, detected colors, fonts, and class names), infer the site's design language. Be concrete and grounded in the evidence provided; do not invent details you cannot support. When unsure, hedge honestly. Reference well-known design styles by name where apt.`;

export async function analyzeUrl(url: string): Promise<{
  analysis: UrlAnalysisData;
  model: string;
  inputTokens: number;
  outputTokens: number;
}> {
  const context = await fetchPageContext(url);

  const completion = await openai.chat.completions.parse({
    model: AI_MODEL,
    temperature: 0.5,
    max_completion_tokens: 1100,
    response_format: zodResponseFormat(UrlAnalysisSchema, "url_analysis"),
    messages: [
      { role: "system", content: SYSTEM },
      {
        role: "user",
        content: `Analyze the design of this page from its markup summary:\n\n${context}`,
      },
    ],
  });

  const analysis = completion.choices[0]?.message.parsed;
  if (!analysis) throw new Error("The model did not return an analysis.");

  return {
    analysis,
    model: AI_MODEL,
    inputTokens: completion.usage?.prompt_tokens ?? 0,
    outputTokens: completion.usage?.completion_tokens ?? 0,
  };
}
