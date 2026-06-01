"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { generateTaste } from "@/lib/actions/taste";

export function GenerateTasteButton({ hasProfile }: { hasProfile: boolean }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            try {
              await generateTaste();
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Could not analyze.");
            }
          });
        }}
        className="rounded-full bg-accent px-5 py-2.5 text-paper transition-colors hover:opacity-90 disabled:opacity-60"
      >
        {pending
          ? "Reading your taste…"
          : hasProfile
            ? "Re-analyze my taste"
            : "Analyze my taste"}
      </button>
      {error && (
        <span className="text-sm text-accent" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
