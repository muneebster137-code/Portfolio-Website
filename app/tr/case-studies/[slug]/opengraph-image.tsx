import { OG, caseCard } from "@/lib/og-pages";
import { caseParams } from "@/components/pages/CaseStudyPage";

// Each one's share card: its picture, title and line, in its own colour.
export const alt = "Vaka çalışması · Muhammad Muneeb Bilal";
export const size = OG.size;
export const contentType = OG.contentType;
export const generateStaticParams = caseParams;
export const dynamicParams = false;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return caseCard("tr", (await params).slug);
}
