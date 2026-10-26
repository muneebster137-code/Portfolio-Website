import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { pageCopy, pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta("tr", "/", pageCopy.tr.home);

export default function Home() {
  return <HomePage lang="tr" />;
}
