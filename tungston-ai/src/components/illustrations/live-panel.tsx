import { Check, FileText, Globe, Lock, PhoneCall } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { ToolLogo } from "@/components/tool-logo";
import type { LiveItem, LiveVariant } from "@/lib/services/types";
import type { ToolId } from "@/lib/tools";
import { at } from "./stagger";

type LivePanelProps = {
  variant: LiveVariant;
  title: string;
  tool?: ToolId;
  items: LiveItem[];
  className?: string;
};

type BodyProps = { items: LiveItem[] };

/** Who said it: `from` when given, otherwise the customer and the agent take turns. */
const sideOf = (item: LiveItem, i: number) => item.from ?? (i % 2 ? "us" : "them");

/**
 * A small app window showing the service at work. It plays as soon as the page loads
 * (it sits in the hero), and shows its finished state under reduced motion.
 */
export function LivePanel({ variant, title, tool, items, className }: LivePanelProps) {
  const Body = bodies[variant];
  return (
    <figure
      data-inview="true"
      className={`relative overflow-hidden rounded-panel border border-white/[0.09] bg-[linear-gradient(180deg,rgb(21_21_23/0.94),rgb(12_12_13/0.97))] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.95),0_0_0_1px_rgb(232_16_26/0.08)] ${className ?? ""}`}
    >
      <figcaption className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3 text-sm">
        <span aria-hidden="true" className="flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <span key={d} className="size-2 rounded-full bg-white/15" />
          ))}
        </span>
        {tool && <ToolLogo id={tool} size={16} />}
        <span className="truncate font-medium text-bone">{title}</span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 text-xs text-smoke">
          <span aria-hidden="true" className="il-live size-1.5 rounded-full bg-volt" />
          Live
        </span>
      </figcaption>
      <div className="p-4 sm:p-5">
        <Body items={items} />
      </div>
    </figure>
  );
}

function Chat({ items }: BodyProps) {
  return (
    <ol className="flex flex-col gap-2.5" style={{ "--step": "0.6s" } as CSSProperties}>
      {items.map((item, i) => {
        const us = sideOf(item, i) === "us";
        return (
          <li
            key={i}
            style={at(i)}
            className={`il-in flex max-w-[86%] flex-col ${us ? "items-end self-end" : "items-start self-start"}`}
          >
            <span
              className={`rounded-2xl px-3.5 py-2 text-[0.875rem] leading-snug ${us ? "rounded-br-md bg-filament text-white" : "rounded-bl-md bg-white/[0.07] text-bone"}`}
            >
              {item.label}
            </span>
            {item.meta && <span className="mt-1 text-[0.6875rem] text-smoke">{item.meta}</span>}
          </li>
        );
      })}
      <li aria-hidden="true" style={at(items.length)} className="il-in self-start rounded-2xl bg-white/[0.07] px-3.5 py-3">
        <span className="il-typing flex gap-1">
          {[0, 1, 2].map((d) => (
            <span key={d} className="size-1.5 rounded-full bg-ash" />
          ))}
        </span>
      </li>
    </ol>
  );
}

const WAVE = [30, 55, 80, 45, 95, 60, 35, 70, 90, 50, 65, 40, 85, 55];

function Call({ items }: BodyProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-filament/15 ring-1 ring-filament/40">
          <PhoneCall className="size-4 text-signal" />
        </span>
        <div className="min-w-0 text-sm">
          <p className="text-bone">Incoming call</p>
          <p className="text-xs text-smoke">Answered by your AI agent</p>
        </div>
        <div aria-hidden="true" className="ml-auto flex h-9 items-center gap-[3px]">
          {WAVE.map((h, i) => (
            <span key={i} className="il-wave w-[3px] rounded-full bg-filament" style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }} />
          ))}
        </div>
      </div>
      <ol className="mt-4 space-y-2.5 text-[0.875rem]" style={{ "--step": "0.7s" } as CSSProperties}>
        {items.map((item, i) => {
          const us = sideOf(item, i) === "us";
          return (
            <li key={i} style={at(i)} className="il-in flex gap-3">
              <span className={`w-12 shrink-0 pt-0.5 text-[0.6875rem] font-semibold tracking-wider uppercase ${us ? "text-signal" : "text-smoke"}`}>
                {us ? "Agent" : "Caller"}
              </span>
              <span className="text-bone/90">{item.label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const STAGES = ["New", "Qualified", "Booked"];

function Pipeline({ items }: BodyProps) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {STAGES.map((stage, col) => (
        <div key={stage} className="min-w-0 rounded-xl bg-white/[0.025] p-2">
          <p className="px-1 pb-2 text-[0.6875rem] font-semibold tracking-wider text-smoke uppercase">{stage}</p>
          <ul className="space-y-2">
            {items.map((item, i) =>
              i % STAGES.length === col ? (
                <li key={i} style={at(i)} className="il-in rounded-lg border border-white/[0.07] bg-carbon p-2.5">
                  <p className="text-[0.8125rem] leading-snug text-bone">{item.label}</p>
                  {item.meta && <p className="mt-1 text-[0.6875rem] text-signal">{item.meta}</p>}
                  <span aria-hidden="true" className="mt-2 block h-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <span style={at(i)} className="il-bar-x block h-full w-3/4 rounded-full bg-[linear-gradient(90deg,var(--color-filament),var(--color-volt))]" />
                  </span>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

const BARS = [34, 46, 40, 58, 52, 70, 64, 86];

function Dashboard({ items }: BodyProps) {
  return (
    <div>
      <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {items.map((item, i) => (
          <div key={i} style={at(i)} className="il-in rounded-xl border border-white/[0.07] bg-carbon p-3">
            <dt className="text-[0.6875rem] text-smoke">{item.label}</dt>
            {item.meta && <dd className="mt-1 font-display text-lg font-semibold text-bone">{item.meta}</dd>}
          </div>
        ))}
      </dl>
      <div aria-hidden="true" className="relative mt-4 h-28 rounded-xl bg-white/[0.02] px-3 pt-3">
        <div className="flex h-full items-end gap-2">
          {BARS.map((h, i) => (
            <span key={i} style={at(i, { height: `${h}%` })} className="il-bar-y flex-1 rounded-t-md bg-[linear-gradient(180deg,rgb(232_16_26/0.9),rgb(92_10_14/0.6))]" />
          ))}
        </div>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-x-3 top-2 h-[70%] w-[calc(100%-1.5rem)] overflow-visible">
          <polyline
            className="il-draw"
            style={{ "--len": 140 } as CSSProperties}
            points="0,32 14,26 28,29 42,18 56,21 70,11 84,14 100,3"
            fill="none"
            stroke="var(--color-volt)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}

/** Rows are matched one by one; an item marked `from: "them"` is the one exception left for a person. */
function Ledger({ items }: BodyProps) {
  return (
    <ul className="divide-y divide-white/[0.06] text-[0.875rem]" style={{ "--step": "0.5s" } as CSSProperties}>
      {items.map((item, i) => {
        const flagged = item.from === "them";
        return (
          <li key={i} style={at(i)} className="il-in flex items-center gap-3 py-2.5">
            <span className="min-w-0 flex-1 truncate text-bone/90">{item.label}</span>
            <span className="relative shrink-0 text-xs">
              <span style={at(i)} className="il-done absolute right-0 whitespace-nowrap text-smoke" aria-hidden="true">
                Checking…
              </span>
              <span
                style={at(i)}
                className={`il-pop inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${flagged ? "bg-volt/15 text-volt" : "bg-white/[0.06] text-bone"}`}
              >
                {!flagged && <Check aria-hidden="true" className="size-3 text-volt" />}
                {item.meta ?? (flagged ? "Needs review" : "Matched")}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function Documents({ items }: BodyProps) {
  return (
    <div className="relative">
      <span aria-hidden="true" className="il-scan pointer-events-none absolute inset-x-0 h-8 -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgb(232_16_26/0.22),transparent)]" />
      <ul className="space-y-2.5" style={{ "--step": "0.55s" } as CSSProperties}>
        {items.map((item, i) => (
          <li key={i} style={at(i)} className="il-in flex items-center gap-3 rounded-xl border border-white/[0.07] bg-carbon px-3 py-2.5">
            <FileText aria-hidden="true" className="size-4 shrink-0 text-ash" />
            <span className="min-w-0 flex-1 truncate text-[0.875rem] text-bone/90">{item.label}</span>
            <span
              style={at(i, { "--tilt": "-8deg" } as CSSProperties)}
              className="il-pop shrink-0 rounded-md border border-filament/60 px-1.5 py-0.5 text-[0.6875rem] font-semibold tracking-wider text-signal uppercase"
            >
              {item.meta ?? "Done"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const SLOTS = [0, 2, 4, 7, 9, 11, 13, 5, 1, 8];

function Calendar({ items }: BodyProps) {
  const cells: (ReactNode | null)[] = Array.from({ length: 14 }, () => null);
  items.slice(0, SLOTS.length).forEach((item, i) => {
    cells[SLOTS[i]] = (
      <span style={at(i)} className="il-in block rounded-md bg-filament/15 p-1.5 ring-1 ring-filament/30">
        {item.meta && <span className="block text-[0.5625rem] font-semibold tracking-wider text-signal uppercase">{item.meta}</span>}
        <span className="line-clamp-2 block text-[0.6875rem] leading-tight text-bone">{item.label}</span>
      </span>
    );
  });
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {DAYS.map((d, i) => (
        <span key={i} aria-hidden="true" className="pb-1 text-center text-[0.6875rem] text-smoke">
          {d}
        </span>
      ))}
      {cells.map((cell, i) => (
        <div key={i} className="min-h-16 rounded-lg border border-white/[0.05] bg-white/[0.015] p-1">
          {cell}
        </div>
      ))}
    </div>
  );
}

function Browser({ items }: BodyProps) {
  const [first, ...rest] = items;
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-carbon">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2 text-xs text-smoke">
        <Lock aria-hidden="true" className="size-3" />
        <Globe aria-hidden="true" className="size-3" />
        <span>yourbusiness.com</span>
      </div>
      <div className="space-y-2.5 p-3">
        {first && (
          <div style={at(0)} className="il-in rounded-lg bg-[linear-gradient(120deg,rgb(232_16_26/0.25),rgb(12_12_13))] p-4">
            <p className="font-display text-base font-semibold text-bone">{first.label}</p>
            {first.meta && <p className="mt-1 text-xs text-ash">{first.meta}</p>}
            <span aria-hidden="true" className="mt-3 inline-block h-6 w-24 rounded-full bg-filament" />
          </div>
        )}
        <div className="grid grid-cols-2 gap-2.5">
          {rest.map((item, i) => (
            <div key={i} style={at(i + 1)} className="il-in rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="text-[0.8125rem] text-bone/90">{item.label}</p>
              {item.meta && <p className="mt-1 text-[0.6875rem] text-signal">{item.meta}</p>}
              <span aria-hidden="true" className="mt-2 block h-1.5 w-2/3 rounded-full bg-white/[0.07]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Workflow({ items }: BodyProps) {
  return (
    <ol className="relative space-y-3">
      <span aria-hidden="true" className="absolute top-5 bottom-5 left-[1.125rem] w-px bg-white/[0.08]">
        <span className="il-pulse-y absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-volt shadow-[0_0_12px_rgb(255_212_0/0.8)]" />
      </span>
      {items.map((item, i) => (
        <li key={i} style={at(i)} className="il-in relative flex items-center gap-3">
          <span style={at(i)} className="il-node relative grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-carbon text-xs font-semibold text-bone">
            {i + 1}
          </span>
          <span className="min-w-0 flex-1 rounded-xl border border-white/[0.07] bg-carbon px-3 py-2">
            <span className="block text-[0.875rem] text-bone">{item.label}</span>
            {item.meta && <span className="block text-[0.6875rem] text-smoke">{item.meta}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Tasks({ items }: BodyProps) {
  return (
    <ul className="space-y-2" style={{ "--step": "0.55s" } as CSSProperties}>
      {items.map((item, i) => (
        <li key={i} style={at(i)} className="il-in flex items-center gap-3 rounded-xl border border-white/[0.07] bg-carbon px-3 py-2.5">
          <span className="grid size-5 shrink-0 place-items-center rounded-md border border-white/20">
            <Check aria-hidden="true" style={at(i)} className="il-pop size-3.5 text-volt" />
          </span>
          <span className="min-w-0 flex-1 text-[0.875rem] text-bone/90">{item.label}</span>
          {item.meta && <span className="shrink-0 text-[0.6875rem] text-smoke">{item.meta}</span>}
        </li>
      ))}
    </ul>
  );
}

const bodies: Record<LiveVariant, (props: BodyProps) => ReactNode> = {
  chat: Chat,
  call: Call,
  pipeline: Pipeline,
  dashboard: Dashboard,
  ledger: Ledger,
  documents: Documents,
  calendar: Calendar,
  browser: Browser,
  workflow: Workflow,
  tasks: Tasks,
};
