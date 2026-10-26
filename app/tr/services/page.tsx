import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { pageCopy, pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta("tr", "/services", pageCopy.tr.services);

export default function Page() {
  return <ServicesPage lang="tr" />;
}
