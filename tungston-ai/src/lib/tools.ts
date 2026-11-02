/**
 * The tools our systems plug into, with their logos where Simple Icons (CC0) has one.
 * Logos show compatibility only; the marks belong to their owners (see ASSETS.md).
 * Named imports keep unused logos out of the bundle.
 */
import {
  siAirtable,
  siCalendly,
  siClaude,
  siElevenlabs,
  siFacebook,
  siGmail,
  siGoogleads,
  siGoogleanalytics,
  siGooglecalendar,
  siGoogledrive,
  siGooglegemini,
  siGooglesheets,
  siHubspot,
  siInstagram,
  siMailchimp,
  siMake,
  siMeta,
  siN8n,
  siNextdotjs,
  siNotion,
  siPaytm,
  siQuickbooks,
  siRazorpay,
  siReact,
  siShopify,
  siStripe,
  siSupabase,
  siTailwindcss,
  siVercel,
  siWhatsapp,
  siWordpress,
  siXero,
  siYoutube,
  siZapier,
  siZoho,
  type SimpleIcon,
} from "simple-icons";

export type Tool = { name: string; path?: string; hex?: string };

const logo = (icon: SimpleIcon): Tool => ({ name: icon.title, path: icon.path, hex: icon.hex });

const toolList = {
  whatsapp: logo(siWhatsapp),
  n8n: logo(siN8n),
  zoho: logo(siZoho),
  hubspot: logo(siHubspot),
  googlesheets: logo(siGooglesheets),
  gmail: logo(siGmail),
  googlecalendar: logo(siGooglecalendar),
  googledrive: logo(siGoogledrive),
  googleanalytics: logo(siGoogleanalytics),
  googleads: logo(siGoogleads),
  zapier: logo(siZapier),
  make: logo(siMake),
  shopify: logo(siShopify),
  razorpay: logo(siRazorpay),
  stripe: logo(siStripe),
  paytm: logo(siPaytm),
  quickbooks: logo(siQuickbooks),
  xero: logo(siXero),
  calendly: logo(siCalendly),
  elevenlabs: logo(siElevenlabs),
  claude: logo(siClaude),
  googlegemini: logo(siGooglegemini),
  meta: logo(siMeta),
  facebook: logo(siFacebook),
  instagram: logo(siInstagram),
  youtube: logo(siYoutube),
  mailchimp: logo(siMailchimp),
  notion: logo(siNotion),
  airtable: logo(siAirtable),
  wordpress: logo(siWordpress),
  nextdotjs: logo(siNextdotjs),
  react: logo(siReact),
  tailwindcss: logo(siTailwindcss),
  supabase: logo(siSupabase),
  vercel: logo(siVercel),
  // Not in Simple Icons: shown as a name chip with a neutral icon
  slack: { name: "Slack" },
  openai: { name: "OpenAI" },
  salesforce: { name: "Salesforce" },
  twilio: { name: "Twilio" },
  linkedin: { name: "LinkedIn" },
  canva: { name: "Canva" },
  tally: { name: "Tally" },
  excel: { name: "Excel" },
  docusign: { name: "DocuSign" },
  lookerstudio: { name: "Looker Studio" },
} satisfies Record<string, Tool>;

export type ToolId = keyof typeof toolList;

export const tools: Record<ToolId, Tool> = toolList;

export const isToolId = (id: string): id is ToolId => Object.hasOwn(tools, id);

/** The card colour logos sit on (the carbon token). */
const SURFACE = [0x0c, 0x0c, 0x0d];

function luminance([r, g, b]: number[]) {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** A logo's brand colour when it reads on the dark cards (3:1 or better), otherwise bone white. */
export function logoColor(hex: string | undefined): string {
  if (!hex || !/^[0-9a-f]{6}$/i.test(hex)) return "var(--color-bone)";
  const rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const ratio = (luminance(rgb) + 0.05) / (luminance(SURFACE) + 0.05);
  return ratio >= 3 ? `#${hex}` : "var(--color-bone)";
}
