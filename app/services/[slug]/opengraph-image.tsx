import { OG, serviceCard } from "@/lib/og-pages";
import { serviceParams } from "@/components/pages/ServiceDetail";

// Each one's share card: its picture, title and line, in its own colour.
export const alt = "Service · Muhammad Muneeb Bilal";
export const size = OG.size;
export const contentType = OG.contentType;
export const generateStaticParams = serviceParams;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return serviceCard("en", (await params).slug);
}
