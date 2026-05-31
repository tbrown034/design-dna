import { NextResponse } from "next/server";
import { getSession } from "@/lib/dal";
import { getSavedSlugs } from "@/lib/queries/saved";

// Lets the static library page hydrate per-user saved state client-side,
// keeping the catalog itself static.
export async function GET() {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ slugs: [] });
  }
  const slugs = await getSavedSlugs(session.user.id);
  return NextResponse.json({ slugs });
}
