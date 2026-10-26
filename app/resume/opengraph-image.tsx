import { OG_SIZE, card } from "@/lib/og";

export const alt = "Resume of Muhammad Muneeb Bilal, Founder and Creative Specialist.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return card({ kicker: "Resume", title: "Muhammad Muneeb Bilal", sub: "Founder and Creative Specialist · Islamabad, Pakistan", image: undefined });
}
