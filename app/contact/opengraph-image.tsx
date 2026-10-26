import { OG_SIZE, card } from "@/lib/og";

export const alt = "Have a vision? Start a project with Muhammad Muneeb Bilal.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return card({ kicker: "Contact", title: "Have a vision?", sub: "Let's bring it to life. Start a project with Muhammad Muneeb Bilal.", image: undefined });
}
