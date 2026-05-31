import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import { account, session, user, verification } from "@/lib/db/schema/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  // Email/password works with no external OAuth credentials. Social providers
  // (e.g. Google) can be added under `socialProviders` once creds are set.
  emailAndPassword: {
    enabled: true,
  },
  // nextCookies() must be the last plugin so Server Actions can set cookies.
  plugins: [nextCookies()],
});
