import Image from "next/image";
import { TiltCard } from "@/components/fx/tilt-card";
import { team, type TeamMember } from "@/lib/content";

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <TiltCard max={4}>
      <article className="service-card group/card relative flex h-full flex-col overflow-hidden rounded-card border border-white/[0.07] bg-[linear-gradient(180deg,rgb(255_255_255/0.035),rgb(255_255_255/0.01))] transition-[border-color,box-shadow] duration-500 hover:border-transparent hover:shadow-[var(--shadow-glow-soft)]">
        {/* Heat under the pointer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-[var(--heat,0)] transition-opacity duration-500 [background:radial-gradient(28rem_circle_at_var(--mx,50%)_var(--my,50%),rgb(232_16_26/0.12),transparent_60%)]"
        />
        {/* Glowing border that follows the pointer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-card p-px opacity-[var(--heat,0)] transition-opacity duration-500 [background:radial-gradient(22rem_circle_at_var(--mx,50%)_var(--my,50%),rgb(232_16_26/0.95),rgb(232_16_26/0.25)_45%,transparent_70%)] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        />

        <div className="relative aspect-[4/5] overflow-hidden">
          {/* The portraits sit on black; the fade melts their lower edge into the card */}
          <Image
            src={member.image}
            alt={member.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover brightness-95 transition-[scale,filter] duration-700 ease-out-expo [mask-image:linear-gradient(180deg,#000_70%,transparent)] group-hover/card:scale-[1.03] group-hover/card:brightness-105 motion-reduce:transition-none"
          />
        </div>

        <div className="relative -mt-16 px-7 pb-8 sm:px-9 sm:pb-10">
          <p className="font-display text-sm font-medium text-smoke tabular-nums">
            <span className="text-signal">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-2 text-white/20">/</span>
            {member.role}
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,1.6rem+2.2vw,3.5rem)] leading-[0.95] font-semibold tracking-[-0.015em] text-bone">
            {member.name}
          </h2>
          <p className="mt-5 max-w-lg text-bone/85">{member.bio}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${member.name}'s focus`}>
            {member.focus.map((f) => (
              <li key={f} className="rounded-full border border-white/10 px-3 py-1 text-[0.8125rem] text-ash">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </TiltCard>
  );
}

export function Team() {
  return (
    <section aria-label="Team members" className="relative overflow-hidden pb-24 sm:pb-32">
      <div aria-hidden="true" className="ambient top-1/4 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 opacity-50" />
      <div className="shell relative grid gap-4 md:grid-cols-2 lg:gap-6">
        {team.map((member, i) => (
          <MemberCard key={member.name} member={member} index={i} />
        ))}
      </div>
    </section>
  );
}
