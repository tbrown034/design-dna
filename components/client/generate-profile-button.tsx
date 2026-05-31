"use client";

import { useState, useTransition } from "react";
import { generateProfile } from "@/lib/actions/profiles";

export function GenerateProfileButton({ mixId }: { mixId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            try {
              await generateProfile(mixId);
            } catch (e) {
              if (e && typeof e === "object" && "digest" in e) throw e;
              setError(e instanceof Error ? e.message : "Generation failed.");
            }
          });
        }}
        className="rounded-full bg-accent px-5 py-2.5 text-paper transition-colors hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Generating profile…" : "Generate design profile"}
      </button>
      {error && (
        <span className="text-sm text-accent" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
