import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

type PageSeo = {
  title: string;
  description: string;
  /** Path from the site root, e.g. "/team". */
  path: string;
};

/** The share card drawn by app/opengraph-image.tsx. */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: ${siteConfig.tagline}`,
};

/**
 * Title, description, canonical URL and social cards for one page. Next replaces
 * openGraph and twitter wholesale when a page sets them (share image included),
 * so each page sets all of it.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = `${title} | ${siteConfig.shortName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImage] },
  };
}

type Crumb = { name: string; path: string };

/**
 * A breadcrumb trail as schema.org JSON-LD. Home is added for you, so pass only the
 * steps below it: one for an inner page, two for a service page.
 */
export function breadcrumbTrailJsonLd(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      ...trail.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.name,
        item: `${siteConfig.url}${crumb.path}`,
      })),
    ],
  };
}

/** The Home › Page trail for an inner page, as schema.org JSON-LD. */
export function breadcrumbJsonLd(name: string, path: string) {
  return breadcrumbTrailJsonLd([{ name, path }]);
}

/** One of our services as schema.org Service JSON-LD, for the page that describes it. */
export function serviceJsonLd({ name, description, path, areaServed }: { name: string; description: string; path: string; areaServed: object | string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: "AI receptionist",
    description,
    url: `${siteConfig.url}${path}`,
    areaServed,
    availableLanguage: ["English", "Hindi"],
    provider: { "@id": `${siteConfig.url}/#organization` },
  };
}
