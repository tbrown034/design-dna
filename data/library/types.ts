export type LibraryKind = "style" | "influence";

export type Swatch = {
  name: string;
  hex: string;
};

export type LibraryEntry = {
  /** Stable, public slug — treated as a contract. Never rename; only deprecate. */
  slug: string;
  name: string;
  kind: LibraryKind;
  /** One-line hook. */
  tagline: string;
  /** Two to three sentences describing the look and feel. */
  summary: string;
  /** Concrete, borrowable design traits. */
  traits: string[];
  /** Representative palette (approximate, for reference and mood). */
  palette: Swatch[];
  /** Typographic point of view. */
  typography: string;
  /** Free-form tags for filtering and taste analysis. */
  tags: string[];
  /** For influences: the real-world reference. */
  url?: string;
};
