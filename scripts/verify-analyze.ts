// Live end-to-end test of the URL analyzer logic: real fetch + OpenAI
// structured output. Inlines the pipeline to avoid importing server-only
// modules. One cheap call. Run with: pnpm tsx scripts/verify-analyze.ts
process.loadEnvFile(".env.local");

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { UrlAnalysisSchema } from "../lib/ai/analyze-schema";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

async function fetchContext(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; DesignDNA/1.0)" },
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error(`Site returned ${res.status}`);
  const html = await res.text();
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? "";
  const colors = [...new Set([...html.matchAll(/(#[0-9a-fA-F]{3,8})/g)].map((m) => m[1]))].slice(0, 30);
  const headings = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)]
    .slice(0, 15)
    .map((m) => m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  return `URL: ${url}\nTitle: ${title}\nHeadings: ${headings.join(" | ")}\nColors: ${colors.join(", ")}`;
}

async function main() {
  const url = "https://stripe.com";
  console.log("analyzing:", url);
  const context = await fetchContext(url);
  const completion = await openai.chat.completions.parse({
    model,
    temperature: 0.5,
    max_completion_tokens: 1100,
    response_format: zodResponseFormat(UrlAnalysisSchema, "url_analysis"),
    messages: [
      { role: "system", content: "You are a design analyst. Infer the site's design language from its markup summary. Be concrete." },
      { role: "user", content: `Analyze:\n\n${context}` },
    ],
  });
  const analysis = completion.choices[0]?.message.parsed;
  if (!analysis) throw new Error("empty analysis");
  console.log("model:", model, "| tokens:", completion.usage?.prompt_tokens, "/", completion.usage?.completion_tokens);
  console.log("overview:", analysis.overview.slice(0, 150), "...");
  console.log("closest styles:", analysis.closestStyles.join(", "));
  console.log("takeaways:", analysis.takeaways.length);
  if (!analysis.overview || analysis.takeaways.length === 0) throw new Error("incomplete");
  console.log("OK — live URL analysis works end to end");
}

main().catch((e) => {
  console.error("FAILED:", e?.message ?? e);
  process.exit(1);
});
