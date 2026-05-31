export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-24 rounded bg-line" />
      <div className="mt-3 h-10 w-80 max-w-full rounded bg-line" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-2xl border border-line bg-paper-raised" />
        ))}
      </div>
    </div>
  );
}
