import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { siteConfig } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/pricing", "/work", "/about", "/team", "/contact"];
  // One page per service, so each can rank for its own search
  const servicePages = services.map((service) => `/services/${service.slug}`);
  const lastModified = new Date();
  return [...routes, ...servicePages].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/services/") ? 0.7 : 0.8,
  }));
}
