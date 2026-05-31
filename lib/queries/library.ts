import { cacheLife, cacheTag } from "next/cache";
import {
  getAllLibrary,
  getInfluences,
  getStyles,
} from "@/data/library";

// The library is static seed data, so it caches indefinitely and prerenders
// into the static shell. `revalidateTag('library', 'max')` can bust it if the
// seed ever changes without a redeploy.
export async function getLibrary() {
  "use cache";
  cacheLife("max");
  cacheTag("library");
  return getAllLibrary();
}

export async function getLibrarySections() {
  "use cache";
  cacheLife("max");
  cacheTag("library");
  return { styles: getStyles(), influences: getInfluences() };
}
