"use client";

export function DownloadButton({
  text,
  filename,
  label = "Download",
  className,
}: {
  text: string;
  filename: string;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        const blob = new Blob([text], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }}
      className={
        className ??
        "rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:border-ink"
      }
    >
      {label}
    </button>
  );
}
