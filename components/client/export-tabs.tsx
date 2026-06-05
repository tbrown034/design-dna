"use client";

import { useState } from "react";
import { CopyButton } from "./copy-button";
import { DownloadButton } from "./download-button";

export type ExportItem = {
  format: string;
  label: string;
  filename: string;
  blurb: string;
  content: string;
};

export function ExportTabs({ exports }: { exports: ExportItem[] }) {
  const [active, setActive] = useState(exports[0]?.format ?? "");
  const current = exports.find((e) => e.format === active) ?? exports[0];

  if (!current) return null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {exports.map((e) => (
          <button
            key={e.format}
            type="button"
            onClick={() => setActive(e.format)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              e.format === active
                ? "bg-ink text-paper"
                : "border border-line-strong text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-muted">{current.blurb}</p>

      <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-paper-raised">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2">
          <span className="font-mono text-xs text-muted">{current.filename}</span>
          <div className="flex items-center gap-2">
            <CopyButton
              text={current.content}
              label="Copy"
              className="rounded-full border border-line-strong px-3 py-1.5 text-xs transition-colors hover:border-ink"
            />
            <DownloadButton
              text={current.content}
              filename={current.filename}
              label="Download"
              className="rounded-full border border-line-strong px-3 py-1.5 text-xs transition-colors hover:border-ink"
            />
          </div>
        </div>
        <pre className="max-h-[28rem] overflow-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed text-ink">
          {current.content}
        </pre>
      </div>
    </div>
  );
}
