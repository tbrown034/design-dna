"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export function AuthNav() {
  const { data, isPending } = useSession();

  if (isPending) {
    return <span className="w-16 text-right text-muted">·</span>;
  }

  if (data?.user) {
    return (
      <Link
        href="/dashboard"
        className="rounded-full bg-ink px-4 py-1.5 text-paper transition-colors hover:bg-accent"
      >
        Dashboard
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-full border border-line-strong px-4 py-1.5 text-ink transition-colors hover:border-ink"
    >
      Sign in
    </Link>
  );
}
