import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Authoritative session read. `headers()` is async in Next.js 16 and is a
// runtime API — callers of this cannot live inside a `use cache` scope.
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

// Guard for authenticated pages and Server Actions. Server Actions are public
// POST endpoints, so every mutation must call this before touching data.
export async function requireUser() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  return session.user;
}
