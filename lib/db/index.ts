import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// neon-http: stateless HTTP driver — correct for serverless (no pool to leak).
// Better Auth's drizzle adapter does not use transactions, so HTTP is safe here.
const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });
