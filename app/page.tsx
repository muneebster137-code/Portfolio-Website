import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { pageCopy, pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta("en", "/", pageCopy.en.home);

export default function Home() {
  return <HomePage lang="en" />;
}
