import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { ImageResponse } from "next/og";
import { identity } from "./site";

// Share cards (the preview when a link is posted on WhatsApp, LinkedIn or X), rendered at build time.

export const OG_SIZE = { width: 1200, height: 630 };

// A site image cropped to the card's picture area, as a JPEG data URL (the card renderer can't read WebP).
export async function photo(publicPath: string | undefined, w = 520, h = 630) {
  if (!publicPath) return undefined;
  const file = path.join(process.cwd(), "public", publicPath);
  if (!fs.existsSync(file)) return undefined;
  const buf = await sharp(file).resize(w, h, { fit: "cover" }).jpeg({ quality: 82 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

export function card({ kicker, title, sub, image, color = "#FF4A1C" }: { kicker: string; title: string; sub?: string; image?: string; color?: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#060708", color: "#EEEAE1", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "64px 64px 56px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 3, color: "#8E929B", textTransform: "uppercase" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: color }} />
            {kicker}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: title.length > 18 ? 72 : 88, fontWeight: 700, lineHeight: 0.98, letterSpacing: -3 }}>{title}</div>
            {sub && <div style={{ display: "flex", marginTop: 24, fontSize: 28, lineHeight: 1.35, color: "#A9ADB5", maxWidth: 560 }}>{sub}</div>}
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#8E929B" }}>{identity.name} · Dreamt in pencil. Delivered in colour.</div>
        </div>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- rendered to an image, not a page
          <img src={image} width={520} height={630} style={{ objectFit: "cover", borderLeft: `10px solid ${color}` }} alt="" />
        ) : (
          <div style={{ display: "flex", width: 420, height: "100%", background: color }} />
        )}
      </div>
    ),
    OG_SIZE
  );
}
