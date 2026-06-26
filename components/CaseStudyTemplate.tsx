"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { CaseStudy, caseStudies } from "@/lib/case-studies";
import { useAccent } from "./AccentProvider";
import { 
  Globe, 
  Award, 
  Camera, 
  Video, 
  Share2, 
  Palette, 
  TrendingUp, 
  CheckCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  FileText,
  Compass,
  GraduationCap,
  Users,
  Briefcase,
  Store,
  Leaf,
  Boxes,
  Layers,
  Sparkles
} from "lucide-react";

interface TemplateProps {
  study: CaseStudy;
}

// Map keywords in bullets to corresponding icons
const getBulletIcon = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("web") || t.includes("site") || t.includes("e-commerce")) return <Globe className="w-4 h-4" />;
  if (t.includes("brand") || t.includes("guidelines") || t.includes("logo") || t.includes("identity")) return <Award className="w-4 h-4" />;
  if (t.includes("photography") || t.includes("photo") || t.includes("camera") || t.includes("macro-texture")) return <Camera className="w-4 h-4" />;
  if (t.includes("video") || t.includes("reel") || t.includes("reels") || t.includes("choreography") || t.includes("cinematic") || t.includes("daVinci")) return <Video className="w-4 h-4" />;
  if (t.includes("social") || t.includes("instagram") || t.includes("facebook") || t.includes("campaign") || t.includes("linkedin")) return <Share2 className="w-4 h-4" />;
  if (t.includes("design") || t.includes("infographics") || t.includes("layout") || t.includes("illustration") || t.includes("ui/ux")) return <Palette className="w-4 h-4" />;
  if (t.includes("strategy") || t.includes("campaigns") || t.includes("metrics") || t.includes("management") || t.includes("outreach")) return <TrendingUp className="w-4 h-4" />;
  return <CheckCircle className="w-4 h-4" />;
};

// Map desaturated background images for case studies
const getHeaderBgImage = (slug: string) => {
  const images: Record<string, string> = {
    "watch-how-malaysia": "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1200",
    "safir-wear": "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200",
    "facingnorth": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200",
    "trenddeck": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200",
    "aba-group": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200",
    "treats-for-life": "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=1200",
    "ndrmf": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200",
    "pm-office": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200",
    "tim-hortons": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200",
    "beatrix-konnect": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200",
    "fairmans-uk": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200",
    "green-pakistan-agro": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
    "bakebox": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200",
    "homeloom-uk": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200",
    "bic-szabist": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    "anebos-studios": "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200"
  };
  return images[slug] || images["watch-how-malaysia"];
};

// Map custom visual icons for case studies
const getHeroIcon = (slug: string) => {
  switch (slug) {
    case "watch-how-malaysia": return <Compass className="w-10 h-10 stroke-[1.25]" />;
    case "safir-wear": return <Palette className="w-10 h-10 stroke-[1.25]" />;
    case "facingnorth": return <Compass className="w-10 h-10 stroke-[1.25]" />;
    case "trenddeck": return <TrendingUp className="w-10 h-10 stroke-[1.25]" />;
    case "aba-group": return <Users className="w-10 h-10 stroke-[1.25]" />;
    case "treats-for-life": return <Sparkles className="w-10 h-10 stroke-[1.25]" />;
    case "ndrmf": return <Award className="w-10 h-10 stroke-[1.25]" />;
    case "pm-office": return <Briefcase className="w-10 h-10 stroke-[1.25]" />;
    case "tim-hortons": return <Store className="w-10 h-10 stroke-[1.25]" />;
    case "beatrix-konnect": return <Globe className="w-10 h-10 stroke-[1.25]" />;
    case "fairmans-uk": return <Globe className="w-10 h-10 stroke-[1.25]" />;
    case "green-pakistan-agro": return <Leaf className="w-10 h-10 stroke-[1.25]" />;
    case "bakebox": return <Boxes className="w-10 h-10 stroke-[1.25]" />;
    case "homeloom-uk": return <Layers className="w-10 h-10 stroke-[1.25]" />;
    case "bic-szabist": return <GraduationCap className="w-10 h-10 stroke-[1.25]" />;
    case "anebos-studios": return <Video className="w-10 h-10 stroke-[1.25]" />;
    default: return <Award className="w-10 h-10 stroke-[1.25]" />;
  }
};

export const CaseStudyTemplate = ({ study }: TemplateProps) => {
  const { setAccent, resetAccent } = useAccent();
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const [headerImg, setHeaderImg] = useState(`/images/${study.slug}.webp`);
  const [artifactImgs, setArtifactImgs] = useState<string[]>([
    `/images/${study.slug}-artifact-1.webp`,
    `/images/${study.slug}-artifact-2.webp`,
    `/images/${study.slug}-artifact-3.webp`,
    `/images/${study.slug}-artifact-4.webp`
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Pause video and reset state when case study changes
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [study.slug]);

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

  useEffect(() => {
    setHeaderImg(`/images/${study.slug}.webp`);
    setArtifactImgs([
      `/images/${study.slug}-artifact-1.webp`,
      `/images/${study.slug}-artifact-2.webp`,
      `/images/${study.slug}-artifact-3.webp`,
      `/images/${study.slug}-artifact-4.webp`
    ]);
  }, [study.slug]);

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

  // Update dynamic theme colors on mount
  useEffect(() => {
    setAccent(study.accent.primary, study.accent.secondary);
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

  // Find index for next/previous links
  const currentIndex = caseStudies.findIndex((cs) => cs.slug === study.slug);
  const prevStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : caseStudies[caseStudies.length - 1];
  const nextStudy = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : caseStudies[0];

  const hasBrandVision = ["treats-for-life", "bakebox", "trenddeck", "beatrix-konnect"].includes(study.slug);
  const showReel = ["trenddeck", "treats-for-life", "anebos-studios"].includes(study.slug);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const containerStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <article className="w-full pb-20">
      
      {/* 1. Dynamic Accent Header Band (Full Page Stretch) */}
      <section 
        className="w-full min-h-[55vh] flex flex-col justify-end py-16 px-6 md:px-12 relative overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: study.accent.primary }}
      >
        {/* Parallax Background Image */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0 opacity-100 pointer-events-none select-none"
        >
          <img 
            src={headerImg} 
            onError={() => setHeaderImg(getHeaderBgImage(study.slug))}
            alt="" 
            className="w-full h-full object-cover filter brightness-[0.75]"
          />
        </motion.div>

        {/* Abstract Background Design Details */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent-secondary),transparent_75%)] opacity-35" />
        <div className="absolute inset-0 bg-ink/10" />
        
        {/* Subtle grain backdrop on header */}
        <div className="absolute inset-0 grain-overlay opacity-[0.08]" />

        {/* White-Spaced Artistic Silhouette watermark inside header */}
        <div className="absolute right-[5%] top-[10%] w-[380px] h-[380px] opacity-[0.045] pointer-events-none select-none z-0">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="30" />
            <path d="M50,5 L50,95 M5,50 L95,50 M18.3,18.3 L81.7,81.7 M18.3,81.7 L81.7,18.3" />
            <polygon points="50,15 85,75 15,75" />
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto w-full relative z-10 text-paper">
          {/* Eyebrow Breadcrumb and Route Path */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link 
              href="/work" 
              className="text-xs uppercase font-semibold tracking-widest text-paper/70 hover:text-paper hover:underline transition-colors"
            >
              Work
            </Link>
            <span className="text-paper/40 text-xs">/</span>
            {study.routedVia && (
              <>
                <Link 
                  href={`/work/${study.routedVia.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xs uppercase font-semibold tracking-widest text-paper/70 hover:text-paper hover:underline transition-colors"
                >
                  {study.routedVia}
                </Link>
                <span className="text-paper/40 text-xs">/</span>
              </>
            )}
            <span className="text-xs uppercase font-semibold tracking-widest text-paper/90">
              {study.client}
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
              {getHeroIcon(study.slug)}
            </motion.div>
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-display font-semibold italic text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-wide drop-shadow-sm max-w-4xl"
            >
              {study.client}
            </motion.h1>
          </div>

          {/* Meta Information Bar */}
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
              <span className="text-[10px] font-sans uppercase tracking-widest text-paper/50 block mb-1">Status</span>
              <span className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold capitalize">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  study.status === "ongoing" ? "bg-emerald-400" : study.status === "intermittent" ? "bg-amber-400" : "bg-paper/40"
                }`} />
                {study.status}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-paper/50 block mb-1">Tier Verification</span>
              <span className="font-sans text-xs uppercase font-semibold px-2 py-0.5 rounded border border-paper/30 bg-paper/10 text-paper/90 inline-block">
                Tier {study.tier} • {study.tier === 1 ? "Live Link" : study.tier === 2 ? "Instagram" : "Own Venture"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Intro Copy & Pills */}
        <div className="lg:col-span-8 space-y-12">
          {/* Summary Quote */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="border-l-2 pl-8"
            style={{ borderColor: study.accent.primary }}
          >
            <p className="font-display font-light italic text-xl md:text-2xl text-ink leading-relaxed">
              &ldquo;{study.summary}&rdquo;
            </p>
          </motion.div>

          {/* Deliverables/Work Pills (instead of lists) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerStagger}
            className="space-y-6"
          >
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-graphite">
              Core Deliverables & Actions
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {study.bullets.map((bullet, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="pill-active-hover flex items-center gap-3 px-5 py-3.5 bg-paper border border-line rounded-2xl cursor-pointer text-sm font-medium hover:border-accent-primary hover:bg-accent-primary/[0.03] text-ink group"
                >
                  <div className="text-accent-primary group-hover:scale-110 transition-transform duration-300">
                    {getBulletIcon(bullet)}
                  </div>
                  <span className="leading-snug">{bullet}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cinematic Hero Reel Showcase (Only for trenddeck, treats-for-life, anebos-studios) */}
          {showReel && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="w-full border border-line rounded-3xl p-8 bg-paper/30 backdrop-blur-sm space-y-6 mt-8 overflow-hidden relative"
            >
              {/* Internal Silhouette vector overlay */}
              <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 opacity-[0.015] pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-ink" strokeWidth="0.5">
                  <polygon points="50,5 95,95 5,95" />
                  <circle cx="50" cy="55" r="25" />
                </svg>
              </div>

              <div className="flex items-center justify-between border-b border-line pb-4 flex-wrap gap-2">
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent-primary">
                    Kinetic Pulse
                  </span>
                  <h3 className="font-display font-semibold italic text-xl text-ink">
                    Choreographed Reel Showcase
                  </h3>
                </div>
                <span className="text-[9px] font-sans font-bold px-2.5 py-1 rounded border border-accent-primary/20 bg-accent-primary/5 text-accent-primary uppercase tracking-wider">
                  9:16 Vertical Video Strategy
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* 9:16 Video Player Interface Mockup */}
                <div className="md:col-span-5 flex justify-center">
                  <div 
                    onClick={handlePlayToggle}
                    className="w-52 aspect-[9/16] rounded-[2rem] border-[5px] border-ink bg-ink relative overflow-hidden shadow-2xl group flex flex-col justify-between p-4 cursor-pointer"
                  >
                    {/* HTML5 video element (hidden until playing) */}
                    <video
                      ref={videoRef}
                      src={`/images/${study.slug}-reel.webm`}
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

                        {/* Faded Silhouette in background of screen */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] z-10 p-4 pointer-events-none">
                          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
                            <circle cx="50" cy="50" r="40" />
                            <path d="M50,10 L50,90 M10,50 L90,50" />
                          </svg>
                        </div>

                        {/* Sound Waves dancing */}
                        <div className="flex items-end justify-center gap-1.5 h-20 my-auto z-20 relative pointer-events-none">
                          {[...Array(6)].map((_, idx) => (
                            <div
                              key={idx}
                              className="w-1.5 rounded-full bg-accent-primary"
                              style={{
                                height: `${Math.floor(Math.random() * 60) + 30}%`,
                                animation: `shimmer 1.5s infinite ease-in-out alternate`,
                                animationDelay: `${idx * 0.18}s`
                              }}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Camera Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-ink rounded-full z-30" />

                    {/* Playhead controllers */}
                    <div className="z-20 relative flex flex-col items-center gap-2 mt-auto">
                      <button className="w-11 h-11 rounded-full bg-paper text-ink flex items-center justify-center shadow-lg transform active:scale-95 group-hover:scale-105 transition-all duration-300">
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
                      <span className="text-[8px] font-sans font-bold uppercase tracking-[0.15em] text-paper/80">
                        {isPlaying ? "Pause Video" : "Play Beat edit"}
                      </span>
                    </div>

                    {/* Progress Bar scrubber */}
                    <div className="w-full bg-paper/20 h-[3px] rounded-full overflow-hidden z-20 relative mt-2">
                      <div 
                        className="h-full bg-accent-primary rounded-full transition-all duration-100" 
                        style={{ width: isPlaying ? "100%" : "60%" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="md:col-span-7 space-y-4">
                  <h4 className="font-display font-semibold italic text-lg text-ink">
                    Beat-Synced Layout Transitions
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-graphite leading-relaxed font-light">
                    This represents Muneeb&apos;s &ldquo;Kinetic Pulse&rdquo; video framework. Video triggers, lighting values, and visual scale ratios are cued dynamically to audio audiobeats, creating highly engaging campaigns for social distributions.
                  </p>
                  
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 bg-paper border border-line rounded-lg text-ink">
                      Choreographed Audio
                    </span>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 bg-paper border border-line rounded-lg text-ink">
                      High-Tempo Cuts
                    </span>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 bg-paper border border-line rounded-lg text-ink">
                      Visual Stagger
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: CTA & Metadata Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* CTA Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-line rounded-3xl p-8 bg-paper/50 backdrop-blur-sm space-y-6"
          >
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-graphite">
              Verification & Scope
            </h4>
            
            <p className="font-sans text-xs text-graphite/80 leading-relaxed">
              This case study covers brand engagements delivered by Muhammad Muneeb Bilal. Evidentiary records are structured below according to integrity guidelines.
            </p>

            {/* Dynamic CTA rendering based on Tier */}
            {study.tier === 1 && study.liveSiteUrl && (
              <a
                href={study.liveSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-active-hover w-full flex items-center justify-center gap-2 px-6 py-4 bg-ink text-paper rounded-2xl font-sans text-xs font-semibold uppercase tracking-wider shadow-sm border border-ink hover:bg-transparent hover:text-ink transition-all"
              >
                Visit Live Site
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {study.tier === 2 && (
              <div className="p-4 rounded-xl bg-ink/5 border border-line/50 text-[11px] font-medium text-graphite leading-relaxed">
                Verification: This engagement is documented through active digital distributions. Social and strategy deliverables are live-verifiable on client social networks.
              </div>
            )}

            {study.tier === 3 && (
              <div className="p-4 rounded-xl bg-accent-primary/[0.03] border border-accent-primary/20 text-[11px] font-medium text-accent-primary leading-relaxed">
                Concept & Venture: Structured as a direct venture or proprietary branding package. Retained as part of visual identity research.
              </div>
            )}

            {/* Brand Vision PDF download pill button */}
            {hasBrandVision && (
              <a
                href={`/assets/brand-vision-${study.slug}.pdf`}
                download
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Brand Vision Deck PDF download triggered for ${study.client}. PDF file will be hosted at '/public/assets/brand-vision-${study.slug}.pdf' in the future.`);
                }}
                className="pill-active-hover w-full flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-paper rounded-2xl font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300"
              >
                <FileText className="w-3.5 h-3.5" />
                Brand Vision Deck (PDF)
              </a>
            )}
          </motion.div>

          {/* Unverified Metrics Note Callout */}
          {study.metricsNote && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="border border-dashed border-accent rounded-3xl p-6 bg-accent/[0.02] flex gap-4 items-start"
            >
              <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase block mb-1">
                  Metric Note
                </span>
                <p className="font-sans text-xs text-graphite/90 leading-relaxed">
                  {study.metricsNote}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 4. Artistic/Masonry Photo Gallery Section (Full Page Stretch) */}
      <section className="w-full border-t border-b border-line bg-ink text-paper py-20 px-6 md:px-12 relative overflow-hidden">
        {/* Grain overlay for dark section */}
        <div className="absolute inset-0 grain-overlay opacity-[0.07]" />

        <div className="max-w-[1280px] mx-auto w-full relative z-10">
          <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-paper/40 block mb-2">Visual Showcase</span>
            <h2 className="font-display font-semibold italic text-3xl md:text-4xl text-paper">Editorial Artifacts</h2>
          </div>

          {/* Staggered Masonry Layout (4 assets representing screen captures, guidelines, packaging, or brand colors) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Box 1: Large Banner (Takes 8 cols, height 400) */}
            <div 
              onClick={() => setActivePhotoIdx(0)}
              className="md:col-span-8 min-h-[400px] border border-line/10 rounded-3xl relative overflow-hidden flex flex-col justify-end p-8 bg-paper/5 cursor-pointer group hover:border-accent-primary/40 transition-colors"
            >
              {artifactImgs[0] && (
                <img 
                  src={artifactImgs[0]} 
                  onError={() => handleArtifactError(0)}
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 z-0"
                />
              )}
              <div 
                className="absolute inset-0 opacity-40 shimmer-bg transition-opacity duration-300 group-hover:opacity-50 z-10 pointer-events-none"
                style={{ backgroundColor: study.accent.primary }}
              />
              {/* Silhouette outlines in placeholder card backgrounds */}
              <div className="absolute inset-0 opacity-[0.035] p-6 flex items-center justify-center z-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
                  <rect x="10" y="10" width="80" height="80" rx="10" />
                  <circle cx="50" cy="50" r="30" />
                </svg>
              </div>

            </div>

            {/* Box 2: Tall Vertical (Takes 4 cols, height 400) */}
            <div 
              onClick={() => setActivePhotoIdx(1)}
              className="md:col-span-4 min-h-[400px] border border-line/10 rounded-3xl relative overflow-hidden flex flex-col justify-end p-8 bg-paper/5 cursor-pointer group hover:border-accent-primary/40 transition-colors"
            >
              {artifactImgs[1] && (
                <img 
                  src={artifactImgs[1]} 
                  onError={() => handleArtifactError(1)}
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 z-0"
                />
              )}
              <div 
                className="absolute inset-0 opacity-30 shimmer-bg transition-opacity duration-300 group-hover:opacity-40 z-10 pointer-events-none"
                style={{ backgroundColor: study.accent.secondary }}
              />
              <div className="absolute inset-0 opacity-[0.035] p-6 flex items-center justify-center z-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
                  <circle cx="50" cy="50" r="40" />
                  <path d="M10,10 L90,90 M10,90 L90,10" />
                </svg>
              </div>

            </div>

            {/* Box 3: Square Left (Takes 5 cols, height 350) */}
            <div 
              onClick={() => setActivePhotoIdx(2)}
              className="md:col-span-5 min-h-[350px] border border-line/10 rounded-3xl relative overflow-hidden flex flex-col justify-end p-8 bg-paper/5 cursor-pointer group hover:border-accent-primary/40 transition-colors"
            >
              {artifactImgs[2] && (
                <img 
                  src={artifactImgs[2]} 
                  onError={() => handleArtifactError(2)}
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 z-0"
                />
              )}
              <div 
                className="absolute inset-0 opacity-20 shimmer-bg transition-opacity duration-300 group-hover:opacity-30 z-10 pointer-events-none"
                style={{ backgroundColor: study.accent.secondary }}
              />
              <div className="absolute inset-0 opacity-[0.035] p-6 flex items-center justify-center z-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
                  <circle cx="50" cy="50" r="30" />
                  <polygon points="50,20 80,80 20,80" />
                </svg>
              </div>

            </div>

            {/* Box 4: Horizontal Right (Takes 7 cols, height 350) */}
            <div 
              onClick={() => setActivePhotoIdx(3)}
              className="md:col-span-7 min-h-[350px] border border-line/10 rounded-3xl relative overflow-hidden flex flex-col justify-end p-8 bg-paper/5 cursor-pointer group hover:border-accent-primary/40 transition-colors"
            >
              {artifactImgs[3] && (
                <img 
                  src={artifactImgs[3]} 
                  onError={() => handleArtifactError(3)}
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 z-0"
                />
              )}
              <div 
                className="absolute inset-0 opacity-45 shimmer-bg transition-opacity duration-300 group-hover:opacity-55 z-10 pointer-events-none"
                style={{ backgroundColor: study.accent.primary }}
              />
              <div className="absolute inset-0 opacity-[0.035] p-6 flex items-center justify-center z-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
                  <rect x="20" y="20" width="60" height="60" />
                  <line x1="20" y1="20" x2="80" y2="80" />
                </svg>
              </div>

            </div>
            
          </div>
        </div>
      </section>

      {/* 5. Pagination Navigation Band (Full Page Stretch) */}
      <section className="w-full border-b border-line bg-paper/20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 divide-x divide-line">
          {/* Previous case study */}
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

          {/* Next case study */}
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

      {/* 6. Carousel Swiper Lightbox Modal */}
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
            
            {/* Modal Content container */}
            <div className="w-full max-w-4xl flex items-center justify-between gap-4">
              
              {/* Prev Button */}
              <button 
                onClick={() => setActivePhotoIdx((prev) => (prev === 0 ? 3 : prev! - 1))}
                className="w-12 h-12 rounded-full border border-paper/15 text-paper/85 hover:bg-paper hover:text-ink flex items-center justify-center transition-all shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Slide panel */}
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
                    style={{ backgroundColor: activePhotoIdx % 2 === 0 ? study.accent.primary : study.accent.secondary }}
                  />
                )}
                <div className="absolute inset-0 grain-overlay opacity-10 z-10 pointer-events-none" />

                {/* Silhouette inside modal slide */}
                <div className="absolute inset-0 opacity-[0.025] flex items-center justify-center p-12">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
                    <circle cx="50" cy="50" r="45" />
                    <line x1="5" y1="5" x2="95" y2="95" />
                  </svg>
                </div>


              </motion.div>

              {/* Next Button */}
              <button 
                onClick={() => setActivePhotoIdx((prev) => (prev === 3 ? 0 : prev! + 1))}
                className="w-12 h-12 rounded-full border border-paper/15 text-paper/85 hover:bg-paper hover:text-ink flex items-center justify-center transition-all shrink-0"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

            {/* Pagination Indicators */}
            <div className="flex gap-2.5 mt-8">
              {[0, 1, 2, 3].map((idx) => (
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
};
