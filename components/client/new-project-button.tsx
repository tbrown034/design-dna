"use client";

import { useState, useTransition } from "react";
import { createProject } from "@/lib/actions/moodboard";

export function NewProjectButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [pending, startTransition] = useTransition();

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-accent"
      >
        New board
      </button>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          try {
            await createProject(name, desc);
          } catch (err) {
            if (err && typeof err === "object" && "digest" in err) throw err;
          }
        });
      }}
      className="w-full max-w-md rounded-2xl border border-line bg-paper-raised p-5"
    >
      <label className="block">
        <span className="eyebrow">Board name</span>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Fintech redesign"
          className="mt-1.5 w-full rounded-lg border border-line-strong bg-paper px-3 py-2.5 outline-none focus:border-ink"
        />
      </label>
      <label className="mt-3 block">
        <span className="eyebrow">Description (optional)</span>
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line-strong bg-paper px-3 py-2.5 outline-none focus:border-ink"
        />
      </label>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending || !name.trim()}
          className="rounded-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-accent disabled:opacity-60"
        >
          {pending ? "Creating" : "Create board"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-muted hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
