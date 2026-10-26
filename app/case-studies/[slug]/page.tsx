import type { Metadata } from "next";
import { CaseStudyPage, caseMeta, caseParams } from "@/components/pages/CaseStudyPage";

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = caseParams;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return caseMeta("en", (await params).slug);
}

export default async function Page({ params }: Params) {
  return <CaseStudyPage lang="en" slug={(await params).slug} />;
}
