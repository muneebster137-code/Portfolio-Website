"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudies } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Sparkles, Grid } from "lucide-react";

// Categorize case studies programmatically based on deliverables
const getTagsForStudy = (slug: string) => {
  switch (slug) {
    case "safir-wear":
      return ["Brand Identity", "Web Design", "Social Strategy", "Multimedia"];
    case "facingnorth":
      return ["Social Strategy", "Multimedia"];
    case "trenddeck":
      return ["Brand Identity", "Social Strategy", "Multimedia"];
    case "aba-group":
      return ["Brand Identity", "Social Strategy", "Multimedia"];
    case "treats-for-life":
      return ["Brand Identity", "Web Design", "Social Strategy", "Multimedia"];
    case "ndrmf":
      return ["Brand Identity", "Social Strategy", "Multimedia"];
    case "pm-office":
      return ["Social Strategy"];
    case "tim-hortons":
      return ["Social Strategy"];
    case "beatrix-konnect":
      return ["Brand Identity", "Web Design", "Social Strategy"];
    case "fairmans-uk":
      return ["Web Design"];
    case "green-pakistan-agro":
      return ["Brand Identity", "Web Design", "Multimedia"];
    case "bakebox":
      return ["Brand Identity"];
    case "homeloom-uk":
      return ["Brand Identity", "Social Strategy", "Multimedia"];
    case "bic-szabist":
      return ["Brand Identity", "Social Strategy", "Multimedia"];
    case "anebos-studios":
      return ["Brand Identity", "Social Strategy", "Multimedia"];
    case "watch-how-malaysia":
      return ["Brand Identity", "Social Strategy"];
    default:
      return [];
  }
};

const FILTERS = ["All", "Brand Identity", "Web Design", "Social Strategy", "Multimedia"];

export default function WorkIndex() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Reverse chronological sort mapping from 2026 down to 2023
  const sortedStudies = [...caseStudies].reverse();

  // Filter case studies
  const filteredStudies = sortedStudies.filter((study) => {
    if (selectedFilter === "All") return true;
    const studyTags = getTagsForStudy(study.slug);
    return studyTags.includes(selectedFilter);
  });

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Page Header */}
      <section className="mb-16 space-y-6">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-accent" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent">
            Directory of Works
          </span>
        </div>
        <h1 className="font-display font-semibold italic text-4xl md:text-6xl text-ink leading-tight">
          Portfolio Archive
        </h1>
        <p className="font-sans text-base md:text-lg text-graphite max-w-2xl leading-relaxed">
          Explore Muneeb&apos;s contributions to brand identity design, e-commerce web setups, social media campaigns, and visual marketing assets. Use filters below to search by skill emphasis.
        </p>
      </section>

      {/* 1. Filter Bar with Tasteful Animated Underlines */}
      <section className="mb-16 border-b border-line pb-6">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {FILTERS.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <motion.button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-5 py-2.5 rounded-full font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none cursor-pointer ${
                  isActive ? "text-paper bg-ink" : "text-graphite hover:text-ink hover:bg-line/20"
                }`}
              >
                <span className="relative z-10">{filter}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-ink rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-sans text-graphite/60 font-semibold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Showing {filteredStudies.length} of {sortedStudies.length} brand entries</span>
        </div>
      </section>

      {/* 2. Responsive Grid with Card Transitions */}
      <motion.section 
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredStudies.map((study, idx) => (
            <motion.div
              key={study.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <CaseStudyCard study={study} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}
