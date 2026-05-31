import { SavedProvider } from "@/components/client/saved-provider";
import { SiteHeader } from "@/components/site-header";

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SavedProvider>
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
          {children}
        </main>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted">
            Design DNA — a taste-transfer tool for design-led builders.
          </div>
        </footer>
      </div>
    </SavedProvider>
  );
}
