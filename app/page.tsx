"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/case-studies";
import { ArrowRight, Sparkles } from "lucide-react";

// CountUp animator for premium feel
const StatNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setCount(Math.floor(latest))
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display font-semibold italic text-5xl md:text-7xl text-accent-primary block">
      {count}
      {suffix}
    </span>
  );
};

export default function Home() {
  const [portraitImg, setPortraitImg] = useState("/images/muneeb-bilal.webp");
  // Select the 5 featured case studies
  const featuredSlugs = [
    "watch-how-malaysia",
    "aba-group",
    "treats-for-life",
    "trenddeck",
    "anebos-studios",
  ];

  const featuredStudies = featuredSlugs
    .map((slug) => caseStudies.find((cs) => cs.slug === slug))
    .filter(Boolean) as typeof caseStudies;

  return (
    <div className="w-full">
      {/* 1. Abstract Interactive Hero Section */}
      <Hero />

      {/* 2. Featured Projects Grid (Masonry & Artistic) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent">
                Curated Engagements
              </span>
            </div>
            <h2 className="font-display font-semibold italic text-4xl md:text-5xl text-ink">
              Featured Case Studies
            </h2>
          </div>
          <Link
            href="/work"
            className="group flex items-center gap-2 font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-ink hover:text-accent transition-colors duration-300"
          >
            Explore all 16 projects
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Staggered Grid for Artistic Feel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {featuredStudies.map((study, idx) => (
            <CaseStudyCard key={study.slug} study={study} index={idx} />
          ))}
        </div>
      </section>

      {/* 3. About Teaser Section */}
      <section className="w-full bg-ink text-paper py-20 md:py-32 border-t border-b border-line/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(194,78,43,0.1),transparent_40%)]" />
        
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* Portrait Placeholder with desaturated photo and dynamic tilt */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full max-w-sm aspect-[4/5] border border-line/20 rounded-3xl relative overflow-hidden flex flex-col justify-end p-6 bg-paper/5 shadow-2xl cursor-pointer group"
            >
              <div className="absolute inset-0 bg-accent/10 shimmer-bg z-10 pointer-events-none" />
              <div className="absolute inset-0 grain-overlay opacity-10 z-10 pointer-events-none" />
              <img 
                src={portraitImg} 
                onError={() => setPortraitImg("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800")}
                alt="Muhammad Muneeb Bilal" 
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-110 opacity-60 group-hover:scale-105 transition-transform duration-700 z-0"
              />
              <div className="relative z-20 text-paper bg-ink/30 backdrop-blur-[2px] p-4 rounded-xl">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-paper/70 block mb-1">
                  Founder Identity
                </span>
                <span className="font-display font-semibold italic text-lg text-paper">
                  Muhammad Muneeb Bilal
                </span>
              </div>
            </motion.div>
          </div>

          {/* About Text Copy */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent block">
              Perspective
            </span>
            <h3 className="font-display font-semibold italic text-3xl md:text-5xl text-paper leading-tight">
              Socio-Cultural Pattern Recognition In Brand Design
            </h3>
            
            <p className="font-sans text-base md:text-lg text-paper/70 font-light leading-relaxed">
              I am a final-year BS Social Sciences student at SZABIST Islamabad, with a 3.80 CGPA. My studies in development structures help me interpret brand strategies through a cultural lens, translating complex values into cohesive visual guidelines.
            </p>

            <Link
              href="/about"
              className="pill-active-hover inline-flex items-center gap-2 px-8 py-4 bg-paper text-ink rounded-full font-sans text-xs md:text-sm font-semibold tracking-wider uppercase border border-paper hover:bg-transparent hover:text-paper transition-all"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Milestone Statistics Section */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-line">
          {/* Milestone 1 */}
          <div className="flex flex-col items-center md:items-start gap-3 pt-8 md:pt-0 md:pl-0">
            <StatNumber value={4} suffix="+" />
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-graphite">
              Years Professional Experience
            </span>
            <p className="font-sans text-xs text-graphite/70 leading-relaxed max-w-[240px]">
              Managing branding strategy, visual identity design, and media production.
            </p>
          </div>

          {/* Milestone 2 */}
          <div className="flex flex-col items-center md:items-start gap-3 pt-8 md:pt-0 md:pl-12">
            <StatNumber value={16} />
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-graphite">
              Brand Engagements
            </span>
            <p className="font-sans text-xs text-graphite/70 leading-relaxed max-w-[240px]">
              Active executions deployed across Pakistan, Turkey, Malaysia, UK, and US.
            </p>
          </div>

          {/* Milestone 3 */}
          <div className="flex flex-col items-center md:items-start gap-3 pt-8 md:pt-0 md:pl-12">
            <StatNumber value={90} suffix="+" />
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-graphite">
              Campaign Post Deliverables
            </span>
            <p className="font-sans text-xs text-graphite/70 leading-relaxed max-w-[240px]">
              High-retention reels, carousel boards, and layouts delivered in 2026 alone.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA Footer Band */}
      <section className="w-full border-t border-line bg-paper py-20 text-center">
        <div className="max-w-[700px] mx-auto px-6 space-y-6">
          <h3 className="font-display font-semibold italic text-3xl md:text-4xl text-ink">
            Have a brand that needs a strategist?
          </h3>
          <p className="font-sans text-sm text-graphite max-w-md mx-auto leading-relaxed">
            I am available for design consultation, visual guidelines development, and on-call social strategy retainers.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="pill-active-hover inline-flex items-center gap-2 px-8 py-4 bg-ink text-paper rounded-full font-sans text-xs md:text-sm font-semibold tracking-wider uppercase border border-ink hover:bg-transparent hover:text-ink transition-all"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
