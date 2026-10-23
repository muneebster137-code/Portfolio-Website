import { ImageResponse } from "next/og";

export const alt = "Muhammad Muneeb Bilal, Founder and Creative Specialist. I bring visions to life.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The card shown when the site is shared on WhatsApp, LinkedIn or X.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#060708", color: "#EEEAE1", padding: "72px 80px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, color: "#8E929B", textTransform: "uppercase" }}>Muhammad Muneeb Bilal</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4 }}>
            <span>I bring visions</span>
            <span style={{ display: "flex" }}>
              to life<span style={{ color: "#FF4A1C" }}>.</span>
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#A9ADB5" }}>Founder and Creative Specialist · Islamabad, Pakistan</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 330 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 300, height: 424, background: "#F2EFE7", transform: "rotate(4deg)" }}>
            <svg width="220" height="220" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="#FF4A1C" />
              <path d="M19 44 L21.5 20 L32 34 L42.5 20 L45 44" fill="none" stroke="#060708" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    ),
    size
  );
}
