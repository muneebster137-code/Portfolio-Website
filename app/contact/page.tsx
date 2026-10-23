import type { Metadata } from "next";
import { Suspense } from "react";
import { identity } from "@/lib/site";
import { contact } from "@/lib/profile";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Muhammad Muneeb Bilal",
  description: "Have a vision? Start a project with Muhammad Muneeb Bilal.",
};

export default function ContactPage() {
  return (
    <>
      <Reveal as="header" immediate className="mx-auto max-w-[1600px] px-5 md:px-10 pt-36 pb-16">
        <p className="label text-fog" data-fade>Contact</p>
        <h1 className="type-x mt-8 text-[14vw] md:text-[clamp(56px,7.4vw,132px)] leading-[0.92]">
          <span className="block overflow-hidden"><span data-line className="block">{contact.heading[0]}</span></span>
          <span className="block overflow-hidden"><span data-line className="block text-mist">{contact.heading[1]}</span></span>
        </h1>
        <p data-fade className="mt-10 max-w-[460px] text-[18px] leading-[1.6] text-mist">{contact.sub}</p>
      </Reveal>

      <section aria-label="Start a project" className="mx-auto max-w-[1600px] px-5 md:px-10 pb-36 grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-20 border-t border-hair pt-14">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
        <aside className="space-y-8 text-[17px]">
          <div>
            <p className="label text-fog">Email</p>
            <a href={`mailto:${identity.email}`} className="block mt-2 hover:text-signal transition-colors">{identity.email}</a>
          </div>
          <div>
            <p className="label text-fog">Phone</p>
            <a href={identity.phoneHref} className="block mt-2 hover:text-signal transition-colors">{identity.phone}</a>
          </div>
          <div>
            <p className="label text-fog">Location</p>
            <p className="mt-2">{identity.location}</p>
          </div>
          <div>
            <p className="label text-fog">LinkedIn</p>
            <a href={identity.linkedin} className="block mt-2 hover:text-signal transition-colors">linkedin.com/in/muneeb-bilal-886481282</a>
          </div>
        </aside>
      </section>
    </>
  );
}
