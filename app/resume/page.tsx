import type { Metadata } from "next";
import { identity } from "@/lib/site";
import { certifications, education, experience, resumeNumbers, resumeSummary, sideProjects, skills } from "@/lib/profile";
import { Reveal } from "@/components/motion/Reveal";
import { PrintButton } from "@/components/page/PrintButton";

export const metadata: Metadata = {
  title: "Resume | Muhammad Muneeb Bilal",
  description: "Experience, education, certifications and side projects of Muhammad Muneeb Bilal.",
};

const Section = ({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) => (
  <Reveal as="section" id={id} aria-label={title} className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] gap-6 md:gap-12 border-t border-hair pt-8 mt-20 print:mt-8 print:break-inside-avoid-page">
    <h2 className="type-x text-[28px] md:text-[clamp(28px,2.6vw,44px)] leading-[1.05]" data-fade>{title}</h2>
    <div data-fade>{children}</div>
  </Reveal>
);

export default function ResumePage() {
  return (
    <article className="resume mx-auto max-w-[1600px] px-5 md:px-10 pt-36 pb-36 print:pt-0 print:pb-0">
      <Reveal as="header" immediate className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="label text-fog" data-fade>Resume</p>
          <h1 className="type-x mt-8 text-[12vw] md:text-[clamp(52px,6.4vw,112px)] leading-[0.92]">
            <span className="block overflow-hidden"><span data-line data-ink className="block">{identity.name}</span></span>
          </h1>
          <p data-fade className="mt-6 text-[18px] text-mist">{identity.role}</p>
          <p data-fade className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[15px] text-bone/80">
            <a href={`mailto:${identity.email}`} className="hover:text-signal">{identity.email}</a>
            <a href={identity.phoneHref} className="hover:text-signal">{identity.phone}</a>
            <span>Islamabad, Pakistan</span>
            <a href={identity.linkedin} className="hover:text-signal">linkedin.com/in/muneeb-bilal-886481282</a>
          </p>
        </div>
        <div data-fade className="print:hidden">
          <PrintButton />
        </div>
      </Reveal>

      <Section title="Summary">
        <p className="type-c text-[24px] md:text-[clamp(26px,2.4vw,38px)] leading-[1.2]">{resumeSummary}</p>
        <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2 label text-fog">
          {resumeNumbers.map((n) => <span key={n}>{n}</span>)}
        </p>
      </Section>

      <Section title="Experience">
        <ol>
          {experience.map((x, i) => (
            <li key={i} className="grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[80px_minmax(0,2fr)_minmax(0,3fr)] gap-x-6 gap-y-1 py-5 border-b border-hair first:pt-0">
              <span className="label text-fog pt-1">{x.year}</span>
              <span className="text-[17px] leading-snug">{x.role}</span>
              <span className="col-start-2 md:col-start-auto text-[15px] leading-[1.6] text-mist">{x.detail}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Education">
        <p className="type-m text-[24px] md:text-[30px] leading-tight">{education.degree}</p>
        <p className="text-mist mt-3">{education.detail}</p>
        <p className="text-bone/85 mt-1">{education.standing}</p>
        <p className="text-mist mt-1">{education.leadership}</p>
      </Section>

      <Section title="Skills and tools">
        <ul className="grid sm:grid-cols-2 gap-x-10">
          {skills.map((s) => <li key={s} className="py-2.5 border-b border-hair text-[16px]">{s}</li>)}
        </ul>
      </Section>

      <Section title="Side projects">
        <ul>
          {sideProjects.map((p) => (
            <li key={p.company} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_56px] gap-6 py-3 border-b border-hair text-[16px]">
              <span>{p.company}</span>
              <span className="text-mist">{p.work}</span>
              <span className="label text-fog text-right pt-1">{p.year}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="certifications" title="Certifications">
        <p className="text-[17px] text-bone/85">30+ certifications from reputable international institutions. Thirteen are listed here, each with its verification link.</p>
        <ol className="mt-6">
          {certifications.map((c) => (
            <li key={c.n} className="grid grid-cols-[40px_minmax(0,1fr)] md:grid-cols-[48px_minmax(0,2fr)_minmax(0,1.4fr)_96px] gap-x-6 gap-y-1 py-4 border-b border-hair">
              <span className="label text-fog pt-1">{String(c.n).padStart(2, "0")}</span>
              <a href={c.url} target="_blank" rel="noreferrer" className="text-[16px] leading-snug underline decoration-hair underline-offset-4 hover:decoration-bone">{c.course}</a>
              <span className="col-start-2 md:col-start-auto text-[15px] text-mist">{c.issuer}</span>
              <span className="col-start-2 md:col-start-auto label text-fog md:text-right pt-1">{c.issued}</span>
            </li>
          ))}
        </ol>
      </Section>
    </article>
  );
}
