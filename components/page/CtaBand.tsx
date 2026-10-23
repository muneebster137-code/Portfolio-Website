import Link from "next/link";
import { identity } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";

// Every page ends with a clear next step (copy guideline). `service` pre-selects it in the contact form.
export function CtaBand({ line, service }: { line: string; service?: string }) {
  const href = service ? `/contact?service=${service}` : "/contact";
  return (
    <Reveal as="section" className="relative border-t border-hair" aria-label="Start a project">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8 py-24 md:py-32">
        <p className="label text-fog" data-fade>Next step</p>
        <h2 className="mt-6 uppercase leading-[0.86]">
          <span className="block overflow-hidden"><span data-line className="block type-x text-[11vw] md:text-[7vw]">{line}</span></span>
          <span className="block overflow-hidden"><span data-line className="block type-c font-light text-mist text-[11vw] md:text-[6vw]">Start a project.</span></span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-3" data-fade>
          <Link href={href} className="inline-flex h-16 items-center gap-3 rounded-full bg-signal px-8 text-lg font-medium text-void hover:bg-bone transition-colors">
            Start a project
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
          </Link>
          <a href={`mailto:${identity.email}`} className="inline-flex h-16 items-center rounded-full border border-bone/25 px-7 hover:border-bone">{identity.email}</a>
          <a href={identity.phoneHref} className="inline-flex h-16 items-center rounded-full border border-bone/25 px-7 hover:border-bone">{identity.phone}</a>
        </div>
      </div>
    </Reveal>
  );
}
