import type { MetadataRoute } from "next";
import { catalog } from "@/lib/services/catalog";
import { siteConfig } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/about", "/team", "/contact"];
  const lastModified = new Date();
  const pages: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
  const servicePages: MetadataRoute.Sitemap = catalog.map((s) => ({
    url: `${siteConfig.url}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...pages, ...servicePages];
}
