"use client";

import { useState, useTransition } from "react";
import { deleteAnalysis } from "@/lib/actions/analyses";

export function DeleteAnalysisButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        Delete
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted">Delete?</span>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => { await deleteAnalysis(id); })}
        className="rounded-full bg-accent px-3 py-1.5 text-paper transition-colors hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Deleting" : "Yes"}
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="text-muted hover:text-ink"
      >
        Cancel
      </button>
    </div>
  );
}
