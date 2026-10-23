import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon: the orange logo sketch from the first page of the story, on black.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#060708" }}>
        <svg width="140" height="140" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#FF4A1C" />
          <path d="M18 45 L21 19 L32 34 L43 19 L46 45" fill="none" stroke="#060708" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size
  );
}
