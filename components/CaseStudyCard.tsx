"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CaseStudy } from "@/lib/case-studies";
import { ArrowUpRight } from "lucide-react";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  const isHub = study.slug === "watch-how-malaysia";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      whileHover={{ 
        borderColor: study.accent.primary, 
        backgroundColor: study.accent.primary + "0A", // ~4% opacity color tint
        y: -4,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
      style={{
        borderColor: isHub 
          ? "var(--accent)" 
          : index % 3 === 0 
            ? `${study.accent.primary}50` 
            : "var(--line)",
        backgroundColor: isHub 
          ? "var(--paper)" 
          : index % 3 === 0 
            ? `${study.accent.primary}06` 
            : "var(--paper)",
      }}
      className={`group relative flex flex-col justify-between border rounded-3xl p-6 md:p-8 min-h-[380px] transition-shadow duration-500 hover:shadow-xl cursor-pointer overflow-hidden ${
        isHub ? "lg:col-span-2 border-2" : ""
      }`}
    >
      {/* 1. Stretch Link overlay covering entire card */}
      <Link href={`/work/${study.slug}`} className="absolute inset-0 z-20" aria-label={`View case study for ${study.client}`} />

      {/* Accent Colored Top Edge */}
      <div
        className="absolute top-0 left-0 w-full h-1.5 rounded-t-3xl transition-transform duration-500 scale-x-95 group-hover:scale-x-100"
        style={{ backgroundColor: study.accent.primary }}
      />

      {/* Background Accent Shimmer Block on Hover */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at top right, ${study.accent.primary}, transparent)` 
        }}
      />

      {/* Card Header Info */}
      <div className="flex justify-between items-start z-10 relative">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-graphite">
              {study.role}
            </span>
            {isHub && (
              <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent text-paper animate-pulse">
                HUB ROUTER
              </span>
            )}
            {study.status === "ongoing" && !isHub && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            )}
          </div>
          <h3 className="font-display font-bold italic text-3xl md:text-4xl text-ink leading-tight group-hover:text-accent transition-colors duration-300">
            {study.client}
          </h3>
        </div>
        
        {/* Floating Arrow Link */}
        <div 
          className="w-10 h-10 border border-line rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-ink group-hover:text-paper"
        >
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
        </div>
      </div>

      {/* Main Body Statement */}
      <div className="my-8 z-10 relative">
        <p className="font-sans text-sm md:text-base text-graphite leading-relaxed line-clamp-3">
          {study.summary}
        </p>
      </div>

      {/* Card Footer Info */}
      <div className="flex items-center justify-between border-t border-line/50 pt-4 mt-auto z-10 relative flex-wrap gap-4">
        <span className="text-[11px] font-sans font-bold tracking-widest text-ink/40 uppercase">
          {study.dateRange}
        </span>

        {/* Dynamic Category/Routed Tag (Separate z-30 click-bubble) */}
        {study.category === "B" && study.routedVia && (
          <Link
            href="/work/watch-how-malaysia"
            className="text-[9px] font-sans font-semibold tracking-wider px-2.5 py-1 rounded-full border border-line bg-paper/85 text-graphite hover:text-accent hover:border-accent uppercase z-30 relative transition-colors duration-300"
          >
            via {study.routedVia}
          </Link>
        )}

        {study.category === "C" && (
          <span className="text-[9px] font-sans font-semibold tracking-wider px-2.5 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent uppercase">
            Own Venture
          </span>
        )}

        <span
          className="text-xs font-sans font-bold tracking-wider uppercase text-ink underline underline-offset-4 decoration-line group-hover:decoration-accent transition-colors z-10"
        >
          {isHub ? "Manage Hub Router" : "View Case Study"}
        </span>
      </div>
    </motion.div>
  );
};
