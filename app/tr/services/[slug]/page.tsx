import type { Metadata } from "next";
import { ServiceDetail, serviceMeta, serviceParams } from "@/components/pages/ServiceDetail";

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = serviceParams;
// Only the slugs built above exist; anything else is a 404 rather than a page rendered on request.
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return serviceMeta("tr", (await params).slug);
}

export default async function Page({ params }: Params) {
  return <ServiceDetail lang="tr" slug={(await params).slug} />;
}
