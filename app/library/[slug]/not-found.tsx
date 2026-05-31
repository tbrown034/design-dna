import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="eyebrow">Not found</p>
      <h1 className="mt-2 font-serif text-3xl tracking-tight">
        That influence isn&apos;t in the library.
      </h1>
      <p className="mt-3 text-muted">It may have been renamed or removed.</p>
      <Link
        href="/library"
        className="mt-6 inline-block rounded-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-accent"
      >
        Back to the library
      </Link>
    </div>
  );
}
