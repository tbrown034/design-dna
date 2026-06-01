# Development Log

A chronological record of development sessions and significant changes.

---

## 2026-05-31 - Initial build: Design DNA from scratch to live

**Session Summary:**
- Built the entire Design DNA app from a fresh create-next-app scaffold to a fully deployed, live product at design-dna-gamma.vercel.app.
- Stack: Next.js 16.2.6 (App Router, cacheComponents), React 19.2, Tailwind v4, TypeScript strict, pnpm, Neon Postgres + Drizzle, Better Auth (Google-only), OpenAI (gpt-4o-mini).
- Shipped all planned feature areas across phases, verified each against the real DB and live OpenAI, and deployed to production via main.

**Key decisions made:**
- Auth: switched from the originally-planned Auth.js to **Better Auth** mid-build (user request); **Google-only** sign-in with a single-email allowlist (trevorbrown.web@gmail.com) enforced in `databaseHooks.user.create.before`.
- AI: switched from Anthropic to **OpenAI** (user request, cost-minimal — default gpt-4o-mini, structured outputs via zodResponseFormat).
- Curated library is **static TS seed** (`data/library/`), not DB rows; user saves reference entries by `librarySlug` string, validated on write.
- URL analysis built **text-based** (fetch public HTML, extract headings/colors/fonts/classes -> OpenAI) instead of screenshot/vision, since no ScreenshotOne/Blob keys were provided.
- Mood board does links + notes now; image upload is gated behind `BLOB_READ_WRITE_TOKEN` via `lib/blob.ts` (dormant until a token exists).
- DB driver: `drizzle-orm/neon-http` (stateless HTTP, serverless-safe). Pinned `kysely@0.28.17` — Better Auth's bundled kysely-adapter breaks on 0.29 (missing `DEFAULT_MIGRATION_LOCK_TABLE` export).

**Features shipped (all live):**
- Design Library (36 entries: 20 styles + 16 influences) with browse, save, and per-entry **rendered style preview** (mock UI in the entry's own colors/type/shape via `lib/preview.ts`) + real-world example links.
- Pattern Extraction (tag liked elements per saved entry).
- Mix & Match (weighted/additive, per-component weight + pattern focus).
- Design DNA Profile (OpenAI structured output) + deterministic per-tool prompts (Claude/ChatGPT/Cursor/v0/generic).
- Live URL Design Analysis (text-based).
- Mood Boards (projects + URL/note items).
- Personal Taste Profile (OpenAI, aggregates saves/tags/mixes; one row per user, upsert).

**Notable Changes:**
- `cacheComponents: true` — every dynamic subtree wrapped in `<Suspense>`; library routes use `use cache` + `cacheLife('max')` and prerender (36 static slug pages). Note: `dynamicParams = false` is incompatible with cacheComponents, so invalid slugs render the not-found UI at a 200 shell status.
- Server Actions auth-guard via `requireUser()` in `lib/dal.ts`; ownership checks on every mutation.
- Site audit (live, via Chrome at desktop + mobile): all pages render clean, zero console errors. Fixed 3 issues — scrollable mobile nav for logged-in users (was stranded under sm), `prefers-reduced-motion` guard, and `theme-color`.
- Verification scripts in `scripts/verify-*.ts` (run with pnpm tsx; each builds its own Neon connection / inlines logic to dodge `server-only` imports). DB write-paths and live OpenAI calls all pass.

**Outstanding / follow-ups:**
- Google OAuth redirect for production is registered; consent screen must list the allowlisted email as a test user if in Testing mode.
- Two library styles (terminal-hacker, skeuomorphic) intentionally have no example links yet (no fabrication).
- Signed-in screens not visually verified in-browser (requires Google login, which the agent cannot perform).
- Mood board image upload activates when a Vercel Blob token is added (no code change needed).

---
