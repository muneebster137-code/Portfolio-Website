import { testimonials } from "@/lib/site";
import { featuredCerts } from "@/lib/profile";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/page/SectionHead";
import { ProofWall } from "@/components/page/ProofWall";
import { proofLogos, proofNotes } from "@/lib/proof.server";

// What clients say: one quote read slowly, then the rest pinned to a wall; the credentials sit underneath.
export function Proof() {
  const [lead] = testimonials;
  return (
    <section id="proof" data-chapter="Proof" className="relative bg-void border-t border-hair" aria-labelledby="proof-h">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-36 md:py-44">
        <Reveal>
          <SectionHead id="proof-h" label="Testimonials" title="What clients say" />
          <figure className="mt-14">
            <blockquote data-words className="type-c text-[30px] md:text-[clamp(40px,4.4vw,76px)] leading-[1.08] max-w-[1300px]">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="label text-fog mt-8" data-fade>{lead.name} · {lead.title}</figcaption>
          </figure>
        </Reveal>

        <div className="mt-28">
          <p className="label text-fog">Pinned to the wall · pick one up to read it</p>
          <ProofWall notes={proofNotes(lead.name)} logos={proofLogos()} />
        </div>

        <Reveal className="mt-32 pt-10 border-t border-hair grid md:grid-cols-[auto_1fr] gap-6 md:gap-16 items-baseline">
          <p className="type-x text-[64px] md:text-[88px] leading-none" data-fade>30+</p>
          <div data-fade>
            <p className="text-[18px] text-bone/85">Certifications from international institutions. Six featured, each with its verification link.</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-10">
              {featuredCerts.map((c) => (
                <li key={c.n} className="border-t border-hair py-3">
                  <a href={c.url} target="_blank" rel="noreferrer" className="block text-[15px] leading-snug hover:text-signal transition-colors">{c.course}</a>
                  <span className="label text-fog">{c.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
