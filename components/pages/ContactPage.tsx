import { Suspense } from "react";
import type { Lang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { ui } from "@/lib/ui";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/ContactForm";

export function ContactPage({ lang }: { lang: Lang }) {
  const { identity, contact } = content(lang);
  const t = ui[lang];
  return (
    <>
      <Reveal as="header" immediate className="mx-auto max-w-[1600px] px-5 md:px-10 pt-36 pb-16">
        <p className="label text-fog" data-fade>{t.pages.contact}</p>
        <h1 className="type-x mt-8 text-[14vw] md:text-[clamp(56px,7.4vw,132px)] leading-[0.92]">
          <span className="block overflow-hidden"><span data-line data-ink className="block">{contact.heading[0]}</span></span>
          <span className="block overflow-hidden"><span data-line data-ink className="block text-mist">{contact.heading[1]}</span></span>
        </h1>
        <p data-fade className="mt-10 max-w-[460px] text-[18px] leading-[1.6] text-mist">{contact.sub}</p>
      </Reveal>

      <section aria-label={t.nav.startProject} className="mx-auto max-w-[1600px] px-5 md:px-10 pb-36 grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-20 border-t border-hair pt-14">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
        <aside className="space-y-8 text-[17px]">
          <div>
            <p className="label text-fog">{t.contactForm.emailLabel}</p>
            <a href={`mailto:${identity.email}`} className="block mt-2 hover:text-signal transition-colors">{identity.email}</a>
          </div>
          <div>
            <p className="label text-fog">{t.contactForm.phone}</p>
            <a href={identity.phoneHref} className="block mt-2 hover:text-signal transition-colors">{identity.phone}</a>
          </div>
          <div>
            <p className="label text-fog">{t.contactForm.location}</p>
            <p className="mt-2">{identity.location}</p>
          </div>
          <div>
            <p className="label text-fog">{t.contactForm.linkedin}</p>
            <a href={identity.linkedin} className="block mt-2 hover:text-signal transition-colors">linkedin.com/in/muneeb-bilal-886481282</a>
          </div>
        </aside>
      </section>
    </>
  );
}
