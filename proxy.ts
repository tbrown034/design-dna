import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

// Optimistic, cheap cookie-presence check only (Next.js 16 proxy runs on the
// nodejs runtime). The authoritative `auth()` check happens in the (app)
// layout and in every Server Action via requireUser().
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/saved/:path*",
    "/mixes/:path*",
    "/profiles/:path*",
    "/prompts/:path*",
    "/projects/:path*",
    "/analyze/:path*",
    "/taste/:path*",
  ],
};
