"use client";

import { LocalLink as Link, useUI } from "@/components/i18n";

// The 404 words, in the language of the address that was asked for (/tr/... gets Turkish).
export function NotFoundText() {
  const t = useUI().notFound;
  return (
    <div className="relative text-center max-w-[720px]">
      <p className="label text-fog">{t.label}</p>
      <h1 id="nf-h" className="type-x mt-6 text-[15vw] md:text-[clamp(64px,9vw,150px)] leading-[0.9]">
        {t.title}<span className="text-signal">.</span>
      </h1>
      <p className="mt-8 text-[18px] leading-[1.6] text-mist">{t.body}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex h-14 items-center rounded-full bg-signal px-8 text-[16px] font-medium text-void hover:bg-bone transition-colors">{t.wake}</Link>
        <Link href="/case-studies" className="inline-flex h-14 items-center rounded-full px-8 text-[16px] ring-1 ring-bone/25 hover:ring-bone transition">{t.work}</Link>
      </div>
    </div>
  );
}
