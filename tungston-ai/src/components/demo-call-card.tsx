import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import QRCode from "qrcode";
import { Phone } from "lucide-react";
import { currentDemoMode, SAMPLE_CALL_PATH } from "@/lib/demo-assets";

/** Optional transcript beside the sample recording: public/audio/sample-call.txt */
function transcript(): string | null {
  const file = join(process.cwd(), "public", SAMPLE_CALL_PATH.replace(/\.mp3$/, ".txt"));
  return existsSync(file) ? readFileSync(file, "utf8").trim() : null;
}

/**
 * The demo front desk (COPY.md §2.4), in whichever form exists right now:
 *  - a demo number is set: a call button, a QR code on desktop, and the ground rules
 *  - only a sample recording: an audio player with a transcript toggle
 *  - neither: nothing at all (the CTA pair then says "See how it works")
 */
export async function DemoCallCard() {
  const demo = currentDemoMode();
  if (demo.kind === "none") return null;

  if (demo.kind === "recording") {
    const text = transcript();
    return (
      <div className="rounded-panel border border-white/[0.09] bg-carbon p-6 sm:p-7">
        <p className="font-display text-title font-semibold text-bone">Listen to a sample call</p>
        <p className="mt-2 text-sm text-ash">A call with our demo clinic. Fictional clinic, real front desk.</p>
        <audio controls preload="none" src={SAMPLE_CALL_PATH} className="mt-5 w-full">
          Your browser can&apos;t play this recording.
        </audio>
        {text && (
          <details className="mt-4 text-sm">
            <summary className="cursor-pointer text-bone underline decoration-filament/50 underline-offset-4">
              Show transcript
            </summary>
            <p className="mt-3 whitespace-pre-line text-ash">{text}</p>
          </details>
        )}
      </div>
    );
  }

  const qr = await QRCode.toString(demo.tel, {
    type: "svg",
    margin: 0,
    color: { dark: "#f3f1ee", light: "#0000" },
  });

  return (
    <div className="rounded-panel border border-white/[0.09] bg-carbon p-6 sm:p-7">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-display text-title font-semibold text-bone">Call our demo front desk</p>
          <p className="mt-2 text-sm text-ash">Hindi · English</p>
          <a
            href={demo.tel}
            data-event="demo_call_click"
            className="mt-5 inline-flex h-12 items-center gap-2.5 rounded-full bg-filament px-6 font-medium text-white shadow-[0_0_0_1px_rgb(232_16_26/0.6),0_10px_40px_-10px_rgb(232_16_26/0.8)]"
          >
            <Phone aria-hidden="true" className="size-4" /> {demo.display}
          </a>
          <p className="mt-4 text-sm text-smoke">Takes about 2 minutes. Please don&apos;t share real medical details.</p>
          <p lang="hi" className="mt-2 text-sm text-ash">
            हिंदी में भी बात हो सकती है।
          </p>
        </div>
        <figure className="hidden shrink-0 md:block">
          <div className="size-28 rounded-lg bg-white/[0.04] p-2.5" dangerouslySetInnerHTML={{ __html: qr }} />
          <figcaption className="mt-2 max-w-28 text-center text-xs text-smoke">Scan to call from your phone</figcaption>
        </figure>
      </div>
    </div>
  );
}
