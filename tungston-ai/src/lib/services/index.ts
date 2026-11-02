/**
 * Every service page's content, in catalog order. Add a service by writing its file in
 * ./details and listing it here; the page, sitemap and tests pick it up.
 */
import { catalog } from "./catalog";
import { aiAgentDevelopment } from "./details/ai-agent-development";
import { aiVoiceAgents } from "./details/ai-voice-agents";
import { aiWebsiteChatbots } from "./details/ai-website-chatbots";
import { aiProcessAutomation } from "./details/ai-process-automation";
import { contentAutomation } from "./details/content-automation";
import { crmLeadAutomation } from "./details/crm-lead-automation";
import { customAutomations } from "./details/custom-automations";
import { dataReportingAutomation } from "./details/data-reporting-automation";
import { financeReconciliationAutomation } from "./details/finance-reconciliation-automation";
import { speedToLeadAgent } from "./details/speed-to-lead-agent";
import { websiteDevelopment } from "./details/website-development";
import { whatsappAutomation } from "./details/whatsapp-automation";
import type { ServiceDetail } from "./types";

const details: ServiceDetail[] = [
  aiAgentDevelopment,
  aiVoiceAgents,
  aiWebsiteChatbots,
  whatsappAutomation,
  crmLeadAutomation,
  dataReportingAutomation,
  aiProcessAutomation,
  financeReconciliationAutomation,
  speedToLeadAgent,
  customAutomations,
  contentAutomation,
  websiteDevelopment,
];

const bySlug = new Map(details.map((d) => [d.slug, d]));

export function getService(slug: string): ServiceDetail | undefined {
  return bySlug.get(slug);
}

export function allServices(): ServiceDetail[] {
  return catalog.flatMap((c) => bySlug.get(c.slug) ?? []);
}
