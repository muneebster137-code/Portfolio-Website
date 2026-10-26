import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { pageCopy, pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta("en", "/about", pageCopy.en.about);

export default function About() {
  return <AboutPage lang="en" />;
}
