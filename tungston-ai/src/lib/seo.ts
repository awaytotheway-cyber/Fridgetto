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
  alt: `${siteConfig.name}: We build AI that works while you sleep`,
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
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImage] },
  };
}

/** The Home › Page trail for an inner page, as schema.org JSON-LD. */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name, item: `${siteConfig.url}${path}` },
    ],
  };
}
