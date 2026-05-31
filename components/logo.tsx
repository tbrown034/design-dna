// Design DNA mark: stacked, weighted bars with end-nodes — a nod to the
// product's core idea (blending influences with weights, e.g. 70/20/10).
// Colors use the theme CSS variables so the mark adapts to context.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Design DNA"
      fill="none"
    >
      <rect x="4" y="8" width="16" height="3.4" rx="1.7" fill="var(--color-ink)" />
      <rect x="4" y="14.3" width="9" height="3.4" rx="1.7" fill="var(--color-accent)" />
      <rect x="4" y="20.6" width="13" height="3.4" rx="1.7" fill="var(--color-ink)" />
      <circle cx="22.5" cy="9.7" r="2" fill="var(--color-ink)" />
      <circle cx="15.5" cy="16" r="2" fill="var(--color-accent)" />
      <circle cx="19.5" cy="22.3" r="2" fill="var(--color-ink)" />
    </svg>
  );
}

export function Logo({
  className,
  markClassName = "h-6 w-6",
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <LogoMark className={markClassName} />
      <span className="font-serif text-xl tracking-tight text-ink">
        Design DNA
      </span>
    </span>
  );
}
