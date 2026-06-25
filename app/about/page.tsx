"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Award, Briefcase, GraduationCap, Code, FileText, ArrowRight, Compass } from "lucide-react";

// Chronological timeline entries matching the PRD and content copy
const TIMELINE = [
  {
    slug: "bic-szabist",
    client: "BIC SZABIST",
    role: "Visual Journey Lead",
    dates: "Jan–Mar 2023",
    color: "#1F4E8C",
    isNested: false
  },
  {
    slug: "tim-hortons",
    client: "Tim Hortons Pakistan",
    role: "Marketing Intern",
    dates: "Dec 2023–Apr 2024",
    color: "#C24E2B",
    isNested: false
  },
  {
    slug: "green-pakistan-agro",
    client: "Green Pakistan Agro Farms",
    role: "Web Designer & Media Producer",
    dates: "May–Jun 2024",
    color: "#33503B",
    isNested: false
  },
  {
    slug: "pm-office",
    client: "Prime Minister's Office",
    role: "Media & Marketing Intern",
    dates: "Jul–Aug 2024",
    color: "#C24E2B",
    isNested: false
  },
  {
    slug: "beatrix-konnect",
    client: "Beatrix Konnect",
    role: "Brand Founder & Lead Developer",
    dates: "Sept–Oct 2024",
    color: "#1A2A52",
    isNested: false
  },
  {
    slug: "ndrmf",
    client: "NDRMF",
    role: "Media Intern",
    dates: "Sept–Dec 2024",
    color: "#2E5339",
    isNested: false
  },
  {
    slug: "treats-for-life",
    client: "Treats for Life",
    role: "Digital Marketing Manager & Lead Web Developer",
    dates: "Oct 2024–Jun 2025",
    color: "#C8862E",
    isNested: false
  },
  {
    slug: "fairmans-uk",
    client: "Fairmans Estate Agents (UK)",
    role: "Website Designer",
    dates: "Mar–Apr 2025",
    color: "#33495E",
    isNested: false
  },
  {
    slug: "bakebox",
    client: "Bakebox",
    role: "Packaging & Product Identity Designer",
    dates: "~Mar 2025",
    color: "#F2DFC4",
    isNested: false
  },
  {
    slug: "homeloom-uk",
    client: "Homeloom UK",
    role: "E-commerce Brand Director",
    dates: "May–Jul 2025",
    color: "#E8E2D6",
    isNested: false
  },
  {
    slug: "watch-how-malaysia",
    client: "Watch How Malaysia",
    role: "Visual Designer & Social Media Manager",
    dates: "Mid 2025–Present",
    color: "#C24E2B",
    isNested: false,
    hasSubAccounts: true
  },
  // Routed Category B Accounts Nested Under Watch How
  {
    slug: "safir-wear",
    client: "Safir Wear",
    role: "Lead Designer & AI Visual Strategist",
    dates: "Feb 2026–Present",
    color: "#2A1A3D",
    isNested: true
  },
  {
    slug: "facingnorth",
    client: "FacingNorth",
    role: "Marketing Director & Itinerary Designer",
    dates: "Mar 2026–Present",
    color: "#3E7CB1",
    isNested: true
  },
  {
    slug: "trenddeck",
    client: "Trenddeck",
    role: "Lead Social Media Strategist",
    dates: "Mar–May 2026",
    color: "#5C4633",
    isNested: true
  },
  {
    slug: "aba-group",
    client: "ABA Group",
    role: "Global Social Media Manager",
    dates: "Apr 2026–Present",
    color: "#1B2A4A",
    isNested: true
  },
  {
    slug: "anebos-studios",
    client: "Anebos Studios",
    role: "Founder & Creative Director",
    dates: "Ongoing",
    color: "#0C0C0C",
    isNested: false
  }
];

const SKILL_GROUPS = [
  {
    category: "Visual Design & Branding",
    skills: ["Brand Guidelines", "Visual Identity", "Creative Direction", "UI/UX Visualization", "Storyboarding"]
  },
  {
    category: "Multimedia Production",
    skills: ["Product Photography", "Videography", "Choreography", "Reel Creation", "Script Writing"]
  },
  {
    category: "Digital Marketing",
    skills: ["Social Media Management", "Content Strategy", "Paid Promotions", "Meta Business Suite"]
  },
  {
    category: "Web Development (Tool-Assisted)",
    skills: ["WordPress", "Elementor", "Figma", "Webflow", "Vercel"]
  },
  {
    category: "Software & Tools",
    skills: ["Adobe Creative Suite (Ps, Ai, Lr)", "Canva", "Figma", "CapCut", "DaVinci Resolve"]
  }
];

const CERTIFICATIONS = [
  { title: "Anti-Racism II", provider: "University of Colorado", year: "2024" },
  { title: "Renewable Energy & Green Building Entrepreneurship", provider: "Duke University", year: "2024" },
  { title: "Asian Environmental Humanities: Landscapes in Transition", provider: "University of Zurich", year: "2024" },
  { title: "Practicing Sustainability, Responsibility and Ethics", provider: "University of Manchester", year: "2022" },
  { title: "Philosophy, Science and Religion: Philosophy and Religion", provider: "University of Edinburgh", year: "2022" },
  { title: "Feminism and Social Justice", provider: "University of California, Santa Cruz", year: "2022" },
  { title: "The SDGs — A Global, Transdisciplinary Vision for the Future", provider: "University of Copenhagen", year: "2022" }
];

export default function About() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 120]);
  const [heroImg, setHeroImg] = useState("/images/about-hero.webp");
  const [portraitImg, setPortraitImg] = useState("/images/muneeb-bilal.webp");

  return (
    <article className="w-full pb-20">
      
      {/* 1. About Hero Header Band (Full Page Stretch) */}
      <section 
        className="w-full min-h-[55vh] flex flex-col justify-end py-16 px-6 md:px-12 relative overflow-hidden transition-colors duration-700 bg-accent text-paper"
      > 
        {/* Parallax Desaturated Background Image */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0 opacity-50 mix-blend-overlay pointer-events-none select-none"
        >
          <img 
            src={heroImg} 
            onError={() => setHeroImg("https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200")}
            alt="" 
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-graphite),transparent_75%)] opacity-35" />
        <div className="absolute inset-0 bg-ink/10" />
        <div className="absolute inset-0 grain-overlay opacity-[0.08]" />

        {/* White-Spaced Artistic Silhouette watermark */}
        <div className="absolute right-[5%] top-[10%] w-[380px] h-[380px] opacity-[0.045] pointer-events-none select-none z-0">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-paper" strokeWidth="0.5">
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="30" />
            <path d="M50,5 L50,95 M5,50 L95,50 M18.3,18.3 L81.7,81.7" />
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto w-full relative z-10">
          {/* Eyebrow Breadcrumbs */}
          <div className="flex items-center gap-3 mb-6">
            <Link 
              href="/" 
              className="text-xs uppercase font-semibold tracking-widest text-paper/70 hover:text-paper hover:underline transition-colors"
            >
              Home
            </Link>
            <span className="text-paper/40 text-xs">/</span>
            <span className="text-xs uppercase font-semibold tracking-widest text-paper/90">
              About
            </span>
          </div>

          {/* Title & Floating Glassy Compass Icon Badge */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-16 h-16 rounded-2xl bg-paper/10 backdrop-blur-md border border-paper/20 flex items-center justify-center text-paper shadow-lg hover:bg-paper/20 hover:scale-105 transition-all duration-300 shrink-0"
            >
              <Compass className="w-10 h-10 stroke-[1.25]" />
            </motion.div>
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-display font-semibold italic text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-wide"
            >
              Muhammad Muneeb Bilal
            </motion.h1>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-paper/20 pt-8">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-paper/50 block mb-1">Role</span>
              <span className="font-sans text-sm font-semibold">Visual Designer & Strategist</span>
            </div>
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-paper/50 block mb-1">Location</span>
              <span className="font-sans text-sm font-semibold">Islamabad, Pakistan</span>
            </div>
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-paper/50 block mb-1">Status</span>
              <span className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Active
              </span>
            </div>
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-paper/50 block mb-1">Education</span>
              <span className="font-sans text-sm font-semibold">BS Social Sciences (SZABIST)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Biography & Timelines Container */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24">
        
        {/* 2. Biography block */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Biography Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="font-sans text-base md:text-lg text-graphite leading-relaxed space-y-6 max-w-3xl">
            <p>
              I&apos;m a visual designer and digital strategist based in Islamabad. I&apos;m in my final year of a BS in Social Sciences (Development Studies) at SZABIST — currently 8th semester, 3.80 CGPA, Gold Medal Contender, and Dean&apos;s Honor List — and that background shapes how I work more than people expect.
            </p>
            <p>
              Brand strategy isn&apos;t just color and layout to me; it&apos;s socio-cultural pattern recognition. Why does a &ldquo;Safe Space&rdquo; palette calm a psychology client&apos;s audience, and why would the same palette read as flat for a test-prep brand serving the same parent company? That&apos;s a development-studies question as much as a design one.
            </p>
            <p>
              Since late 2023, I&apos;ve worked across internship roles (Tim Hortons Pakistan, the Prime Minister&apos;s Office, the National Disaster Risk Management Fund), founded my own brand identities for clients from zero (Beatrix Konnect, Trenddeck&apos;s entire social presence), built and launched e-commerce sites end to end (Treats for Life, Green Pakistan Agro Farms, Fairmans Estate Agents UK), and currently work through Watch How Malaysia, who route me client accounts across Turkey and Southeast Asia — right now that&apos;s Safir Wear, FacingNorth, and the five-entity ABA Group.
            </p>
            <p>
              I also run Anebos Studios, a personal studio built around what I call the Kinetic Pulse — treating every piece of content, especially video, as a choreographed performance rather than a static post.
            </p>
          </div>
        </div>

        {/* Info Cards Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Portrait with desaturated designer placeholder */}
          <motion.div 
            initial={{ opacity: 0, rotate: -2, y: 30 }}
            whileInView={{ opacity: 1, rotate: 0, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotate: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="w-full aspect-square border border-line rounded-3xl relative overflow-hidden flex flex-col justify-end p-6 bg-paper cursor-pointer group shadow-sm hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-accent/5 shimmer-bg z-10 pointer-events-none" />
            <div className="absolute inset-0 grain-overlay opacity-[0.05] z-10 pointer-events-none" />
            <img 
              src={portraitImg} 
              onError={() => setPortraitImg("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800")}
              alt="Muhammad Muneeb Bilal" 
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-110 opacity-70 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-20 text-paper bg-ink/30 backdrop-blur-[2px] p-4 rounded-xl">
              <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-paper/70 block mb-1">
                Visual Strategist
              </span>
              <span className="font-display font-semibold italic text-base text-paper">
                Muneeb Bilal
              </span>
            </div>
          </motion.div>

          {/* CV Action Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, borderColor: "var(--accent)" }}
            className="border border-line rounded-3xl p-8 space-y-6 bg-paper/50 backdrop-blur-sm transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              <h4 className="text-xs uppercase tracking-widest font-semibold text-graphite">
                Resume / CV
              </h4>
            </div>
            <p className="font-sans text-xs text-graphite leading-relaxed">
              Access my fully structured curriculum vitae optimized for print layouts. Matches digital timeline cases exactly.
            </p>
            <Link
              href="/resume"
              className="pill-active-hover flex items-center justify-center gap-2 px-6 py-3.5 bg-ink text-paper rounded-2xl font-sans text-xs font-semibold uppercase tracking-wider hover:bg-transparent hover:text-ink border border-ink transition-all"
            >
              Printable Web CV
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Chronological Nested vertical timeline */}
      <section className="border-t border-line py-20">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent">
              Historical Graph
            </span>
          </div>
          <h2 className="font-display font-semibold italic text-3xl md:text-5xl text-ink">
            Chronology of Engagements
          </h2>
          <p className="font-sans text-sm text-graphite mt-3 max-w-2xl leading-relaxed">
            Note: Sub-case-studies (Safir Wear, FacingNorth, Trenddeck, ABA Group) are indented to display their routing via Watch How Malaysia.
          </p>
        </div>

        {/* Timeline Line */}
        <div className="relative pl-6 md:pl-12 border-l border-line/70 space-y-12">
          {TIMELINE.map((item, idx) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, x: -40, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.02 }}
              className={`relative ${item.isNested ? "pl-8 md:pl-12 mt-4" : ""}`}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, delay: 0.15 + idx * 0.02 }}
                className={`absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full border-4 border-paper z-10 transition-all duration-300 ${
                  item.isNested ? "-left-[63px] md:-left-[103px] w-3.5 h-3.5 border-2" : ""
                }`}
                style={{ backgroundColor: item.color }}
              />

              {/* Connecting nested indicator branches */}
              {item.isNested && (
                <div className="absolute -left-6 md:-left-12 top-[-20px] w-6 md:w-12 h-[34px] border-l-2 border-b-2 border-line/60 rounded-bl-xl pointer-events-none" />
              )}

              {/* Event Block */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 border-b border-line/30 group">
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-ink flex items-center gap-2 group-hover:text-accent-primary transition-colors">
                    <Link href={`/work/${item.slug}`} className="hover:underline flex items-center gap-1">
                      {item.client}
                      {item.isNested && (
                        <span className="text-[9px] font-sans font-semibold tracking-wider text-graphite uppercase normal-case px-1.5 py-0.5 rounded border border-line bg-paper/50">
                          Routed
                        </span>
                      )}
                    </Link>
                  </h3>
                  <span className="font-sans text-xs md:text-sm text-graphite/80 font-medium">
                    {item.role}
                  </span>
                </div>
                <span className="font-sans text-xs font-semibold tracking-widest text-ink/40 uppercase shrink-0">
                  {item.dates}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Education & Certifications */}
      <section className="border-t border-line py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Education column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-accent" />
            <h2 className="font-display font-semibold italic text-2xl md:text-3xl text-ink">
              Education
            </h2>
          </div>
          
          <div className="border border-line rounded-3xl p-8 bg-paper/50 space-y-4">
            <span className="text-[10px] font-sans font-bold tracking-widest text-accent uppercase">
              2022–Present (8th Semester)
            </span>
            <h3 className="font-display font-bold italic text-xl text-ink">
              Bachelor of Social Sciences
            </h3>
            <p className="font-sans text-sm text-graphite font-semibold">
              SZABIST Islamabad
            </p>
            <ul className="space-y-2 font-sans text-xs text-graphite/80 leading-relaxed pt-2">
              <li>• Major in Development Studies</li>
              <li>• CGPA 3.80, Gold Medal Contender, Dean&apos;s Honor List</li>
              <li>• Class Representative, active in coordinating academic events</li>
            </ul>
          </div>
        </div>

        {/* Certifications column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            <h2 className="font-display font-semibold italic text-2xl md:text-3xl text-ink">
              University Certifications
            </h2>
          </div>

          <div className="space-y-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 5, borderColor: "var(--accent)" }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between gap-4 p-4 border border-line/60 rounded-2xl bg-paper/30 hover:shadow-md cursor-pointer transition-all"
              >
                <div>
                  <h4 className="font-sans text-xs md:text-sm font-semibold text-ink leading-snug">
                    {cert.title}
                  </h4>
                  <span className="font-sans text-[10px] text-graphite/70">
                    {cert.provider}
                  </span>
                </div>
                <span className="font-sans text-[10px] font-bold text-accent shrink-0">
                  {cert.year}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Skills Grids */}
      <section className="border-t border-line py-20 space-y-12">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-accent" />
          <h2 className="font-display font-semibold italic text-2xl md:text-3xl text-ink">
            Core Competencies & Toolset
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, borderColor: "var(--accent)", transition: { duration: 0.2 } }}
              transition={{ delay: idx * 0.08, duration: 0.8, ease: "easeOut" }}
              className="border border-line rounded-3xl p-6 md:p-8 bg-paper/40 cursor-pointer"
            >
              <h3 className="font-display font-bold italic text-lg text-accent-primary mb-6 border-b border-line pb-3">
                {group.category}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-line/80 bg-paper text-ink transition-colors hover:border-accent-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      </div>
    </article>
  );
}
