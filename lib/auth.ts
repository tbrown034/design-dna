import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import { account, session, user, verification } from "@/lib/db/schema/auth";

// Allowlist: only these emails may create an account / sign in. Defaults to the
// owner; override with a comma-separated ALLOWED_EMAILS env var.
const ALLOWED_EMAILS = (
  process.env.ALLOWED_EMAILS ?? "trevorbrown.web@gmail.com"
)
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  databaseHooks: {
    user: {
      create: {
        // Block any non-allowlisted email before a user record is created.
        // Since accounts can't be created for other emails, they can never
        // get a session — this enforces the allowlist.
        before: async (newUser) => {
          if (!ALLOWED_EMAILS.includes(newUser.email.toLowerCase())) {
            throw new APIError("FORBIDDEN", {
              message: "This app is private. Your account is not on the allowlist.",
            });
          }
          return { data: newUser };
        },
      },
    },
  },
  // nextCookies() must be the last plugin so Server Actions can set cookies.
  plugins: [nextCookies()],
});
