"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { addNoteItem, addUrlItem } from "@/lib/actions/moodboard";

export function BoardComposer({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"url" | "note">("url");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit() {
    setError(null);
    startTransition(async () => {
      try {
        if (mode === "url") {
          await addUrlItem(projectId, url, note);
          setUrl("");
          setNote("");
        } else {
          await addNoteItem(projectId, note);
          setNote("");
        }
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not add.");
      }
    });
  }

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5">
      <div className="flex rounded-lg border border-line-strong p-0.5">
        {(["url", "note"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 rounded-md px-3 py-2 text-sm capitalize transition-colors ${
              mode === m ? "bg-ink text-paper" : "text-muted hover:text-ink"
            }`}
          >
            {m === "url" ? "Link" : "Note"}
          </button>
        ))}
      </div>

      {mode === "url" && (
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://reference-site.com"
          className="mt-3 w-full rounded-lg border border-line-strong bg-paper px-3 py-2.5 outline-none focus:border-ink"
        />
      )}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={mode === "url" ? "Optional note about this link" : "Write a note…"}
        rows={mode === "url" ? 2 : 3}
        className="mt-3 w-full rounded-lg border border-line-strong bg-paper px-3 py-2.5 outline-none focus:border-ink"
      />

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={pending}
          className="rounded-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-accent disabled:opacity-60"
        >
          {pending ? "Adding" : "Add to board"}
        </button>
        {error && (
          <span className="text-sm text-accent" role="alert">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
