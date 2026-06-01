import type { LibraryEntry } from "@/data/library";

export type PreviewStyle = {
  bg: string;
  surface: string;
  fg: string;
  muted: string;
  accent: string;
  font: "serif" | "sans" | "mono";
  radius: string;
  border: string;
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function saturation(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255) as [
    number,
    number,
    number,
  ];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === 0) return 0;
  return (max - min) / max;
}

function mix(hex: string, target: number, amount: number): string {
  // Blend toward black (target 0) or white (target 255) by amount [0..1].
  const [r, g, b] = hexToRgb(hex);
  const t = target;
  const f = (c: number) => Math.round(c + (t - c) * amount);
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}

// Derive a believable preview palette + feel from an entry's own data so we
// don't have to hand-author a mock for all 36 entries.
export function previewStyle(entry: LibraryEntry): PreviewStyle {
  const text = (entry.typography + " " + entry.tags.join(" ")).toLowerCase();

  const font: PreviewStyle["font"] = /serif/.test(text)
    ? "serif"
    : /mono|terminal|hacker|code/.test(text)
      ? "mono"
      : "sans";

  const tags = new Set(entry.tags.map((t) => t.toLowerCase()));
  const sharp =
    tags.has("raw") ||
    tags.has("grid") ||
    tags.has("objective") ||
    tags.has("anti-design") ||
    /brutal|swiss/.test(entry.slug);
  const rounded =
    tags.has("rounded") ||
    tags.has("friendly") ||
    tags.has("playful") ||
    tags.has("fun");

  const radius = sharp ? "0px" : rounded ? "14px" : "8px";
  const isDark = tags.has("dark") || tags.has("neon") || tags.has("developer");

  const sorted = [...entry.palette];
  const lightest = sorted.reduce((a, b) =>
    luminance(a.hex) >= luminance(b.hex) ? a : b,
  );
  const darkest = sorted.reduce((a, b) =>
    luminance(a.hex) <= luminance(b.hex) ? a : b,
  );
  const accent = sorted.reduce((a, b) =>
    saturation(a.hex) >= saturation(b.hex) ? a : b,
  );

  const bg = isDark ? darkest.hex : lightest.hex;
  const fg = isDark ? lightest.hex : darkest.hex;

  return {
    bg,
    surface: mix(bg, isDark ? 255 : 0, 0.05),
    fg,
    muted: mix(fg, isDark ? 0 : 255, 0.45),
    accent: accent.hex,
    font,
    radius,
    border: sharp ? "2px" : "1px",
  };
}
