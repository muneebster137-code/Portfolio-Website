"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { caseStudies } from "@/lib/case-studies";
import { useAccent } from "@/components/AccentProvider";
import { 
  Users, 
  Key, 
  ChevronLeft, 
  ChevronRight, 
  Compass,
  ArrowLeft
} from "lucide-react";

export default function AbaGroupHub() {
  const { setAccent, resetAccent } = useAccent();
  const study = caseStudies.find((cs) => cs.slug === "aba-group");
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const [headerImg, setHeaderImg] = useState("/images/aba-group.webp");
  const [artifactImgs, setArtifactImgs] = useState<string[]>([
    "/images/aba-group-artifact-1.webp",
    "/images/aba-group-artifact-2.webp",
    "/images/aba-group-artifact-3.webp"
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Video failed to play: ", err);
      });
    }
  };

  const handleArtifactError = (idx: number) => {
    setArtifactImgs((prev) => {
      const updated = [...prev];
      updated[idx] = "";
      return updated;
    });
  };

  // Parallax Scroll logic
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 120]);

  useEffect(() => {
    if (study) {
      setAccent(study.accent.primary, study.accent.secondary);
    }
    return () => resetAccent();
  }, [study, setAccent, resetAccent]);

  // ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePhotoIdx(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!study) return <div className="p-12 text-center text-sm font-semibold">Study not loaded.</div>;

  // Find index for next/previous links
  const currentIndex = caseStudies.findIndex((cs) => cs.slug === "aba-group");
  const prevStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : caseStudies[caseStudies.length - 1];
  const nextStudy = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : caseStudies[0];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const cardStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  // 3 Artifact details for swiper modal
  const ARTIFACT_DETAILS = [
    { title: "Aba Eğitim // Strategy Grid", desc: "Aspirational layout grids highlighting academic achievements, test results statistics, and placement schedules.", bg: "#1B2A4A" },
    { title: "ABA Psikoloji // Safe Space Swatch", desc: " empathetic typography board displaying pastel-toned templates and counseling quotes compiled for client safe environments.", bg: "#D9B8AE" },
    { title: "E4I Vakfı // Community Green", desc: "Trust-building infographics structures depicting community-centric project scales, NGO coordination plans, and biophilic reports.", bg: "#2F4B3C" }
  ];

  return (
    <article className="w-full pb-20">
      
      {/* 1. Accent Header Band */}
      <section 
        className="w-full min-h-[55vh] flex flex-col justify-end py-16 px-6 md:px-12 relative overflow-hidden transition-colors duration-700 bg-ink text-paper"
        style={{ backgroundColor: study.accent.primary }}
      >
        {/* Parallax Background Image */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0 opacity-100 pointer-events-none select-none"
        >
          <img 
            src={headerImg} 
            onError={() => setHeaderImg("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200")}
            alt="" 
            className="w-full h-full object-cover filter brightness-[0.75]"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent-secondary),transparent_75%)] opacity-35" />
        <div className="absolute inset-0 bg-ink/20" />
        <div className="absolute inset-0 grain-overlay opacity-[0.08]" />

        {/* Faded Silhouette blueprint inside header */}
        <div className="absolute right-[5%] top-[10%] w-[380px] h-[380px] opacity-[0.045] pointer-events-none select-none z-0">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
            <circle cx="50" cy="50" r="45" />
            <polygon points="50,15 90,80 10,80" />
            <path d="M50,5 L50,95 M5,50 L95,50" />
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto w-full relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link 
              href="/work" 
              className="text-xs uppercase font-semibold tracking-widest text-paper/70 hover:text-paper hover:underline transition-colors"
            >
              Work
            </Link>
            <span className="text-paper/40 text-xs">/</span>
            <Link 
              href="/work/watch-how-malaysia"
              className="text-xs uppercase font-semibold tracking-widest text-paper/70 hover:text-paper hover:underline transition-colors"
            >
              Watch How Malaysia
            </Link>
            <span className="text-paper/40 text-xs">/</span>
            <span className="text-xs uppercase font-semibold tracking-widest text-paper/90">
              ABA Group
            </span>
          </div>

          {/* Title & Floating Glassy Icon Badge */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-16 h-16 rounded-2xl bg-paper/10 backdrop-blur-md border border-paper/20 flex items-center justify-center text-paper shadow-lg hover:bg-paper/20 hover:scale-105 transition-all duration-300 shrink-0"
            >
              <Users className="w-10 h-10 stroke-[1.25]" />
            </motion.div>
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-display font-semibold italic text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-wide max-w-4xl"
            >
              ABA Group
            </motion.h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-paper/20 pt-8">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-paper/50 block mb-1">Role</span>
              <span className="font-sans text-sm font-semibold">{study.role}</span>
            </div>
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-paper/50 block mb-1">Timeline</span>
              <span className="font-sans text-sm font-semibold">{study.dateRange}</span>
            </div>
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-paper/50 block mb-1">Scope</span>
              <span className="font-sans text-sm font-semibold">Group-Wide Redesign</span>
            </div>
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-paper/50 block mb-1">Entities</span>
              <span className="font-sans text-sm font-semibold">5 Sub-Accounts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Intro Copy */}
        <div className="lg:col-span-8 space-y-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="border-l-2 pl-8 border-accent"
          >
            <p className="font-display font-light italic text-xl md:text-2xl text-ink leading-relaxed">
              &ldquo;{study.summary}&rdquo;
            </p>
          </motion.div>

          {/* Cinematic Hero Reel Showcase for ABA Group */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full border border-line rounded-3xl p-8 bg-paper/30 backdrop-blur-sm space-y-6 mt-8 overflow-hidden relative"
          >
            <div className="flex items-center justify-between border-b border-line pb-4 flex-wrap gap-2">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent-primary">
                  Daily Video Strategy
                </span>
                <h3 className="font-display font-semibold italic text-xl text-ink">
                  ABA Group Choreographed Reels
                </h3>
              </div>
              <span className="text-[9px] font-sans font-bold px-2.5 py-1 rounded border border-accent-primary/20 bg-accent-primary/5 text-accent-primary uppercase tracking-wider">
                Multi-Account Dynamic Flow
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* 9:16 Video Player Mockup */}
              <div className="md:col-span-5 flex justify-center">
                <div 
                  onClick={handlePlayToggle}
                  className="w-52 aspect-[9/16] rounded-[2rem] border-[5px] border-ink bg-ink relative overflow-hidden shadow-2xl group flex flex-col justify-between p-4 cursor-pointer"
                >
                  {/* HTML5 video element */}
                  <video
                    ref={videoRef}
                    src="/images/aba-group-reel.mp4"
                    loop
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* Mockup visual layers (only show when not playing) */}
                  {!isPlaying && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-b from-ink via-accent-primary/25 to-ink z-0" />
                      <div className="absolute inset-0 grain-overlay opacity-[0.14] z-10 pointer-events-none" />

                      {/* Notch */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-ink rounded-full z-30 pointer-events-none" />

                      {/* Faded Blueprint inside mockup */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] z-10 p-4 pointer-events-none">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
                          <polygon points="50,15 85,85 15,85" />
                          <line x1="50" y1="5" x2="50" y2="95" />
                        </svg>
                      </div>

                      {/* Animated Sound Wave Bars */}
                      <div className="flex items-end justify-center gap-1.5 h-20 my-auto z-20 relative pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1.5 rounded-full bg-accent-primary"
                            style={{
                              height: `${Math.floor(Math.random() * 70) + 20}%`,
                              animation: `shimmer 1.4s infinite ease-in-out alternate`,
                              animationDelay: `${i * 0.12}s`
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Camera Notch (visible even when playing for device realism) */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-ink rounded-full z-30 pointer-events-none" />

                  {/* Controllers */}
                  <div className="z-20 relative flex flex-col items-center gap-2 mt-auto">
                    <button className="w-11 h-11 rounded-full bg-paper text-ink flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-all">
                      {isPlaying ? (
                        <svg className="w-4 h-4 fill-current text-accent-primary" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 fill-current ml-0.5 text-accent-primary" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                    <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-paper/80">
                      {isPlaying ? "Pause Reel" : "Play Campaign Reel"}
                    </span>
                  </div>

                  {/* Scrubber */}
                  <div className="w-full bg-paper/20 h-[3px] rounded-full overflow-hidden z-20 relative mt-2">
                    <div 
                      className="h-full bg-accent-primary rounded-full transition-all duration-100" 
                      style={{ width: isPlaying ? "100%" : "50%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Narratives */}
              <div className="md:col-span-7 space-y-4">
                <h4 className="font-display font-semibold italic text-lg text-ink">
                  Aspirational Video Choreography
                </h4>
                <p className="font-sans text-xs md:text-sm text-graphite leading-relaxed font-light">
                  Managing five sub-brands requires adjusting kinetic rhythms per video campaign. Aba Eğitim reels require aspirational, steady motion guides; ABA Test Prep uses high-contrast score alerts; ABA Psikoloji uses calming, slow-paced transition cues.
                </p>
                
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 bg-paper border border-line rounded-lg text-ink">
                    Dynamic Tempo Shifts
                  </span>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 bg-paper border border-line rounded-lg text-ink">
                    5 Brand Rhythms
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: CTA & Context Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="border border-line rounded-3xl p-8 bg-paper/50 backdrop-blur-sm space-y-4"
          >
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-graphite">
              Primary Router Relation
            </h4>
            <p className="font-sans text-xs text-graphite/80 leading-relaxed">
              ABA Group represents five separate operations assigned through <strong>Watch How Malaysia</strong>. Muneeb serves as the global visual coordinator.
            </p>
            <Link
              href="/work/watch-how-malaysia"
              className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline uppercase tracking-wider"
            >
              <ArrowLeft className="w-3 h-3" /> Back to Watch How Hub
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Sub-Entities Cards Section */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-8">
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block mb-2">Multifarious Voices</span>
          <h2 className="font-display font-semibold italic text-3xl md:text-4xl text-ink">Entity Matrix</h2>
        </div>

        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {study.subEntities?.map((entity, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="border border-line rounded-3xl p-6 md:p-8 flex flex-col justify-between bg-paper hover:shadow-xl transition-all duration-300 relative group"
            >
              <div 
                className="absolute top-0 left-0 w-full h-1.5 rounded-t-3xl"
                style={{ backgroundColor: entity.accent.primary }}
              />

              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start pt-2">
                  <h3 className="font-display font-bold italic text-2xl text-ink group-hover:text-accent-primary transition-colors">
                    {entity.name}
                  </h3>
                  
                  {/* Swatch chips */}
                  <div className="flex items-center gap-1.5 border border-line p-1 rounded-full bg-paper/85">
                    <div 
                      className="w-3.5 h-3.5 rounded-full border border-line" 
                      style={{ backgroundColor: entity.accent.primary }}
                      title="Primary Color"
                    />
                    <div 
                      className="w-3.5 h-3.5 rounded-full border border-line" 
                      style={{ backgroundColor: entity.accent.secondary }}
                      title="Secondary Color"
                    />
                  </div>
                </div>

                {/* Audience block */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-graphite/50 font-bold">
                    <Users className="w-3 h-3" /> Target Audience
                  </div>
                  <p className="font-sans text-xs text-graphite leading-relaxed">
                    {entity.audience}
                  </p>
                </div>

                {/* Strategy block */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-graphite/50 font-bold">
                    <Compass className="w-3 h-3" /> Art Direction & Strategy
                  </div>
                  <p className="font-sans text-xs text-graphite leading-relaxed">
                    {entity.strategy}
                  </p>
                </div>
              </div>

              {/* Footer item: Psychological Trigger */}
              <div className="border-t border-line/50 pt-4 mt-8 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-graphite/50 font-bold">
                  <Key className="w-3 h-3 text-accent-primary" /> Psychological Anchor
                </div>
                <span className="font-sans text-xs font-semibold px-2.5 py-0.5 rounded bg-accent-primary/5 text-accent-primary border border-accent-primary/10">
                  {entity.trigger}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Editorial Masonry Design Slots */}
      <section className="w-full border-t border-b border-line bg-ink text-paper py-20 px-6 md:px-12 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 grain-overlay opacity-[0.07]" />

        <div className="max-w-[1280px] mx-auto w-full relative z-10">
          <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-paper/40 block mb-2">Visual Showcase</span>
            <h2 className="font-display font-semibold italic text-3xl md:text-4xl text-paper">Branding Output Artifacts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTIFACT_DETAILS.map((art, idx) => (
              <div 
                key={idx}
                onClick={() => setActivePhotoIdx(art.title.startsWith("Aba Eğitim") ? 0 : art.title.startsWith("ABA Psikoloji") ? 1 : 2)}
                className="min-h-[300px] border border-line/10 rounded-3xl relative overflow-hidden flex flex-col justify-end p-8 bg-paper/5 cursor-pointer group hover:border-accent-primary/40 transition-colors"
              >
                {artifactImgs[idx] && (
                  <img 
                    src={artifactImgs[idx]} 
                    onError={() => handleArtifactError(idx)}
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 z-0"
                  />
                )}
                <div 
                  className="absolute inset-0 opacity-25 shimmer-bg transition-opacity duration-300 group-hover:opacity-35 z-10 pointer-events-none"
                  style={{ backgroundColor: art.bg }}
                />
                
                {/* Silhouette SVG inside slot background */}
                <div className="absolute inset-0 opacity-[0.025] flex items-center justify-center p-6 z-10 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
                    <circle cx="50" cy="50" r="35" />
                    <rect x="20" y="20" width="60" height="60" />
                  </svg>
                </div>

                <div className="relative z-20">
                  <span className="text-[9px] uppercase tracking-widest text-paper/50 block mb-1">{art.title}</span>
                  <h4 className="font-display font-semibold text-lg italic text-paper">{art.title.split(" // ")[1]}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination Navigation */}
      <section className="w-full border-b border-line bg-paper/20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 divide-x divide-line">
          <Link 
            href={`/work/${prevStudy.slug}`}
            className="group flex flex-col items-start gap-2 p-8 md:p-12 hover:bg-paper transition-all duration-300"
          >
            <div className="flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-widest text-graphite">
              <ChevronLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Previous Project
            </div>
            <span className="font-display font-semibold italic text-xl md:text-3xl text-ink group-hover:text-accent-primary transition-colors">
              {prevStudy.client}
            </span>
          </Link>

          <Link 
            href={`/work/${nextStudy.slug}`}
            className="group flex flex-col items-end gap-2 p-8 md:p-12 text-right hover:bg-paper transition-all duration-300"
          >
            <div className="flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-widest text-graphite">
              Next Project
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
            <span className="font-display font-semibold italic text-xl md:text-3xl text-ink group-hover:text-accent-primary transition-colors">
              {nextStudy.client}
            </span>
          </Link>
        </div>
      </section>

      {/* Carousel Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-ink/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button 
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 text-paper/60 hover:text-paper font-sans text-xs uppercase tracking-widest font-bold border border-paper/15 px-4 py-2 rounded-xl transition-all"
            >
              Close ESC
            </button>
            
            <div className="w-full max-w-4xl flex items-center justify-between gap-4">
              {/* Prev Button */}
              <button 
                onClick={() => setActivePhotoIdx((prev) => (prev === 0 ? 2 : prev! - 1))}
                className="w-12 h-12 rounded-full border border-paper/15 text-paper/85 hover:bg-paper hover:text-ink flex items-center justify-center transition-all shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Slide */}
              <motion.div
                key={activePhotoIdx}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex-1 min-h-[450px] border border-line/10 rounded-3xl relative overflow-hidden flex flex-col justify-end p-8 bg-paper/5 shadow-2xl"
              >
                {artifactImgs[activePhotoIdx] ? (
                  <img 
                    src={artifactImgs[activePhotoIdx]} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                ) : (
                  <div 
                    className="absolute inset-0 opacity-35 shimmer-bg z-10 pointer-events-none"
                    style={{ backgroundColor: ARTIFACT_DETAILS[activePhotoIdx].bg }}
                  />
                )}
                <div className="absolute inset-0 grain-overlay opacity-10 z-10 pointer-events-none" />

                {/* Silhouette inside modal */}
                <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center p-12">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
                    <circle cx="50" cy="50" r="45" />
                    <line x1="5" y1="5" x2="95" y2="95" />
                  </svg>
                </div>

                <div className="relative z-10 text-paper text-left space-y-2">
                  <span className="text-[9px] uppercase tracking-widest text-paper/40 block mb-1">
                    {ARTIFACT_DETAILS[activePhotoIdx].title.split(" // ")[0]} — Detail Board
                  </span>
                  <h3 className="font-display font-semibold italic text-2xl md:text-3xl text-paper">
                    {ARTIFACT_DETAILS[activePhotoIdx].title.split(" // ")[1]}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-paper/60 max-w-lg leading-relaxed font-light">
                    {ARTIFACT_DETAILS[activePhotoIdx].desc}
                  </p>
                </div>
              </motion.div>

              {/* Next Button */}
              <button 
                onClick={() => setActivePhotoIdx((prev) => (prev === 2 ? 0 : prev! + 1))}
                className="w-12 h-12 rounded-full border border-paper/15 text-paper/85 hover:bg-paper hover:text-ink flex items-center justify-center transition-all shrink-0"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Indicators */}
            <div className="flex gap-2.5 mt-8">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activePhotoIdx === idx ? "w-6 bg-accent-primary" : "w-2 bg-paper/20"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </article>
  );
}
