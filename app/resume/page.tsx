import type { Metadata } from "next";
import { ResumePage } from "@/components/pages/ResumePage";
import { pageCopy, pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta("en", "/resume", pageCopy.en.resume);

export default function Resume() {
  return <ResumePage lang="en" />;
}
