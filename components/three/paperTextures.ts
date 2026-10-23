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
const TOTAL = STROKES.reduce((s, st) => s + lengthOf(st.pts), 0);

export class SketchSheet {
  canvas = document.createElement("canvas");
  ctx: CanvasRenderingContext2D;
  base = document.createElement("canvas");
  texture: THREE.CanvasTexture;
  private last = "";

  constructor() {
    this.canvas.width = this.base.width = PW;
    this.canvas.height = this.base.height = PH;
    this.ctx = this.canvas.getContext("2d")!;
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

  // drawn: 0..1 of the total pencil length; ink: 0..1 for the colour that replaces the pencil.
  draw(drawn: number, ink: number) {
    const key = `${drawn.toFixed(3)}|${ink.toFixed(3)}`;
    if (key === this.last) return;
    this.last = key;
    const c = this.ctx;
    c.drawImage(this.base, 0, 0);

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
