"use client";

import { useState, useTransition } from "react";
import { analyze } from "@/lib/actions/analyses";

export function AnalyzeForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        startTransition(async () => {
          try {
            await analyze(url);
          } catch (err) {
            if (err && typeof err === "object" && "digest" in err) throw err;
            setError(err instanceof Error ? err.message : "Failed.");
          }
        });
      }}
      className="mt-8"
    >
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="paste any website URL, e.g. stripe.com"
          className="min-w-64 flex-1 rounded-lg border border-line-strong bg-paper-raised px-3 py-2.5 outline-none focus:border-ink"
        />
        <button
          type="submit"
          disabled={pending || !url.trim()}
          className="rounded-full bg-ink px-6 py-2.5 text-paper transition-colors hover:bg-accent disabled:opacity-60"
        >
          {pending ? "Analyzing…" : "Analyze"}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-accent" role="alert">
          {error}
        </p>
      )}
      <p className="mt-3 text-xs text-muted">
        Reads the page&apos;s public markup (headings, colors, fonts, structure)
        and describes its design language. Best on your own reference sites.
      </p>
    </form>
  );
}
