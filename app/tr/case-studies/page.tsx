import type { Metadata } from "next";
import { CaseStudiesPage } from "@/components/pages/CaseStudiesPage";
import { pageCopy, pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta("tr", "/case-studies", pageCopy.tr.caseStudies);

export default function Page() {
  return <CaseStudiesPage lang="tr" />;
}
