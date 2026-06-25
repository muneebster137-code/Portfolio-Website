import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/case-studies";
import { CaseStudyTemplate } from "@/components/CaseStudyTemplate";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Generate static paths at build-time for all non-custom case studies
  return caseStudies
    .filter((study) => study.slug !== "aba-group")
    .map((study) => ({
      slug: study.slug,
    }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Find case study
  const study = caseStudies.find((cs) => cs.slug === slug);

  // Return 404 if case study not found or is aba-group (handled separately)
  if (!study || slug === "aba-group") {
    notFound();
  }

  return <CaseStudyTemplate study={study} />;
}
