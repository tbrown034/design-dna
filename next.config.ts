import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components: data is dynamic by default and opted into caching via
  // `use cache`. Every dynamic subtree must sit under a <Suspense> boundary.
  cacheComponents: true,
  images: {
    remotePatterns: [
      // Vercel Blob (mood board uploads, screenshots) — Phase 5/6
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // ScreenshotOne (live URL analysis) — Phase 6
      { protocol: "https", hostname: "api.screenshotone.com" },
    ],
  },
};

export default nextConfig;
