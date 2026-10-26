import type { Metadata } from "next";
import { ResumePage } from "@/components/pages/ResumePage";
import { pageCopy, pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta("tr", "/resume", pageCopy.tr.resume);

export default function Resume() {
  return <ResumePage lang="tr" />;
}
