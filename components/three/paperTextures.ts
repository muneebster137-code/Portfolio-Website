import * as THREE from "three";

// The sheet is 1024 × 1448 px: A4 proportions.
const PW = 1024;
const PH = 1448;

type Pt = [number, number];

const circle = (cx: number, cy: number, r: number, turns = 1.12, wobble = 7): Pt[] =>
  Array.from({ length: 90 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 89) * Math.PI * 2 * turns;
    const rr = r + Math.sin(i * 0.7) * wobble * (i / 89);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });

const quad = (a: Pt, c: Pt, b: Pt, n = 30): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]];
  });

const scribble = (x0: number, x1: number, y: number): Pt[] =>
  Array.from({ length: 40 }, (_, i) => [x0 + ((x1 - x0) * i) / 39, y + Math.sin(i * 1.9) * 7 + Math.cos(i * 0.6) * 3]);

// A first logo sketch, stroke by stroke: construction lines, a frame, an M, a swash, a note to self.
const STROKES: { pts: Pt[]; light?: boolean }[] = [
  { pts: [[90, 600], [934, 600]], light: true },
  { pts: [[512, 200], [512, 1000]], light: true },
  { pts: circle(512, 600, 290) },
  { pts: [[372, 760], [395, 455], [512, 640], [629, 455], [652, 760]] },
  { pts: quad([318, 860], [512, 960], [716, 830]) },
  { pts: quad([800, 330], [790, 410], [705, 440]) },
  { pts: [[720, 418], [704, 441], [730, 452]] },
  { pts: scribble(290, 740, 1130) },
  { pts: scribble(290, 600, 1180) },
];

const lengthOf = (pts: Pt[]) => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
export const TOTAL = STROKES.reduce((s, st) => s + lengthOf(st.pts), 0);

// The first construction line: where the preloader's pencil line lands, and how much of the sketch it is.
export const FIRST_LINE = STROKES[0].pts as [Pt, Pt];
export const FIRST = lengthOf(STROKES[0].pts) / TOTAL;

// Sheet pixels to the sheet's own units (centre origin, y up).
export const toSheet = ([x, y]: Pt, w: number, h: number): Pt => [(x / PW - 0.5) * w, (0.5 - y / PH) * h];

// Real paper is never a perfect rectangle: an alpha mask with slightly uneven edges and soft corners.
function deckleMask() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1448;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 1024, 1448);
  const m = 5;
  let i = 0;
  // Smooth irregularity (a few gentle waves plus a little grit), never a saw-tooth.
  const jag = () => {
    i++;
    return Math.sin(i * 0.21) * 0.7 + Math.sin(i * 0.67 + 2) * 0.35 + (Math.random() - 0.5) * 0.4;
  };
  const pts: Pt[] = [];
  for (let x = m; x <= 1024 - m; x += 6) pts.push([x, m + jag()]);
  for (let y = m; y <= 1448 - m; y += 6) pts.push([1024 - m + jag(), y]);
  for (let x = 1024 - m; x >= m; x -= 6) pts.push([x, 1448 - m + jag()]);
  for (let y = 1448 - m; y >= m; y -= 6) pts.push([m + jag(), y]);
  ctx.filter = "blur(0.8px)";
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  pts.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fill();
  const t = new THREE.CanvasTexture(c);
  return t;
}

export class SketchSheet {
  canvas = document.createElement("canvas");
  ctx: CanvasRenderingContext2D;
  base = document.createElement("canvas");
  texture: THREE.CanvasTexture;
  mask = deckleMask();
  // Marks the visitor makes with the cursor before the story starts.
  doodle = document.createElement("canvas");
  private dctx: CanvasRenderingContext2D;
  private doodleRev = 0;
  private lastDoodle: Pt | null = null;
  // Pixels of line the visitor has drawn since the last frame read it (for the pencil sound).
  doodleInk = 0;
  private last = "";

  constructor() {
    this.canvas.width = this.base.width = PW;
    this.canvas.height = this.base.height = PH;
    this.ctx = this.canvas.getContext("2d")!;
    this.doodle.width = PW;
    this.doodle.height = PH;
    this.dctx = this.doodle.getContext("2d")!;
    const b = this.base.getContext("2d")!;
    b.fillStyle = "#F2EFE7";
    b.fillRect(0, 0, PW, PH);
    // Paper tooth: faint grain so the sheet reads as paper under light, not a white card.
    const img = b.getImageData(0, 0, PW, PH);
    for (let i = 0; i < img.data.length; i += 4) {
      const n = (Math.random() - 0.5) * 10;
      img.data[i] += n;
      img.data[i + 1] += n;
      img.data[i + 2] += n;
    }
    b.putImageData(img, 0, 0);
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 8;
    this.draw(0, 0);
  }

  // A faint pencil mark at a point on the sheet (uv, 0..1); `fresh` starts a new stroke.
  scribble(u: number, v: number, fresh: boolean) {
    const p: Pt = [u * PW, (1 - v) * PH];
    const d = this.dctx;
    if (!fresh && this.lastDoodle && Math.hypot(p[0] - this.lastDoodle[0], p[1] - this.lastDoodle[1]) < 160) {
      d.strokeStyle = "rgba(38,40,46,0.55)";
      d.lineWidth = 3;
      d.lineCap = "round";
      d.beginPath();
      d.moveTo(this.lastDoodle[0], this.lastDoodle[1]);
      d.lineTo(p[0], p[1]);
      d.stroke();
      this.doodleRev++;
      this.doodleInk += Math.hypot(p[0] - this.lastDoodle[0], p[1] - this.lastDoodle[1]);
    }
    this.lastDoodle = p;
  }

  // Where the pencil point is when `drawn` of the sketch is done, in sheet pixels.
  tipAt(drawn: number): Pt {
    let budget = drawn * TOTAL;
    for (const st of STROKES) {
      const len = lengthOf(st.pts);
      if (budget <= len) {
        for (let i = 1; i < st.pts.length; i++) {
          const [x0, y0] = st.pts[i - 1];
          const [x1, y1] = st.pts[i];
          const seg = Math.hypot(x1 - x0, y1 - y0);
          if (budget <= seg) return [x0 + ((x1 - x0) * budget) / seg, y0 + ((y1 - y0) * budget) / seg];
          budget -= seg;
        }
      }
      budget -= len;
    }
    const end = STROKES[STROKES.length - 1].pts;
    return end[end.length - 1];
  }

  // drawn: 0..1 of the total pencil length; ink: 0..1 for the colour that replaces the pencil;
  // doodle: how much of the visitor's own marks still show (they are rubbed out as the story starts).
  draw(drawn: number, ink: number, doodle = 1) {
    const key = `${drawn.toFixed(3)}|${ink.toFixed(3)}|${doodle.toFixed(2)}|${this.doodleRev}`;
    if (key === this.last) return;
    this.last = key;
    const c = this.ctx;
    c.drawImage(this.base, 0, 0);
    if (doodle > 0 && this.doodleRev) {
      c.globalAlpha = doodle;
      c.drawImage(this.doodle, 0, 0);
      c.globalAlpha = 1;
    }

    if (ink > 0) {
      c.globalAlpha = ink;
      c.fillStyle = "#FF4A1C";
      c.beginPath();
      c.arc(512, 600, 290, 0, Math.PI * 2);
      c.fill();
      c.globalAlpha = 1;
    }

    let budget = drawn * TOTAL;
    c.lineCap = "round";
    c.lineJoin = "round";
    for (const st of STROKES) {
      if (budget <= 0) break;
      c.strokeStyle = st.light ? "rgba(40,42,48,0.22)" : `rgba(${ink > 0.5 ? "6,7,8" : "38,40,46"},0.88)`;
      c.lineWidth = st.light ? 2 : 5;
      for (const shift of st.light ? [0] : [0, 1.6]) {
        let left = budget;
        c.beginPath();
        c.moveTo(st.pts[0][0] + shift, st.pts[0][1] - shift);
        for (let i = 1; i < st.pts.length && left > 0; i++) {
          const [x0, y0] = st.pts[i - 1];
          const [x1, y1] = st.pts[i];
          const seg = Math.hypot(x1 - x0, y1 - y0);
          const t = Math.min(1, left / seg);
          c.lineTo(x0 + (x1 - x0) * t + shift, y0 + (y1 - y0) * t - shift);
          left -= seg;
        }
        c.stroke();
      }
      budget -= lengthOf(st.pts);
    }

    if (ink > 0) {
      const mono = getComputedStyle(document.body).getPropertyValue("--font-geist-mono").trim() || "monospace";
      c.globalAlpha = ink;
      [["#FF4A1C", "#FF4A1C"], ["#EEEAE1", "#EEEAE1"], ["#1B1E24", "#1B1E24"]].forEach(([fill, label], i) => {
        const x = 610 + i * 118;
        c.fillStyle = fill;
        c.fillRect(x, 1240, 96, 110);
        c.strokeStyle = "rgba(6,7,8,0.25)";
        c.lineWidth = 2;
        c.strokeRect(x, 1240, 96, 110);
        c.fillStyle = "#060708";
        c.font = `500 15px ${mono}`;
        c.fillText(label, x, 1374);
      });
      c.globalAlpha = 1;
    }
    this.texture.needsUpdate = true;
  }
}

const WORK = [
  "/images/anebos-studios-artifact-1.webp",
  "/images/trenddeck-artifact-1.webp",
  "/images/aba-group-artifact-1.webp",
  "/images/treats-for-life-artifact-1.webp",
  "/images/beatrix-konnect-artifact-1.webp",
  "/images/bakebox-artifact-1.webp",
  "/images/ndrmf-artifact-1.webp",
  "/images/tim-hortons-artifact-1.webp",
];

// The other side of the sheet: the work it turned into, laid out like contact sheets on a light table.
export function makeWorkSide(onReady: () => void) {
  const c = document.createElement("canvas");
  c.width = PW;
  c.height = PH;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0B0C0E";
  ctx.fillRect(0, 0, PW, PH);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const gap = 18;
  const cols = 2;
  const cw = (PW - gap * (cols + 1)) / cols;
  const ch = (PH - gap * 5) / 4;
  let loaded = 0;
  WORK.forEach((src, i) => {
    const img = new Image();
    img.onload = () => {
      const x = gap + (i % cols) * (cw + gap);
      const y = gap + Math.floor(i / cols) * (ch + gap);
      const s = Math.max(cw / img.width, ch / img.height);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, cw, ch, 14);
      ctx.clip();
      ctx.drawImage(img, x + (cw - img.width * s) / 2, y + (ch - img.height * s) / 2, img.width * s, img.height * s);
      ctx.restore();
      tex.needsUpdate = true;
      if (++loaded === WORK.length) onReady();
    };
    img.src = src;
  });
  return tex;
}
