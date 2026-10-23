import * as THREE from "three";
import type { Service } from "@/lib/site";

export const CARD_W = 2;
export const CARD_H = 3;

const fontVar = (name: string, fallback: string) =>
  getComputedStyle(document.body).getPropertyValue(name).trim() || fallback;

// Draws one Pantone-style swatch card (colour field, bone label strip, pivot rivet) onto a canvas texture.
export function makeSwatchTexture(service: Service, index: number): THREE.CanvasTexture {
  const w = 600;
  const h = 900;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const mono = fontVar("--font-geist-mono", "monospace");
  const display = fontVar("--font-archivo", "sans-serif");

  const r = 34;
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, r);
  ctx.clip();

  ctx.fillStyle = "#EEEAE1";
  ctx.fillRect(0, 0, w, h);

  const field = h * 0.66;
  ctx.fillStyle = service.color === "#EEEAE1" ? "#1B1E24" : service.color;
  ctx.fillRect(0, 0, w, field);

  ctx.fillStyle = service.color === "#EEEAE1" ? "#EEEAE1" : service.ink;
  ctx.globalAlpha = 0.85;
  ctx.font = `500 26px ${mono}`;
  ctx.fillText(`N°${String(index + 1).padStart(2, "0")}`, 36, 60);
  ctx.textAlign = "right";
  ctx.fillText(service.unit.toUpperCase(), w - 36, 60);
  ctx.globalAlpha = 1;
  ctx.textAlign = "left";
  ctx.font = `900 120px ${display}`;
  ctx.fontStretch = "expanded";
  ctx.fillText(service.number, 32, field - 36);
  ctx.fontStretch = "normal";

  ctx.fillStyle = "#060708";
  ctx.font = `500 30px ${mono}`;
  ctx.fillText(service.code, 36, field + 70);
  ctx.font = `800 52px ${display}`;
  ctx.fillText(service.short.toUpperCase(), 34, field + 140);
  ctx.fillStyle = "#5E626B";
  ctx.font = `400 24px ${mono}`;
  ctx.fillText("MUHAMMAD MUNEEB BILAL", 36, h - 44);

  ctx.beginPath();
  ctx.arc(w - 58, h - 58, 18, 0, Math.PI * 2);
  ctx.fillStyle = "#060708";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#8E929B";
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}
