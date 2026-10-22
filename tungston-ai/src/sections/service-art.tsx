import type { CSSProperties } from "react";
import type { ServiceArt as ArtKind } from "@/lib/content";

/*
 * One illustration per service, drawn as a single series: hairline strokes,
 * one red working element, one yellow hot point. Parts marked data-anim stay
 * still until their card is hovered (see .art rules in globals.css); the voice
 * waveform is always live.
 */

const LINE = "rgb(243 241 238 / 0.16)";
const LINE_SOFT = "rgb(243 241 238 / 0.08)";
const RED = "var(--color-filament)";
const HOT = "var(--color-volt)";
const EMBER = "var(--color-ember)";

const anim = (animation: string, extra?: CSSProperties): CSSProperties => ({ animation, ...extra });

function AgentsArt() {
  const cx = 200;
  const cy = 150;
  const nodes = [
    { r: 95, a: -30 },
    { r: 140, a: 22 },
    { r: 50, a: 80 },
    { r: 140, a: 128 },
    { r: 95, a: 172 },
    { r: 140, a: 232 },
    { r: 50, a: 290 },
  ];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgb(232 16 26)" stopOpacity="0.45" />
          <stop offset="1" stopColor="rgb(232 16 26)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[50, 95, 140].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={LINE} strokeDasharray="2 6" />
      ))}
      {nodes.map((n, i) => {
        const rad = (n.a * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(rad) * n.r}
            y2={cy + Math.sin(rad) * n.r}
            stroke={LINE_SOFT}
          />
        );
      })}
      <g data-anim style={anim("art-spin 6s linear infinite", { transformOrigin: `${cx}px ${cy}px` })}>
        <path d={`M${cx} ${cy} L${cx + 140} ${cy} A140 140 0 0 0 ${cx + 140 * Math.cos(-0.7)} ${cy + 140 * Math.sin(-0.7)} Z`} fill="url(#sweep)" />
        <line x1={cx} y1={cy} x2={cx + 140} y2={cy} stroke={RED} strokeWidth="1.25" />
      </g>
      {nodes.map((n, i) => {
        const rad = (n.a * Math.PI) / 180;
        // Each node flares as the sweep passes over it
        const delay = ((n.a + 360) % 360) / 360 * 6;
        return (
          <circle
            key={i}
            data-anim
            cx={cx + Math.cos(rad) * n.r}
            cy={cy + Math.sin(rad) * n.r}
            r="5.5"
            fill={EMBER}
            stroke={RED}
            strokeWidth="1.25"
            style={anim(`art-ping 6s ${delay - 6}s linear infinite`)}
          />
        );
      })}
      <circle cx={cx} cy={cy} r="26" fill="none" stroke={RED} strokeOpacity="0.5" data-anim style={anim("art-halo 2.4s ease-out infinite", { transformOrigin: `${cx}px ${cy}px` })} />
      <circle cx={cx} cy={cy} r="17" fill={RED} />
      <circle cx={cx} cy={cy} r="6" fill={HOT} />
    </svg>
  );
}

function VoiceArt() {
  const bars = Array.from({ length: 52 }, (_, i) => {
    const h = 14 + 92 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17 + 0.6));
    const centre = i > 17 && i < 35;
    return { i, h, centre, hot: i === 24 || i === 29 };
  });
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
      <line x1="0" y1="80" x2="400" y2="80" stroke={LINE_SOFT} />
      {bars.map(({ i, h, centre, hot }) => (
        <rect
          key={i}
          x={20 + i * 7}
          y={80 - h / 2}
          width="3"
          height={h}
          rx="1.5"
          fill={hot ? HOT : centre ? RED : "rgb(243 241 238 / 0.3)"}
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            animation: `art-voice ${0.8 + ((i * 37) % 9) / 10}s ${-((i * 53) % 17) / 10}s ease-in-out infinite`,
          }}
        />
      ))}
    </svg>
  );
}

function ChatArt() {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" aria-hidden="true">
      <rect x="18" y="20" width="132" height="38" rx="15" fill="none" stroke={LINE} />
      <rect x="34" y="33" width="78" height="5" rx="2.5" fill={LINE} />
      <rect x="34" y="43" width="52" height="5" rx="2.5" fill={LINE_SOFT} />
      <rect x="86" y="70" width="136" height="46" rx="15" fill={RED} />
      <rect x="102" y="84" width="96" height="5" rx="2.5" fill="rgb(255 255 255 / 0.85)" />
      <rect x="102" y="95" width="70" height="5" rx="2.5" fill="rgb(255 255 255 / 0.55)" />
      <circle cx="210" cy="70" r="5" fill={HOT} />
      <rect x="18" y="128" width="62" height="32" rx="15" fill="none" stroke={LINE} />
      {[34, 49, 64].map((x, i) => (
        <circle
          key={x}
          data-anim
          cx={x}
          cy="144"
          r="3.5"
          fill="rgb(243 241 238 / 0.6)"
          style={anim(`art-bounce 1.2s ${i * 0.15}s ease-in-out infinite`)}
        />
      ))}
    </svg>
  );
}

function AutomationArt() {
  const nodes = [
    [40, 46],
    [120, 46],
    [120, 128],
    [200, 128],
  ];
  const path = "M54 46 H106 M120 60 V114 M134 128 H186";
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" aria-hidden="true">
      <path d="M40 60 V128 H106" fill="none" stroke={LINE_SOFT} strokeDasharray="2 5" />
      <path d={path} fill="none" stroke={LINE} strokeWidth="1.5" />
      <path
        d={path}
        data-anim
        fill="none"
        stroke={RED}
        strokeWidth="2"
        strokeDasharray="6 14"
        strokeLinecap="round"
        style={anim("art-dash 1.4s linear infinite")}
      />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 14} y={y - 14} width="28" height="28" rx="8" fill="var(--color-carbon)" stroke={i === 3 ? RED : LINE} strokeWidth="1.5" />
          {i === 0 && <circle cx={x} cy={y} r="4" fill="rgb(243 241 238 / 0.6)" />}
          {i === 1 && <rect x={x - 4} y={y - 4} width="8" height="8" fill="rgb(243 241 238 / 0.6)" />}
          {i === 2 && <path d={`M${x} ${y - 5} L${x + 5} ${y} L${x} ${y + 5} L${x - 5} ${y} Z`} fill="rgb(243 241 238 / 0.6)" />}
          {i === 3 && <circle cx={x} cy={y} r="4.5" fill={HOT} />}
        </g>
      ))}
    </svg>
  );
}

function AdvancedArt() {
  const layer = (y: number) => `M30 ${y} L100 ${y - 22} L170 ${y} L100 ${y + 22} Z`;
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" aria-hidden="true">
      {[132, 104, 76].map((y, i) => (
        <g key={y}>
          <path d={layer(y)} fill="var(--color-carbon)" stroke={LINE} />
          <path
            d={layer(y)}
            data-anim
            fill="rgb(232 16 26 / 0.18)"
            stroke={RED}
            style={anim(`art-layer 3.6s ${i * 1.2 - 3.6}s ease-in-out infinite`)}
          />
          {[-1, 0, 1].map((k) => (
            <circle key={k} cx={100 + k * 22} cy={y + (k === 0 ? 0 : 0)} r="2" fill="rgb(243 241 238 / 0.35)" />
          ))}
        </g>
      ))}
      <path d="M100 76 C 130 40, 160 34, 196 36" fill="none" stroke={LINE} strokeDasharray="3 4" />
      <path
        d="M100 76 C 130 40, 160 34, 196 36"
        data-anim
        fill="none"
        stroke={RED}
        strokeWidth="1.75"
        strokeDasharray="5 60"
        strokeLinecap="round"
        style={anim("art-dash-long 1.8s linear infinite")}
      />
      <circle cx="204" cy="36" r="12" fill={RED} />
      <circle cx="204" cy="36" r="4" fill={HOT} />
    </svg>
  );
}

function ContentArt() {
  const tiles = Array.from({ length: 9 }, (_, i) => ({ col: i % 3, row: Math.floor(i / 3), i }));
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" aria-hidden="true">
      {tiles.map(({ col, row, i }) => {
        const x = 32 + col * 62;
        const y = 16 + row * 52;
        const featured = i === 4;
        return (
          <g key={i} data-anim style={anim(`art-fill 4.5s ${i * 0.22 - 4.5}s ease-in-out infinite`)}>
            <rect x={x} y={y} width="52" height="42" rx="7" fill="var(--color-carbon)" stroke={featured ? HOT : LINE} />
            <rect x={x + 8} y={y + 9} width="24" height="4" rx="2" fill={featured ? RED : "rgb(243 241 238 / 0.4)"} />
            <rect x={x + 8} y={y + 18} width="36" height="3" rx="1.5" fill={LINE} />
            <rect x={x + 8} y={y + 25} width="28" height="3" rx="1.5" fill={LINE_SOFT} />
          </g>
        );
      })}
    </svg>
  );
}

function BuildArt() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
      <rect x="20" y="12" width="262" height="136" rx="11" fill="var(--color-carbon)" stroke={LINE} />
      <line x1="20" y1="32" x2="282" y2="32" stroke={LINE_SOFT} />
      <circle cx="34" cy="22" r="3" fill={RED} />
      <circle cx="45" cy="22" r="3" fill={LINE} />
      <circle cx="56" cy="22" r="3" fill={LINE} />
      <rect x="38" y="48" width="132" height="12" rx="3" fill="rgb(243 241 238 / 0.75)" data-anim style={anim("art-pulse 2.4s 0s ease-in-out infinite")} />
      <rect x="38" y="66" width="96" height="12" rx="3" fill="rgb(243 241 238 / 0.45)" data-anim style={anim("art-pulse 2.4s 0.2s ease-in-out infinite")} />
      <rect x="38" y="88" width="54" height="16" rx="8" fill={RED} />
      <rect x="98" y="88" width="46" height="16" rx="8" fill="none" stroke={LINE} />
      {[38, 118, 198].map((x, i) => (
        <rect key={x} x={x} y="114" width="70" height="22" rx="5" fill="none" stroke={LINE} data-anim style={anim(`art-pulse 2.4s ${0.4 + i * 0.2}s ease-in-out infinite`)} />
      ))}
      <rect x="196" y="46" width="70" height="56" rx="6" fill="rgb(232 16 26 / 0.12)" stroke={RED} strokeOpacity="0.6" />
      <circle cx="231" cy="74" r="5" fill={HOT} />
      <rect x="306" y="22" width="74" height="126" rx="13" fill="var(--color-carbon)" stroke={LINE} />
      <rect x="331" y="29" width="24" height="4" rx="2" fill={LINE} />
      <rect x="316" y="44" width="54" height="34" rx="5" fill="rgb(232 16 26 / 0.12)" stroke={RED} strokeOpacity="0.6" />
      <rect x="316" y="86" width="44" height="6" rx="3" fill="rgb(243 241 238 / 0.6)" data-anim style={anim("art-pulse 2.4s 0.3s ease-in-out infinite")} />
      <rect x="316" y="98" width="32" height="6" rx="3" fill="rgb(243 241 238 / 0.35)" data-anim style={anim("art-pulse 2.4s 0.5s ease-in-out infinite")} />
      <rect x="316" y="118" width="54" height="16" rx="8" fill={RED} />
    </svg>
  );
}

const ART: Record<ArtKind, () => React.JSX.Element> = {
  agents: AgentsArt,
  voice: VoiceArt,
  chat: ChatArt,
  automation: AutomationArt,
  advanced: AdvancedArt,
  content: ContentArt,
  build: BuildArt,
};

export function ServiceArt({ kind, live }: { kind: ArtKind; live?: boolean }) {
  const Art = ART[kind];
  return (
    <div className="art h-full w-full" data-live={live || undefined}>
      <Art />
    </div>
  );
}
