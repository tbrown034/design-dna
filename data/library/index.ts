import { influences } from "./influences";
import { styles } from "./styles";
import type { LibraryEntry, LibraryKind } from "./types";

export type { LibraryEntry, LibraryKind, Swatch } from "./types";

export const allEntries: LibraryEntry[] = [...styles, ...influences];

const bySlug = new Map(allEntries.map((e) => [e.slug, e]));

export function getAllLibrary(): LibraryEntry[] {
  return allEntries;
}

export function getStyles(): LibraryEntry[] {
  return styles;
}

export function getInfluences(): LibraryEntry[] {
  return influences;
}

export function getEntry(slug: string): LibraryEntry | undefined {
  return bySlug.get(slug);
}

export function isValidSlug(slug: string): boolean {
  return bySlug.has(slug);
}

export function allSlugs(): string[] {
  return allEntries.map((e) => e.slug);
}

export function kindOf(slug: string): LibraryKind | undefined {
  return bySlug.get(slug)?.kind;
}
