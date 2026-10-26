import type { Metadata } from "next";
import { ServiceDetail, serviceMeta, serviceParams } from "@/components/pages/ServiceDetail";

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = serviceParams;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return serviceMeta("en", (await params).slug);
}

export default async function Page({ params }: Params) {
  return <ServiceDetail lang="en" slug={(await params).slug} />;
}
