"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type ComponentProps } from "react";
import { langFromPath, localize, type Lang } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { content } from "@/lib/content";

// The language of the page being shown, read from its address (so it works anywhere, layout included).
export const useLang = (): Lang => langFromPath(usePathname());
export const useUI = () => ui[useLang()];
export const useContent = () => content(useLang());

// next/link that keeps you in the language you are reading: <LocalLink href="/contact"> goes to
// /tr/contact on Turkish pages. Server components can use it too.
export const LocalLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link> & { lang?: Lang }>(function LocalLink({ href, lang, ...rest }, ref) {
  const current = useLang();
  const to = typeof href === "string" ? localize(lang ?? current, href) : href;
  return <Link ref={ref} href={to} {...rest} />;
});
