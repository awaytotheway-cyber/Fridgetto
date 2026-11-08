import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { siteConfig } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const legalPages = ["/privacy", "/terms"];
  const routes = ["", "/services", "/pricing", "/work", "/about", "/team", "/contact", ...legalPages];
  // One page per service, so each can rank for its own search
  const servicePages = services.map((service) => `/services/${service.slug}`);
  const lastModified = new Date();
  return [...routes, ...servicePages].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    // Legal pages are indexed, but they are not what we want to rank for
    priority: path === "" ? 1 : legalPages.includes(path) ? 0.3 : path.startsWith("/services/") ? 0.7 : 0.8,
  }));
}
