import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/site.config";

export const alt = `${siteConfig.name}: We build AI that works while you sleep`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts/fontshare");
const semibold = readFile(join(fontDir, "ClashDisplay-Semibold.ttf"));
const medium = readFile(join(fontDir, "ClashDisplay-Medium.ttf"));

/** The P mark: left column, top and middle bars, and the bowl's outer edge on a 5×5 grid. */
const MARK = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 1], [1, 2], [2, 2], [3, 2], [0, 1], [0, 2], [0, 3], [0, 4]];

/** Deterministic "ripple" so the share card shows the hero's water grid, frozen mid-wave. */
function dots() {
  const out: { x: number; y: number; r: number; c: string }[] = [];
  const cx = 930;
  const cy = 250;
  for (let y = 15; y < 630; y += 30) {
    for (let x = 15; x < 1200; x += 30) {
      const d = Math.hypot(x - cx, y - cy);
      const wave = Math.max(0, Math.cos((d - 150) / 34)) * Math.exp(-Math.abs(d - 150) / 140);
      const heat = Math.min(1, wave * 1.4);
      const c = heat > 0.75 ? "#ffd400" : heat > 0.45 ? "#ff6a1a" : heat > 0.2 ? "#e8101a" : "#4a0a0d";
      out.push({ x, y, r: 2 + heat * 3, c });
    }
  }
  return out;
}

export default async function OpengraphImage() {
  const [semiboldData, mediumData] = await Promise.all([semibold, medium]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#050505", position: "relative", fontFamily: "Clash Display" }}>
        {dots().map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x - d.r,
              top: d.y - d.r,
              width: d.r * 2,
              height: d.r * 2,
              borderRadius: 999,
              background: d.c,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.85) 45%, rgba(5,5,5,0) 75%)",
          }}
        />
        <div style={{ position: "absolute", left: 72, top: 60, display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", position: "relative", width: 40, height: 40 }}>
            {MARK.map(([col, row]) => (
              <div
                key={`${col}-${row}`}
                style={{
                  position: "absolute",
                  left: col * 8 + 1,
                  top: row * 8 + 1,
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: col === 0 && row === 0 ? "#ffd400" : "#e8101a",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 500, color: "#f3f1ee", letterSpacing: "-0.005em" }}>
            <span>{siteConfig.shortName}</span>
            <span style={{ color: "#e8101a" }}>{siteConfig.nameSuffix}</span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 70,
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            fontWeight: 600,
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            color: "#f3f1ee",
          }}
        >
          <span>We Build AI</span>
          <span>That Works While</span>
          <span style={{ display: "flex" }}>
            You&nbsp;<span style={{ color: "#ffd400", textShadow: "0 0 30px rgba(232,16,26,0.9)" }}>Sleep.</span>
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Clash Display", data: semiboldData, weight: 600, style: "normal" },
        { name: "Clash Display", data: mediumData, weight: 500, style: "normal" },
      ],
    },
  );
}
