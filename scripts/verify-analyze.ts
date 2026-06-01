// Live end-to-end test of the URL analyzer: real fetch + OpenAI structured
// output. One cheap call. Run with: pnpm tsx scripts/verify-analyze.ts
process.loadEnvFile(".env.local");

import { analyzeUrl, normalizeUrl } from "../lib/ai/analyze";

async function main() {
  const url = normalizeUrl("stripe.com");
  console.log("analyzing:", url);
  const { analysis, model, inputTokens, outputTokens } = await analyzeUrl(url);
  console.log("model:", model, "| tokens:", inputTokens, "/", outputTokens);
  console.log("overview:", analysis.overview.slice(0, 160), "...");
  console.log("closest styles:", analysis.closestStyles.join(", "));
  console.log("takeaways:", analysis.takeaways.length);
  if (!analysis.overview || analysis.takeaways.length === 0) {
    throw new Error("empty analysis");
  }
  console.log("OK — live URL analysis works end to end");
}

main().catch((e) => {
  console.error("FAILED:", e?.message ?? e);
  process.exit(1);
});
