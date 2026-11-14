import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { motionBootScript } from "@/lib/motion";
import { siteConfig } from "@/site.config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/fx/smooth-scroll";
import { Cursor } from "@/components/fx/cursor";
import { Preloader } from "@/components/fx/preloader";
import { JsonLd } from "@/components/json-ld";
import { EventTracker } from "@/components/event-tracker";
import { AuthProvider } from "@/components/auth/auth-provider";
import { createClient } from "@/lib/supabase/server";

// Fontshare variable fonts, downloaded by scripts/fetch-fonts.mjs (see the note there on licensing)
const display = localFont({
  src: "../assets/fonts/fontshare/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  weight: "200 700",
});

const sans = localFont({
  src: "../assets/fonts/fontshare/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  weight: "200 700",
});

/** The hero headline on one line, so the share titles always match the page. */
const headlineText = [
  siteConfig.headline.lines[0],
  siteConfig.headline.lines[1],
  siteConfig.headline.hot,
  siteConfig.headline.lines[2],
].join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  // Titles stay under Google's ~580px and leave the domain out (search results show it anyway)
  title: {
    default: `AI Front Desk for Clinics in India | ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${headlineText} | ${siteConfig.shortName}`,
    description: siteConfig.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${headlineText} | ${siteConfig.shortName}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  image: `${siteConfig.url}/opengraph-image`,
  description: siteConfig.description,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone ?? undefined,
  founder: { "@type": "Person", name: siteConfig.founder.name },
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
  areaServed: [
    { "@type": "City", name: "Mumbai" },
    { "@type": "Country", name: "India" },
  ],
  availableLanguage: ["English", "Hindi"],
  // What we are an authority on, in the words people search for it
  knowsAbout: [
    "AI receptionist",
    "Patient enquiry handling",
    "Appointment booking",
    "WhatsApp Business messaging",
    "Voice AI in Hindi",
    "Speed-to-lead calling",
    "DPDP Act data handling",
  ],
  sameAs: siteConfig.socials.map((s) => s.href),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI front desk",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI front desk for clinics",
          serviceType: "AI receptionist",
          description:
            "Every call, missed call and WhatsApp enquiry answered in Hindi or English, qualified, booked into the clinic's calendar and followed up.",
          url: `${siteConfig.url}/clinics`,
          areaServed: { "@type": "Country", name: "India" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI admissions front desk for education businesses",
          serviceType: "AI receptionist",
          description:
            "New leads called within minutes, counselling sessions booked and followed up on WhatsApp, for study-abroad, upskilling and exam-coaching businesses.",
          url: `${siteConfig.url}/education`,
          areaServed: "Worldwide",
        },
      },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: { "@id": `${siteConfig.url}/#organization` },
};

/**
 * Runs before paint: marks JS as available, and skips the preloader (starting the hero
 * intro straight away) once it has played this session, or on touch screens, where
 * the page should show up as fast as the phone allows.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');var s=function(){d.dataset.preloaded='true';d.classList.add('quick-intro')};try{if(!matchMedia('(hover: hover) and (pointer: fine)').matches||sessionStorage.getItem('protomation:preloaded'))s()}catch(e){s()}})();`;

export const instant = false;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  let user = null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch {
      // Auth not configured yet — site works without it
    }
  }

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {/* Sets data-motion before first paint, so motion-off never shows a frame of motion */}
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body className="min-h-svh overflow-x-clip">
        <AuthProvider initialUser={user}>
          <a
            href="#main"
            className="fixed top-3 left-3 z-[90] -translate-y-20 rounded-full bg-volt px-4 py-2 font-medium text-void focus:translate-y-0"
          >
            Skip to content
          </a>
          <Preloader />
          <SmoothScroll />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
          <EventTracker />
          <div aria-hidden="true" className="grain" />
          <JsonLd data={organizationJsonLd} />
          <JsonLd data={websiteJsonLd} />
        </AuthProvider>
      </body>
    </html>
  );
}
