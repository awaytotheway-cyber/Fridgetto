/**
 * RippleField: a dot grid that behaves like the surface of water.
 *
 * Every dot is one cell of a coarse height field. Each step solves a damped
 * 2D wave equation (neighbour Laplacian + a weak spring back to rest), so a
 * disturbance spreads outward as rings and settles. Dots are drawn displaced
 * along the local surface slope, and their "heat" (how far the surface moved)
 * maps from dim ember red up to filament yellow, like a filament warming up.
 */

export type RippleFieldOptions = {
  /** Distance between dots in CSS pixels. */
  spacing?: number;
  /** React to the pointer. */
  interactive?: boolean;
  /** Warm the dots under a resting pointer, not just when it moves. */
  lamp?: boolean;
  /** Ambient drips: "coarse" = only on touch devices, "always", or "never". */
  drips?: "coarse" | "always" | "never";
  /** On fine pointers, start dripping after this many ms without movement. 0 disables. */
  idleDripAfter?: number;
  /** Overall brightness of resting dots, 0–1. */
  restAlpha?: number;
  /** Base dot radius in CSS pixels. */
  dotRadius?: number;
  /** Only draw dots inside this word (set in the display font), turning the grid into a dot-matrix wordmark. */
  maskText?: string;
  /** Only draw dots inside this SVG path, fitted (contain) to the canvas. */
  maskPath?: string;
  /** The coordinate box maskPath is drawn in, as [width, height]. */
  maskViewBox?: [number, number];
  /** Resting heat along the mask's right-hand edge (a rim light), 0–1. Other edges get a third of it. */
  rimHeat?: number;
};

type Rgb = [number, number, number];

const STEP = 1 / 60;
const TENSION = 0.2;
const RESTORE = 0.0035;
const DAMPING = 0.987;
const DISPLACE = 0.75;
const HEAT_GAIN = 0.075;
const BUCKETS = 24;
const LAMP_RADIUS = 190;
const TAU = Math.PI * 2;
/** Below this the surface moves less than a third of a pixel and no dot changes color. */
const SETTLED = 0.35;

function readColor(styles: CSSStyleDeclaration, name: string, fallback: Rgb): Rgb {
  const raw = styles.getPropertyValue(name).trim();
  const hex = raw.match(/^#([0-9a-f]{6})$/i);
  if (!hex) return fallback;
  const n = parseInt(hex[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

export class RippleField {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private opts: Required<RippleFieldOptions>;

  private width = 0;
  private height = 0;
  private dpr = 1;
  private cols = 0;
  private rows = 0;
  private originX = 0;
  private originY = 0;

  private h = new Float32Array(0);
  private v = new Float32Array(0);
  private bucketXY: Float32Array[] = [];
  private bucketCount = new Uint32Array(BUCKETS);
  private bucketFill: string[] = [];
  private bucketRadius: number[] = [];
  private glowSprite: HTMLCanvasElement | null = null;
  private mask: Uint8Array | null = null;
  private rim: Float32Array | null = null;

  private raf = 0;
  private running = false;
  private visible = true;
  private onScreen = true;
  private lastTime = 0;
  private acc = 0;
  private energy = 0;

  /** Canvas position, measured once per frame. */
  private rect: DOMRect | null = null;
  private pointerX = 0;
  private pointerY = 0;
  private prevX = 0;
  private prevY = 0;
  private hasPointer = false;
  private pointerFresh = false;
  private lampLevel = 0;
  private lastMove = 0;
  private dripTimer: ReturnType<typeof setTimeout> | null = null;

  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;
  private reducedMotion: boolean;
  private coarse: boolean;

  constructor(canvas: HTMLCanvasElement, options: RippleFieldOptions = {}) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("2D canvas is not available");
    this.ctx = ctx;
    this.opts = {
      spacing: 24,
      interactive: true,
      lamp: true,
      drips: "coarse",
      idleDripAfter: 8000,
      restAlpha: 1,
      dotRadius: 1.05,
      maskText: "",
      maskPath: "",
      maskViewBox: [100, 100],
      rimHeat: 0,
      ...options,
    };
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.coarse = window.matchMedia("(pointer: coarse)").matches;

    this.buildPalette();
    this.resize();

    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
      if (!this.running) this.render();
    });
    this.resizeObserver.observe(canvas);

    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.onScreen = entry.isIntersecting;
      this.syncRunning();
    });
    this.intersectionObserver.observe(canvas);

    document.addEventListener("visibilitychange", this.onVisibility);
    if (this.opts.interactive && !this.reducedMotion) {
      window.addEventListener("pointermove", this.onPointerMove, { passive: true });
      window.addEventListener("pointerdown", this.onPointerDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", this.onPointerLeave);
      window.addEventListener("scroll", this.onScroll, { passive: true });
    }

    this.render();
    if (this.opts.maskText) {
      document.fonts?.ready.then(() => {
        this.buildMask();
        if (!this.running) this.render();
      });
    }
    if (!this.reducedMotion) {
      this.scheduleDrip(900);
    }
  }

  /** Push the surface down at (x, y) in canvas CSS pixels. */
  impulse(x: number, y: number, strength = 6, radius = 2.2) {
    if (this.reducedMotion || !this.cols) return;
    const s = this.opts.spacing;
    const gx = (x - this.originX) / s;
    const gy = (y - this.originY) / s;
    const r = Math.ceil(radius);
    const cx = Math.round(gx);
    const cy = Math.round(gy);
    for (let y0 = cy - r; y0 <= cy + r; y0++) {
      if (y0 < 1 || y0 >= this.rows - 1) continue;
      for (let x0 = cx - r; x0 <= cx + r; x0++) {
        if (x0 < 1 || x0 >= this.cols - 1) continue;
        const d = Math.hypot(x0 - gx, y0 - gy);
        if (d > radius) continue;
        const falloff = 0.5 + 0.5 * Math.cos((d / radius) * Math.PI);
        this.v[y0 * this.cols + x0] -= strength * falloff;
      }
    }
    this.wake();
  }

  destroy() {
    this.stop();
    if (this.dripTimer) clearTimeout(this.dripTimer);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibility);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerdown", this.onPointerDown);
    document.documentElement.removeEventListener("pointerleave", this.onPointerLeave);
    window.removeEventListener("scroll", this.onScroll);
  }

  // ---------------------------------------------------------------- setup

  private buildPalette() {
    const styles = getComputedStyle(document.documentElement);
    const ember = readColor(styles, "--color-ember", [92, 10, 14]);
    const deep = readColor(styles, "--color-filament-deep", [158, 10, 18]);
    const filament = readColor(styles, "--color-filament", [232, 16, 26]);
    const volt = readColor(styles, "--color-volt", [255, 212, 0]);
    const orange = mix(filament, volt, 0.45);
    const stops: [number, Rgb][] = [
      [0, ember],
      [0.28, deep],
      [0.52, filament],
      [0.78, orange],
      [1, volt],
    ];

    this.bucketFill = [];
    this.bucketRadius = [];
    for (let b = 0; b < BUCKETS; b++) {
      const t = b / (BUCKETS - 1);
      let i = 0;
      while (i < stops.length - 2 && t > stops[i + 1][0]) i++;
      const [t0, c0] = stops[i];
      const [t1, c1] = stops[i + 1];
      const c = mix(c0, c1, (t - t0) / (t1 - t0));
      const alpha = b === 0 ? 0.95 * this.opts.restAlpha : Math.min(1, 0.95 + t * 0.05);
      this.bucketFill.push(`rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${alpha.toFixed(3)})`);
      this.bucketRadius.push(this.opts.dotRadius + t * t * 1.9);
    }

    const sprite = document.createElement("canvas");
    const size = 64;
    sprite.width = sprite.height = size;
    const g = sprite.getContext("2d");
    if (g) {
      const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, `rgba(${volt.join(",")},0.55)`);
      grad.addColorStop(0.25, `rgba(${filament.join(",")},0.35)`);
      grad.addColorStop(1, `rgba(${filament.join(",")},0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, size, size);
      this.glowSprite = sprite;
    }
  }

  private resize() {
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const hgt = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (w === this.width && hgt === this.height && dpr === this.dpr) return;

    this.width = w;
    this.height = hgt;
    this.dpr = dpr;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(hgt * dpr);

    const s = this.opts.spacing;
    this.cols = Math.floor(w / s) + 3;
    this.rows = Math.floor(hgt / s) + 3;
    this.originX = (w - (this.cols - 1) * s) / 2;
    this.originY = (hgt - (this.rows - 1) * s) / 2;

    const n = this.cols * this.rows;
    this.h = new Float32Array(n);
    this.v = new Float32Array(n);
    this.bucketXY = Array.from({ length: BUCKETS }, () => new Float32Array(n * 2));
    this.buildMask();
  }

  /** Rasterise the mask (text or path) at one pixel per dot and keep the cells it covers. */
  private buildMask() {
    const { maskText: text, maskPath, maskViewBox } = this.opts;
    if (!text && !maskPath) return;
    const { cols, rows } = this;
    const off = document.createElement("canvas");
    off.width = cols;
    off.height = rows;
    const g = off.getContext("2d", { willReadFrequently: true });
    if (!g) return;
    g.fillStyle = "#fff";

    if (maskPath) {
      const [vw, vh] = maskViewBox;
      const scale = Math.min((cols - 2) / vw, (rows - 2) / vh);
      g.translate((cols - vw * scale) / 2, (rows - vh * scale) / 2);
      g.scale(scale, scale);
      g.fill(new Path2D(maskPath));
      this.mask = this.readMask(g, cols, rows);
      return;
    }

    const family =
      getComputedStyle(document.documentElement).getPropertyValue("--font-clash-display").trim() || "sans-serif";
    let size = rows;
    g.font = `700 ${size}px ${family}`;
    const width = g.measureText(text).width;
    size = Math.min(rows * 1.05, (size * (cols - 2)) / width);
    g.font = `700 ${size}px ${family}`;
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    const m = g.measureText(text);
    const textHeight = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
    g.fillText(text, cols / 2, (rows + textHeight) / 2 - m.actualBoundingBoxDescent);
    this.mask = this.readMask(g, cols, rows);
  }

  private readMask(g: CanvasRenderingContext2D, cols: number, rows: number) {
    const data = g.getImageData(0, 0, cols, rows).data;
    const mask = new Uint8Array(cols * rows);
    for (let i = 0; i < mask.length; i++) mask[i] = data[i * 4 + 3] > 110 ? 1 : 0;

    this.rim = null;
    if (this.opts.rimHeat > 0) {
      const rim = new Float32Array(cols * rows);
      const out = (x: number, y: number) => x < 0 || y < 0 || x >= cols || y >= rows || !mask[y * cols + x];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          if (!mask[i]) continue;
          if (out(x + 1, y) || out(x + 2, y)) rim[i] = out(x + 1, y) ? 1 : 0.55;
          else if (out(x - 1, y) || out(x, y - 1) || out(x, y + 1)) rim[i] = 0.33;
        }
      }
      this.rim = rim;
    }
    return mask;
  }

  // ---------------------------------------------------------------- input

  private onPointerMove = (e: PointerEvent) => {
    this.pointerX = e.clientX;
    this.pointerY = e.clientY;
    this.lastMove = performance.now();
    if (!this.hasPointer) {
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    }
    this.hasPointer = true;
    this.pointerFresh = true;
    this.wake();
  };

  private onPointerDown = (e: PointerEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
    this.impulse(x, y, 14, 2.6);
  };

  private onPointerLeave = () => {
    this.hasPointer = false;
    this.wake();
  };

  /** The canvas moves under a resting pointer while scrolling; keep the lamp in sync. */
  private onScroll = () => {
    if (this.hasPointer && this.opts.lamp) this.wake();
  };

  private onVisibility = () => {
    this.visible = document.visibilityState === "visible";
    this.lastTime = 0;
    this.syncRunning();
  };

  private scheduleDrip(delay?: number) {
    if (this.dripTimer) clearTimeout(this.dripTimer);
    const mode = this.opts.drips;
    const wantsDrips = mode === "always" || (mode === "coarse" && this.coarse);
    const idle = !this.coarse && this.opts.idleDripAfter > 0;
    if (!wantsDrips && !idle) return;

    const wait = delay ?? (wantsDrips ? 1800 + Math.random() * 2200 : 4500 + Math.random() * 3500);
    this.dripTimer = setTimeout(() => {
      const idleLongEnough = performance.now() - this.lastMove > this.opts.idleDripAfter;
      if (this.visible && this.onScreen && (wantsDrips || idleLongEnough)) {
        const x = this.width * (0.15 + Math.random() * 0.7);
        const y = this.height * (0.15 + Math.random() * 0.7);
        this.impulse(x, y, wantsDrips ? 11 : 8, 2.4);
      }
      this.scheduleDrip();
    }, wait);
  }

  // ---------------------------------------------------------------- loop

  private wake() {
    if (this.reducedMotion) return;
    this.energy = Math.max(this.energy, 1);
    this.syncRunning();
  }

  private syncRunning() {
    const should = this.visible && this.onScreen && !this.reducedMotion && this.energy >= SETTLED;
    if (should && !this.running) this.start();
    else if (!should && this.running) this.stop();
  }

  private start() {
    this.running = true;
    this.lastTime = 0;
    this.raf = requestAnimationFrame(this.frame);
  }

  private stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private frame = (now: number) => {
    if (!this.running) return;
    const dt = this.lastTime ? Math.min((now - this.lastTime) / 1000, 0.1) : STEP;
    this.lastTime = now;
    this.rect = this.canvas.getBoundingClientRect();

    this.feedPointer();
    this.acc += dt;
    let steps = 0;
    while (this.acc >= STEP && steps < 4) {
      this.step();
      this.acc -= STEP;
      steps++;
    }
    if (steps === 4) this.acc = 0;

    const lampTarget = this.hasPointer && this.opts.lamp && this.pointerInside() ? 1 : 0;
    this.lampLevel += (lampTarget - this.lampLevel) * 0.12;
    if (Math.abs(lampTarget - this.lampLevel) < 0.01) this.lampLevel = lampTarget;

    this.render();
    this.rect = null;

    // Sleep once the surface is flat and the lamp has settled; input wakes it again.
    if (this.energy < SETTLED && this.lampLevel === lampTarget && !this.pointerFresh) {
      this.stop();
      return;
    }
    this.raf = requestAnimationFrame(this.frame);
  };

  private canvasRect() {
    return this.rect ?? this.canvas.getBoundingClientRect();
  }

  private pointerInside() {
    const rect = this.canvasRect();
    const x = this.pointerX - rect.left;
    const y = this.pointerY - rect.top;
    return x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
  }

  /** Turn pointer travel since last frame into a trail of impulses. */
  private feedPointer() {
    if (!this.pointerFresh) return;
    this.pointerFresh = false;
    const rect = this.canvasRect();
    const x1 = this.pointerX - rect.left;
    const y1 = this.pointerY - rect.top;
    const x0 = this.prevX - rect.left;
    const y0 = this.prevY - rect.top;
    this.prevX = this.pointerX;
    this.prevY = this.pointerY;

    const dist = Math.hypot(x1 - x0, y1 - y0);
    if (dist < 0.5) return;
    const inside = (x: number, y: number) => x > -40 && y > -40 && x < rect.width + 40 && y < rect.height + 40;
    if (!inside(x1, y1) && !inside(x0, y0)) return;

    const speed = Math.min(dist, 90);
    const strength = 0.9 + speed * 0.075;
    const stride = this.opts.spacing * 0.6;
    const count = Math.min(24, Math.ceil(dist / stride));
    for (let i = 1; i <= count; i++) {
      const t = i / count;
      this.impulse(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, strength / Math.sqrt(count), 1.9);
    }
  }

  private step() {
    const { cols, rows, h, v } = this;
    for (let y = 1; y < rows - 1; y++) {
      let i = y * cols + 1;
      for (let x = 1; x < cols - 1; x++, i++) {
        // 9-point stencil keeps rings round instead of diamond-shaped
        const lap =
          (4 * (h[i - 1] + h[i + 1] + h[i - cols] + h[i + cols]) +
            h[i - cols - 1] + h[i - cols + 1] + h[i + cols - 1] + h[i + cols + 1] -
            20 * h[i]) /
          6;
        v[i] = (v[i] + lap * TENSION - h[i] * RESTORE) * DAMPING;
      }
    }
    // Track the largest movement so the loop can sleep once nothing visible is left.
    let peak = 0;
    for (let i = 0; i < h.length; i++) {
      h[i] += v[i];
      const a = Math.abs(h[i]) + Math.abs(v[i]) * 4;
      if (a > peak) peak = a;
    }
    this.energy = peak;
    if (peak < SETTLED) {
      h.fill(0);
      v.fill(0);
      this.energy = 0;
    }
  }

  // ---------------------------------------------------------------- draw

  private render() {
    const { ctx, cols, rows, h, opts } = this;
    const s = opts.spacing;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);

    this.bucketCount.fill(0);
    const lamp = this.lampLevel;
    let lx = -1e5;
    let ly = -1e5;
    if (lamp > 0.01) {
      const rect = this.canvasRect();
      lx = this.pointerX - rect.left;
      ly = this.pointerY - rect.top;
    }
    const lampR2 = LAMP_RADIUS * LAMP_RADIUS;
    const mask = this.mask;
    if ((opts.maskText || opts.maskPath) && !mask) return;

    for (let y = 0; y < rows; y++) {
      const edgeY = y === 0 || y === rows - 1;
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        if (mask && !mask[i]) continue;
        const rimHeat = this.rim ? this.rim[i] * opts.rimHeat : 0;
        let px = this.originX + x * s;
        let py = this.originY + y * s;
        let heat = mask ? rimHeat : 0;
        if (!edgeY && x > 0 && x < cols - 1) {
          const gx = h[i + 1] - h[i - 1];
          const gy = h[i + cols] - h[i - cols];
          px += gx * DISPLACE;
          py += gy * DISPLACE;
          heat += Math.abs(h[i]) * HEAT_GAIN + Math.hypot(gx, gy) * HEAT_GAIN * 0.35;
        }
        if (lamp > 0.01) {
          const dx = px - lx;
          const dy = py - ly;
          const d2 = dx * dx + dy * dy;
          if (d2 < lampR2) {
            const f = 1 - Math.sqrt(d2) / LAMP_RADIUS;
            heat += f * Math.sqrt(f) * 0.7 * lamp;
          }
        }
        const b = heat >= 1 ? BUCKETS - 1 : Math.floor(heat * (BUCKETS - 1));
        const c = this.bucketCount[b]++;
        const arr = this.bucketXY[b];
        arr[c * 2] = px;
        arr[c * 2 + 1] = py;
      }
    }

    for (let b = 0; b < BUCKETS; b++) {
      const count = this.bucketCount[b];
      if (!count) continue;
      const arr = this.bucketXY[b];
      const r = this.bucketRadius[b];
      ctx.fillStyle = this.bucketFill[b];
      ctx.beginPath();
      for (let k = 0; k < count; k++) {
        const px = arr[k * 2];
        const py = arr[k * 2 + 1];
        ctx.moveTo(px + r, py);
        ctx.arc(px, py, r, 0, TAU);
      }
      ctx.fill();
    }

    // Bloom on the hottest dots
    if (this.glowSprite) {
      const firstHot = Math.floor(BUCKETS * 0.45);
      ctx.globalCompositeOperation = "lighter";
      for (let b = firstHot; b < BUCKETS; b++) {
        const count = this.bucketCount[b];
        if (!count) continue;
        const t = b / (BUCKETS - 1);
        const size = 10 + t * 26;
        ctx.globalAlpha = (t - 0.4) * 0.9;
        const arr = this.bucketXY[b];
        for (let k = 0; k < count; k++) {
          ctx.drawImage(this.glowSprite, arr[k * 2] - size / 2, arr[k * 2 + 1] - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }
  }
}
