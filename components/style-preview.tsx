import type { LibraryEntry } from "@/data/library";
import { previewStyle } from "@/lib/preview";

const FONT_STACK: Record<string, string> = {
  serif: "var(--font-fraunces), Georgia, serif",
  sans: "var(--font-geist-sans), system-ui, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, monospace",
};

// A small, self-contained mock UI rendered in the entry's own colors, type,
// and shape — so the detail page shows the aesthetic, not just describes it.
export function StylePreview({ entry }: { entry: LibraryEntry }) {
  const s = previewStyle(entry);
  const font = FONT_STACK[s.font];

  return (
    <div
      className="overflow-hidden"
      style={{
        background: s.bg,
        color: s.fg,
        borderRadius: s.radius,
        border: `${s.border} solid ${s.muted}`,
        fontFamily: font,
      }}
    >
      {/* mock header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `${s.border} solid ${s.muted}` }}
      >
        <span style={{ fontWeight: 600, fontSize: 13 }}>{entry.name}</span>
        <span style={{ display: "flex", gap: 14, fontSize: 11, color: s.muted }}>
          <span>Work</span>
          <span>About</span>
          <span>Contact</span>
        </span>
      </div>

      {/* mock body */}
      <div className="px-4 py-5">
        <div style={{ fontSize: 11, letterSpacing: "0.1em", color: s.accent }}>
          {entry.kind === "influence" ? "BRAND" : "STYLE"}
        </div>
        <div
          style={{
            fontSize: 26,
            lineHeight: 1.05,
            marginTop: 6,
            fontWeight: s.font === "serif" ? 500 : 700,
            letterSpacing: s.font === "sans" ? "-0.02em" : "0",
          }}
        >
          The quick brown fox
        </div>
        <p style={{ fontSize: 12, color: s.muted, marginTop: 8, maxWidth: 360 }}>
          A preview rendered in this aesthetic — its colors, type, and shape.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span
            style={{
              background: s.accent,
              color: s.bg,
              fontSize: 12,
              padding: "7px 14px",
              borderRadius: s.radius,
              fontWeight: 600,
            }}
          >
            Primary
          </span>
          <span
            style={{
              border: `${s.border} solid ${s.fg}`,
              color: s.fg,
              fontSize: 12,
              padding: "7px 14px",
              borderRadius: s.radius,
            }}
          >
            Secondary
          </span>
        </div>

        {/* mock card row */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {entry.palette.slice(0, 3).map((sw, i) => (
            <div
              key={i}
              style={{
                background: s.surface,
                borderRadius: s.radius,
                border: `${s.border} solid ${s.muted}`,
                padding: 10,
              }}
            >
              <div
                style={{
                  height: 22,
                  borderRadius: Number.parseInt(s.radius) > 0 ? 6 : 0,
                  background: sw.hex,
                }}
              />
              <div style={{ fontSize: 10, color: s.muted, marginTop: 6 }}>
                {sw.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
