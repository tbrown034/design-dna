"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // clipboard may be unavailable; ignore
        }
      }}
      className={
        className ??
        "rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:border-ink"
      }
    >
      {copied ? "Copied" : label}
    </button>
  );
}
