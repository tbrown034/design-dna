import Link from "next/link";
import { SignOutButton } from "@/components/client/sign-out-button";
import { Logo } from "@/components/logo";

const NAV = [
  { href: "/library", label: "Library" },
  { href: "/saved", label: "Saved" },
  { href: "/mixes", label: "Mixes" },
  { href: "/profiles", label: "Profiles" },
  { href: "/analyze", label: "Analyze" },
  { href: "/projects", label: "Boards" },
  { href: "/taste", label: "Taste" },
];

export function AppHeader({ name }: { name: string }) {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/dashboard">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm sm:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden text-muted sm:inline">{name}</span>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
