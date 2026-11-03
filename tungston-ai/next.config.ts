import type { NextConfig } from "next";
import { siteConfig } from "./src/site.config";

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
    // The service was renamed from Custom Automations; keep any link to the old page alive
    const renamed = [
      { source: "/services/custom-automations", destination: "/services/workflow-automation", permanent: true },
    ];
    if (bareHost === site.hostname) return renamed;
    return [
      ...renamed,
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
