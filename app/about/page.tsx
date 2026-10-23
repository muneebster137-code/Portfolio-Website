import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { about, allTestimonials, education } from "@/lib/profile";
import { processSteps } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/page/CtaBand";

export const metadata: Metadata = {
  title: "About | Muhammad Muneeb Bilal",
  description: "A founder and creative specialist who understands the client's need first and builds on their vision. The facts, the story and what clients say.",
};

// The story is written on three sheets of A4, the same paper the home page starts from.
const tilt = ["-rotate-[1.4deg]", "rotate-[0.8deg]", "-rotate-[0.4deg]"];

export default function AboutPage() {
  const [first, ...rest] = about.copy;
  return (
    <>
      <Reveal as="header" immediate className="mx-auto max-w-[1600px] px-5 md:px-10 pt-36 pb-24 grid lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] gap-14 items-end">
        <div>
          <p className="label text-fog" data-fade>About</p>
          <h1 className="type-x mt-8 text-[14vw] md:text-[clamp(56px,7.4vw,132px)] leading-[0.92]">
            <span className="block overflow-hidden"><span data-line className="block">{about.heading[0]}</span></span>
            <span className="block overflow-hidden"><span data-line className="block text-mist">{about.heading[1]}</span></span>
          </h1>
          <p data-fade className="mt-10 max-w-[460px] text-[18px] leading-[1.6] text-mist">{about.intro}</p>
        </div>
        <figure data-fade className="relative aspect-[4/5] w-full max-w-[460px] lg:justify-self-end overflow-hidden rounded-[6px] bg-carbon">
          <Image src="/images/muneeb-bilal.webp" alt="Portrait of Muhammad Muneeb Bilal" fill priority sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover grayscale" />
        </figure>
      </Reveal>

      <section aria-labelledby="facts-h" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24">
        <Reveal>
          <h2 id="facts-h" className="label text-fog" data-fade>Seven facts</h2>
        </Reveal>
        <Reveal as="ol" className="mt-10 border-t border-hair">
          {about.facts.map((f, i) => (
            <li key={f} data-rise className="grid grid-cols-[56px_minmax(0,1fr)] md:grid-cols-[120px_minmax(0,1fr)] items-baseline gap-4 py-6 md:py-8 border-b border-hair">
              <span className="label text-fog">{String(i + 1).padStart(2, "0")}</span>
              <span className={`type-m text-[24px] md:text-[clamp(28px,3vw,48px)] leading-[1.1] ${i === 6 ? "text-mist" : ""}`}>
                {i === 4 ? (
                  <Link href="/resume#certifications" className="underline decoration-hair decoration-1 underline-offset-[0.18em] hover:decoration-bone">{f}</Link>
                ) : (
                  f
                )}
              </span>
            </li>
          ))}
        </Reveal>
      </section>

      <section aria-labelledby="about-h" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-36">
        <Reveal>
          <h2 id="about-h" className="label text-fog" data-fade>About</h2>
          <p data-words className="type-c mt-10 text-[32px] md:text-[clamp(40px,4.6vw,80px)] leading-[1.05] max-w-[1200px]">{first}</p>
        </Reveal>
        <Reveal className="mt-20 grid md:grid-cols-2 gap-10 md:gap-16 md:pl-[25%]">
          {rest.map((p) => (
            <p key={p.slice(0, 20)} data-fade className="text-[17px] md:text-[18px] leading-[1.7] text-bone/80">{p}</p>
          ))}
        </Reveal>
        <Reveal className="mt-20 md:pl-[25%] grid sm:grid-cols-3 gap-8 border-t border-hair pt-8">
          {processSteps.map((s) => (
            <div key={s.n} data-fade>
              <p className="label text-fog">{s.n}</p>
              <p className="type-m text-[24px] mt-3">{s.title}</p>
              <p className="text-mist text-[15px] leading-[1.6] mt-2">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section aria-labelledby="story-h" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-36">
        <Reveal>
          <h2 id="story-h" className="label text-fog" data-fade>My story</h2>
        </Reveal>
        <Reveal className="mt-12 grid md:grid-cols-3 gap-6 md:gap-8">
          {about.story.map((part, i) => (
            <article key={i} data-rise className={`min-h-[56svh] md:min-h-0 md:aspect-[1/1.414] bg-[#F2EFE7] text-void p-7 md:p-9 flex flex-col justify-between shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ${tilt[i]}`}>
              <p className="label text-void/50">Part {i + 1}</p>
              <p className="type-c text-[22px] md:text-[clamp(20px,1.8vw,30px)] leading-[1.25] text-void/85">{part}</p>
              <p className="label text-void/35 self-end">{i + 1} / 3</p>
            </article>
          ))}
        </Reveal>
        <Reveal className="mt-24 md:mt-32">
          <p data-words className="type-c text-[30px] md:text-[clamp(36px,4vw,68px)] leading-[1.08] max-w-[1250px]">{about.storyClose}</p>
        </Reveal>
      </section>

      <section aria-labelledby="quotes-h" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-36">
        <Reveal>
          <h2 id="quotes-h" className="label text-fog" data-fade>What clients say</h2>
        </Reveal>
        <Reveal as="ul" className="mt-10 border-t border-hair">
          {allTestimonials.map((t) => (
            <li key={t.name} data-fade className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4 md:gap-16 py-10 border-b border-hair">
              <blockquote className="text-[19px] md:text-[22px] leading-[1.5] text-bone/90">&ldquo;{t.quote}&rdquo;</blockquote>
              <p className="text-[15px] leading-[1.6]">
                <span className="block">{t.name}</span>
                <span className="block text-mist">{t.title}</span>
                <span className="label text-fog block mt-3">{t.source}</span>
              </p>
            </li>
          ))}
        </Reveal>
      </section>

      <section aria-labelledby="edu-h" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-32">
        <Reveal className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-8 border-t border-hair pt-10">
          <h2 id="edu-h" className="label text-fog" data-fade>Education</h2>
          <div data-fade>
            <p className="type-x text-[30px] md:text-[clamp(32px,3.2vw,52px)] leading-[1.05]">{education.degree}</p>
            <p className="text-mist mt-4 text-[17px]">{education.detail}</p>
            <p className="text-bone/85 mt-1 text-[17px]">{education.standing}</p>
            <p className="text-mist mt-1 text-[17px]">{education.leadership}</p>
            <Link href="/resume" className="inline-block mt-8 text-[15px] underline decoration-bone/30 underline-offset-4 hover:decoration-bone">View full resume</Link>
          </div>
        </Reveal>
      </section>

      <CtaBand line="Have a vision?" />
    </>
  );
}
