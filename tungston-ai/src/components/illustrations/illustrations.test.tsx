import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { LiveVariant } from "@/lib/services/types";
import { BeforeAfter } from "./before-after";
import { FlowPipeline } from "./flow-pipeline";
import { Handoff } from "./handoff";
import { LivePanel } from "./live-panel";
import { SavingsMeter } from "./savings-meter";
import { ToolConnect } from "./tool-connect";

const variants: LiveVariant[] = [
  "chat",
  "call",
  "pipeline",
  "dashboard",
  "ledger",
  "documents",
  "calendar",
  "browser",
  "workflow",
  "tasks",
];

const items = [
  { label: "Is the 6 pm slot free?", from: "them" as const, meta: "6:02 pm" },
  { label: "Yes, booked for you", from: "us" as const, meta: "6:02 pm" },
  { label: "Order #1042 shipped", meta: "Done" },
];

describe("LivePanel", () => {
  for (const variant of variants) {
    it(`shows the title and every item in the ${variant} view`, () => {
      const html = renderToStaticMarkup(<LivePanel variant={variant} title="Live preview" items={items} />);
      expect(html).toContain("Live preview");
      for (const item of items) expect(html).toContain(item.label);
    });
  }

  it("names the channel when a tool is given", () => {
    const html = renderToStaticMarkup(<LivePanel variant="chat" title="Chats" tool="whatsapp" items={items} />);
    expect(html).toContain('aria-label="WhatsApp"');
  });
});

describe("BeforeAfter", () => {
  it("labels both sides", () => {
    const html = renderToStaticMarkup(<BeforeAfter before={["Missed chats"]} after={["Every chat answered"]} />);
    expect(html).toContain("Today");
    expect(html).toContain("With Protomation");
    expect(html).toContain("Missed chats");
    expect(html).toContain("Every chat answered");
  });
});

describe("FlowPipeline", () => {
  it("shows every step and the logo of the tool behind it", () => {
    const html = renderToStaticMarkup(
      <FlowPipeline nodes={[{ label: "New message", tool: "whatsapp" }, { label: "AI reads it" }, { label: "CRM updated", tool: "zoho" }]} />,
    );
    for (const label of ["New message", "AI reads it", "CRM updated"]) expect(html).toContain(label);
    expect(html).toContain('aria-label="WhatsApp"');
    expect(html).toContain('aria-label="Zoho"');
  });
});

describe("Handoff", () => {
  it("shows both lanes, the client's total and the timeline", () => {
    const html = renderToStaticMarkup(
      <Handoff yourItems={["A 45-minute call"]} yourTotal="About 3 hours" ourItems={["Build and test"]} timeline="Live in 3 weeks" />,
    );
    for (const text of ["A 45-minute call", "About 3 hours", "Build and test", "Live in 3 weeks"]) expect(html).toContain(text);
  });
});

describe("ToolConnect", () => {
  it("names every connected tool and the centre", () => {
    const html = renderToStaticMarkup(<ToolConnect tools={["whatsapp", "tally"]} center="Your agent" />);
    expect(html).toContain("Your agent");
    expect(html).toContain("WhatsApp");
    expect(html).toContain("Tally");
  });
});

describe("SavingsMeter", () => {
  it("never fills past full", () => {
    const html = renderToStaticMarkup(<SavingsMeter fraction={1.7} label="1.7 people" />);
    expect(html).toContain("--fill:1");
    expect(html).toContain("1.7 people");
  });

  it("never goes below empty", () => {
    expect(renderToStaticMarkup(<SavingsMeter fraction={-2} label="none" />)).toContain("--fill:0");
  });
});
