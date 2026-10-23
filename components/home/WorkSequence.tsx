"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredWork } from "@/lib/site";
import { SketchHover } from "@/components/fx/SketchHover";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { StillWork } from "./StillScenes";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [...featuredWork.map((w) => ({ ...w, end: false })), { slug: "all", title: "All eleven case studies", summary: "From a first internship to a five-unit education group.", year: "2022 to 2026", index: "", end: true, tag: undefined, via: undefined, plate: "" }];

// Shot 04, inside the dream: one case at a time, full size. Only the one in focus has colour;
// the others wait in the dark, turned away.
export function WorkSequence({ images }: { images: Record<string, string | undefined> }) {
  const reduced = useReducedMotion();
  return reduced ? <StillWork images={images} /> : <AnimatedWork images={images} />;
}

function AnimatedWork({ images }: { images: Record<string, string | undefined> }) {
  const wrap = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const caption = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    const n = SLIDES.length;
    const place = (head: number) => {
      cards.current.forEach((el, i) => {
        if (!el) return;
        const d = i - head;
        const a = Math.min(Math.abs(d), 1.4);
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          x: `${d * 64}vw`,
          z: -a * 320,
          rotationY: -d * 24,
          scale: 1 - a * 0.1,
          filter: `grayscale(${Math.min(a, 1)}) brightness(${1 - Math.min(a, 1) * 0.6})`,
          autoAlpha: Math.max(0, 1 - Math.max(0, Math.abs(d) - 1.3)),
          zIndex: 100 - Math.round(Math.abs(d) * 10),
        });
      });
    };
    place(0);
    const st = ScrollTrigger.create({
      trigger: wrap.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const head = self.progress * (n - 1);
        place(head);
        setIndex(Math.round(head));
      },
    });
    return () => st.kill();
  }, []);

  useLayoutEffect(() => {
    if (!caption.current) return;
    const tw = gsap.fromTo(caption.current.children, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05, ease: "power3.out" });
    return () => {
      tw.kill();
    };
  }, [index]);

  const s = SLIDES[index];

  return (
    <section ref={wrap} id="work" data-chapter="Work" className="relative h-[560svh] bg-void" aria-labelledby="work-h">
      <div className="sticky top-0 h-svh overflow-hidden">
        <p className="absolute left-5 md:left-10 top-28 label text-fog z-[200]">04 · Inside the dream</p>
        <h2 id="work-h" className="sr-only">Selected case studies</h2>

        <div className="absolute inset-0 [perspective:1800px]">
          {SLIDES.map((w, i) => (
            <Link
              key={w.slug}
              ref={(el) => { cards.current[i] = el; }}
              href={w.end ? "/case-studies" : `/case-studies/${w.slug}`}
              tabIndex={i === index ? 0 : -1}
              aria-label={w.end ? "See all eleven case studies" : `${w.title} case study`}
              className="absolute left-1/2 top-[40%] block w-[min(84vw,52svh)] md:w-[min(62vw,92svh,1080px)] aspect-[4/5] md:aspect-[16/10] rounded-[20px] overflow-hidden bg-carbon will-change-transform"
            >
              {w.end ? (
                <span className="absolute inset-0 grid place-items-center text-center ring-1 ring-inset ring-bone/15 rounded-[20px]">
                  <span>
                    <span className="label text-fog block">Case studies</span>
                    <span className="type-x block text-[12vw] md:text-[6vw] leading-[0.95] mt-4">All eleven</span>
                  </span>
                </span>
              ) : (
                images[w.slug] ? (
                  <>
                    <Image src={images[w.slug]!} alt="" fill sizes="(min-width: 768px) 64vw, 86vw" className="object-cover" priority={i === 0} />
                    <SketchHover src={images[w.slug]} />
                  </>
                ) : (
                  <span className="absolute inset-0 grid place-items-center text-center label text-fog">Image to come</span>
                )
              )}
            </Link>
          ))}
        </div>

        <div ref={caption} key={index} className="absolute inset-x-5 md:inset-x-10 bottom-10 md:bottom-12 z-[200] grid md:grid-cols-[1fr_auto] items-end gap-4 pointer-events-none">
          <div>
            <p className="label text-fog">
              {s.end ? "Index" : `Case ${s.index} · ${s.year}${s.via ? " · via Watch How Malaysia" : ""}`}
            </p>
            <p className="type-x text-[9vw] md:text-[clamp(36px,3.6vw,60px)] leading-none mt-3">{s.title}</p>
            <p className="text-mist mt-3 max-w-[520px]">{s.summary}</p>
          </div>
          <p className="label text-fog tabular-nums">{String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}</p>
        </div>
      </div>
    </section>
  );
}
