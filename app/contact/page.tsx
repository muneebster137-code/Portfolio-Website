import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { pageCopy, pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta("en", "/contact", pageCopy.en.contact);

export default function Contact() {
  return <ContactPage lang="en" />;
}
