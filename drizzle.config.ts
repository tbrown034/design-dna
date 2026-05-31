import { defineConfig } from "drizzle-kit";

// Load env from .env.local (Node 22+ built-in; Next loads it automatically at
// runtime, but drizzle-kit runs standalone).
try {
  process.loadEnvFile(".env.local");
} catch {
  // .env.local may be absent in CI — env vars can come from the environment.
}

const url =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? "";

export default defineConfig({
  schema: "./lib/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
});
