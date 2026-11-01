"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { servicePillars, type CapabilityPillar } from "@/lib/content";

export function CapabilitiesBrowser() {
  const [activePillar, setActivePillar] = useState<CapabilityPillar>(servicePillars[0]);

  return (
    <div className="relative rounded-card border border-white/[0.08] bg-black/60 p-6 backdrop-blur-md sm:p-8 lg:p-10">
      {/* Red corner bracket accents matching HUD aesthetic */}
      <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-filament" />
      <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-filament" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-filament" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-filament" />

      {/* Top HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-smoke">
          <span className="inline-block size-2 rounded-full bg-filament shadow-[0_0_8px_rgb(232_16_26/0.8)]" />
          <span>{servicePillars.length} Pillars · 40 Specialist Capabilities</span>
        </div>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-volt"
        >
          <span>See all services</span>
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Main Grid: Pillars list on left, capabilities on right */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Navigation Tabs */}
        <div className="space-y-2 lg:col-span-4 lg:border-r lg:border-white/[0.08] lg:pr-6">
          {servicePillars.map((pillar) => {
            const isActive = pillar.id === activePillar.id;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillar(pillar)}
                className={`group flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-white/[0.06] text-bone shadow-[inset_2px_0_0_0_var(--color-filament)]"
                    : "text-ash hover:bg-white/[0.02] hover:text-bone"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs transition-colors ${
                      isActive ? "text-filament font-semibold" : "text-smoke group-hover:text-ash"
                    }`}
                  >
                    {pillar.num}
                  </span>
                  <span className="font-display font-medium text-sm sm:text-base tracking-tight">{pillar.name}</span>
                </div>
                <ChevronRight
                  className={`size-4 transition-transform duration-300 ${
                    isActive ? "text-filament translate-x-0.5" : "text-smoke opacity-40 group-hover:opacity-80"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Pillar Details & Capabilities */}
        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-2xl font-semibold text-bone sm:text-3xl tracking-tight">
                {activePillar.name}
              </h3>
              <ArrowUpRight className="size-5 text-smoke" />
            </div>
            <span className="font-mono text-xs tracking-wider text-smoke uppercase">
              {activePillar.countLabel}
            </span>
          </div>
          <p className="mt-2 text-sm text-ash">{activePillar.tagline}</p>

          <div className="my-6 h-px w-full bg-white/[0.08]" />

          {/* 2-Column List of Capabilities with em-dash prefix */}
          <div className="grid gap-3 sm:grid-cols-2">
            {activePillar.services.map((item) => (
              <div
                key={item}
                className="group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-bone/90 transition-colors hover:bg-white/[0.03] hover:text-bone"
              >
                <span className="text-filament font-mono text-xs transition-transform group-hover:scale-125">—</span>
                <span className="tracking-tight">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.05] pt-6">
            <span className="font-mono text-xs text-smoke">Custom builds tailored to your infrastructure</span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-filament transition-colors hover:text-volt"
            >
              <span>Get started with {activePillar.name}</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
