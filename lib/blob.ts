import "server-only";

// Image upload depends on a Vercel Blob token. When it's absent (e.g. before
// the integration is set up), the mood board still works for URLs and notes.
export function blobEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}
