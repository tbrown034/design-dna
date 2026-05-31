import Link from "next/link";
import { AuthNav } from "@/components/client/auth-nav";
import { Logo } from "@/components/logo";

// Public header for marketing + library. Auth state is resolved client-side
// (AuthNav) so these pages stay static and cacheable.
export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/library"
            className="text-muted transition-colors hover:text-ink"
          >
            Library
          </Link>
          <AuthNav />
        </nav>
      </div>
    </header>
  );
}
