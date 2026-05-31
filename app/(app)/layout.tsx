import { Suspense } from "react";
import { AppHeader } from "@/components/app-header";
import { requireUser } from "@/lib/dal";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Cache Components: the auth read (headers()) is dynamic, so it lives inside
  // a <Suspense> boundary. The static shell streams immediately.
  return (
    <div className="flex min-h-dvh flex-col">
      <Suspense fallback={<HeaderSkeleton />}>
        <AuthedShell>{children}</AuthedShell>
      </Suspense>
    </div>
  );
}

async function AuthedShell({ children }: { children: React.ReactNode }) {
  // Authoritative auth gate for the whole authenticated area.
  const user = await requireUser();

  return (
    <>
      <AppHeader name={user.name ?? user.email} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {children}
      </main>
    </>
  );
}

function HeaderSkeleton() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
        <span className="font-serif text-xl tracking-tight text-ink">
          Design DNA
        </span>
      </div>
    </header>
  );
}
