import type { MetadataRoute } from "next";
import { publicRoutes } from "@/redirects";
import { siteConfig } from "@/site.config";

const legalPages = new Set(["/privacy", "/terms"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return publicRoutes.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    // Legal pages are indexed, but they are not what we want to rank for
    priority: path === "/" ? 1 : path === "/clinics" ? 0.9 : legalPages.has(path) ? 0.3 : 0.8,
  }));
}
