import Image from "next/image";
import Link from "next/link";
import { featuredWork, keyNumbers, services, story } from "@/lib/site";

// The home story for visitors whose device asks for less motion: the same words and pictures,
// laid out still, with no pinned scrolling and no 3D.

export function StillIntro({ sheetBack }: { sheetBack?: string }) {
  return (
    <section id="intro" data-chapter="Reality" aria-label="Introduction" className="mx-auto max-w-[1600px] px-5 md:px-10 pt-36 pb-24">
      <p className="label text-fog">Founder and Creative Specialist</p>
      <div className="mt-8 grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-14 items-end">
        <div>
          <h1 className="type-x text-[15vw] md:text-[clamp(56px,8.4vw,150px)] leading-[0.9]">
            I bring visions to life<span className="text-signal">.</span>
          </h1>
          <p className="mt-8 max-w-[440px] text-[17px] leading-[1.6] text-mist">
            Social media, video, print, branding, websites, packaging and pitch decks from one creative engine. I start by understanding what you want people to feel, then I build everything around that vision.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/case-studies" className="inline-flex h-12 items-center rounded-full bg-bone px-6 text-[15px] font-medium text-void hover:bg-signal transition-colors">View case studies</Link>
            <Link href="/contact" className="inline-flex h-12 items-center rounded-full px-6 text-[15px] ring-1 ring-bone/25 hover:ring-bone transition">Start a project</Link>
          </div>
        </div>
        <div className="relative aspect-[1/1.414] w-full max-w-[380px] lg:justify-self-end bg-paper rotate-[2deg] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]" aria-hidden="true">
          {sheetBack ? (
            <Image src={sheetBack} alt="" fill sizes="380px" className="object-cover" />
          ) : (
            <svg viewBox="0 0 64 90" className="absolute inset-0 size-full">
              <circle cx="32" cy="40" r="16" fill="#FF4A1C" />
              <path d="M23 49 L25 32 L32 42 L39 32 L41 49" fill="none" stroke="#060708" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>

      <div data-chapter="Sketch" className="mt-28 grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-[1200px]">
        <p className="label text-fog md:col-span-2">02 · My story</p>
        {story.map((line, i) => (
          <p key={i} className="type-c text-[22px] md:text-[30px] leading-[1.25]">{line}</p>
        ))}
      </div>

      <dl className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-hair pt-8">
        {keyNumbers.map((k) => (
          <div key={k.label}>
            <dd className="type-x text-[44px] md:text-[64px] leading-none">{k.value}{k.suffix}</dd>
            <dt className="label text-fog mt-2">{k.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function StillWork({ images }: { images: Record<string, string | undefined> }) {
  return (
    <section id="work" data-chapter="Dream" aria-labelledby="still-work-h" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24">
      <p className="label text-fog">04 · Inside the dream</p>
      <h2 id="still-work-h" className="type-x mt-6 text-[11vw] md:text-[clamp(40px,5vw,88px)] leading-[0.95]">Work that started with a blank page</h2>
      <div className="mt-12 grid md:grid-cols-2 gap-x-8 gap-y-12">
        {featuredWork.map((w) => (
          <Link key={w.slug} href={`/case-studies/${w.slug}`} className="group block">
            <span className="relative block aspect-[16/10] overflow-hidden rounded-[10px] ring-1 ring-inset ring-hair" style={{ background: w.plate }}>
              {images[w.slug] && <Image src={images[w.slug]!} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />}
            </span>
            <span className="label text-fog block mt-4">Case {w.index} · {w.year}</span>
            <span className="type-x block text-[28px] md:text-[36px] leading-none mt-2 group-hover:text-signal transition-colors">{w.title}</span>
            <span className="block text-mist mt-2">{w.summary}</span>
          </Link>
        ))}
      </div>
      <Link href="/case-studies" className="inline-flex mt-12 h-12 items-center rounded-full px-6 text-[15px] ring-1 ring-bone/25 hover:ring-bone transition">All eleven case studies</Link>
    </section>
  );
}

export function StillServices({ label, intro = false }: { label?: string; intro?: boolean }) {
  return (
    <section id="services" data-chapter="Engine" aria-labelledby="still-services-h" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24">
      {label && <p className="label text-fog">{label}</p>}
      <h2 id="still-services-h" className={intro ? "type-x mt-6 text-[11vw] md:text-[clamp(40px,5vw,88px)] leading-[0.95] max-w-[1200px]" : "sr-only"}>
        {intro ? "One engine. Seven ways to bring your vision to life." : "All seven services"}
      </h2>
      <ul className={`${intro ? "mt-12" : ""} border-t border-hair`}>
        {services.map((s) => (
          <li key={s.code} className="border-b border-hair">
            <Link href={s.href} className="group grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_13rem] gap-2 md:gap-10 items-baseline py-6">
              <span className="type-m text-[26px] md:text-[34px] leading-tight group-hover:text-signal transition-colors">{s.name}</span>
              <span className="text-mist">{s.hook}</span>
              <span className="label text-fog md:text-right">{s.number} {s.unit}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
