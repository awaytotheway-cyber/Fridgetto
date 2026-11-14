import type { NextConfig } from "next";
import { siteConfig } from "./src/site.config";
import { legacyRedirects } from "./src/redirects";

// One canonical host for search engines: if the site lives on www, send the bare domain there with a 301.
// (This runs once the bare domain is attached to the Vercel project.)
const site = new URL(siteConfig.url);
const bareHost = site.hostname.replace(/^www\./, "");

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // AVIF where the browser supports it (smaller), WebP otherwise
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // The old service pages and /team, kept alive as permanent redirects (src/redirects.ts)
    const legacy = legacyRedirects.map((r) => ({ ...r, permanent: true }));
    if (bareHost === site.hostname) return legacy;
    return [
      ...legacy,
      {
        source: "/:path*",
        has: [{ type: "host", value: bareHost }],
        destination: `${site.origin}/:path*`,
        statusCode: 301,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
