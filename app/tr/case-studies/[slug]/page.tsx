import type { Metadata } from "next";
import { CaseStudyPage, caseMeta, caseParams } from "@/components/pages/CaseStudyPage";

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = caseParams;
// Only the slugs built above exist; anything else is a 404 rather than a page rendered on request.
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return caseMeta("tr", (await params).slug);
}

export default async function Page({ params }: Params) {
  return <CaseStudyPage lang="tr" slug={(await params).slug} />;
}
