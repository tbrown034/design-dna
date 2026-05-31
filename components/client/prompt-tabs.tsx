"use client";

import { useState } from "react";
import { CopyButton } from "./copy-button";

export type PromptItem = { tool: string; label: string; content: string };

export function PromptTabs({ prompts }: { prompts: PromptItem[] }) {
  const [active, setActive] = useState(prompts[0]?.tool ?? "");
  const current = prompts.find((p) => p.tool === active) ?? prompts[0];

  if (!current) return null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {prompts.map((p) => (
          <button
            key={p.tool}
            type="button"
            onClick={() => setActive(p.tool)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              p.tool === active
                ? "bg-ink text-paper"
                : "border border-line-strong text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-paper-raised">
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <span className="font-mono text-xs text-muted">
            Prompt for {current.label}
          </span>
          <CopyButton text={current.content} label="Copy prompt" />
        </div>
        <pre className="max-h-[28rem] overflow-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed text-ink">
          {current.content}
        </pre>
      </div>
    </div>
  );
}
