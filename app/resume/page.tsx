"use client";

import React from "react";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-paper py-12 px-6 md:px-12 print:p-0 transition-colors duration-500">
      
      {/* 1. Header Toolbar (Hidden in Print) */}
      <div className="max-w-[850px] mx-auto mb-8 flex items-center justify-between border-b border-line pb-6 print:hidden">
        <Link
          href="/about"
          className="flex items-center gap-1 text-xs font-bold text-graphite hover:text-ink uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to About
        </Link>
        
        <button
          onClick={handlePrint}
          className="pill-active-hover flex items-center gap-2 px-5 py-2.5 bg-ink text-paper rounded-xl font-sans text-xs font-bold uppercase tracking-wider"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
      </div>

      {/* 2. Main CV A4 Container */}
      <article className="max-w-[850px] mx-auto bg-paper p-8 md:p-12 border border-line rounded-3xl print:border-none print:p-0 print:rounded-none">
        
        {/* CV Header */}
        <header className="border-b-2 border-ink pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display font-bold text-4xl text-ink uppercase tracking-wide">
              Muhammad Muneeb Bilal
            </h1>
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-accent mt-2">
              Visual Designer & Digital Strategist
            </p>
          </div>
          
          {/* Coordinates info */}
          <div className="text-right font-sans text-xs text-graphite space-y-1 md:max-w-xs md:text-right text-left">
            <p>muneebster137@gmail.com</p>
            <p>+92-328-5726711</p>
            <p>Islamabad, Pakistan</p>
            <p className="font-semibold text-ink">linkedin.com/in/muneeb-bilal-886481282</p>
          </div>
        </header>

        {/* CV Objective / Summary */}
        <section className="py-6 border-b border-line">
          <p className="font-sans text-sm text-ink leading-relaxed font-light">
            Award-nominated Visual Designer and Digital Strategist with 4+ years of experience constructing visual guidelines, managing digital campaign structures, and engineering tool-assisted e-commerce web layers. Experienced routing cross-border digital content workflows through prime contracting agencies to businesses in Turkey, Southeast Asia, and the UK. Active final-year BS Social Sciences honors candidate applying development paradigms to brand strategy.
          </p>
        </section>

        {/* CV Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6">
          
          {/* Left Column: Experience */}
          <div className="md:col-span-8 space-y-6">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-ink border-b-2 border-line pb-1">
              Professional Engagements
            </h2>

            <div className="space-y-6">
              
              {/* Watch How */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h3 className="font-sans text-sm font-bold text-ink">
                    Watch How Malaysia <span className="text-xs font-normal text-graphite/80">(Primary Contractor)</span>
                  </h3>
                  <span className="text-[10px] font-sans font-bold text-accent uppercase">Mid 2025 – Present</span>
                </div>
                <p className="font-sans text-xs text-graphite font-semibold">Global Visual Designer & Social Coordinator</p>
                <ul className="text-xs text-graphite space-y-1.5 list-disc pl-4">
                  <li>Directly coordinate brand assets and guidelines for Watch How subsidiary operations.</li>
                  <li>Managed routed client accounts spanning Turkey and Southeast Asia, including:</li>
                  <li className="list-none pl-2">
                    <strong>• ABA Group:</strong> Redesigned and administered visual identity systems for 5 education, prep, psychology, NGO, and design entities.
                  </li>
                  <li className="list-none pl-2">
                    <strong>• Safir Wear:</strong> Conceived AI-assisted streetwear lookbooks and built responsive web showcase galleries.
                  </li>
                  <li className="list-none pl-2">
                    <strong>• Trenddeck:</strong> Created social branding presence from zero, launching biophilic design campaigns.
                  </li>
                  <li className="list-none pl-2">
                    <strong>• FacingNorth:</strong> Produced adventure-based marketing itineraries and scenic media campaigns.
                  </li>
                </ul>
              </div>

              {/* Treats for Life */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h3 className="font-sans text-sm font-bold text-ink">Treats for Life</h3>
                  <span className="text-[10px] font-sans font-bold text-accent uppercase">Oct 2024 – Jun 2025</span>
                </div>
                <p className="font-sans text-xs text-graphite font-semibold">Digital Marketing Manager & Lead Web Developer</p>
                <ul className="text-xs text-graphite space-y-1 list-disc pl-4">
                  <li>Designed and deployed the official treatsforlife.com e-commerce web platform.</li>
                  <li>Conducted natural-light macro photography and choreographed organic food ASMR video reels.</li>
                </ul>
              </div>

              {/* NDRMF */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h3 className="font-sans text-sm font-bold text-ink">National Disaster Risk Management Fund</h3>
                  <span className="text-[10px] font-sans font-bold text-accent uppercase">Sept – Dec 2024</span>
                </div>
                <p className="font-sans text-xs text-graphite font-semibold">Public Media & Design Intern</p>
                <ul className="text-xs text-graphite space-y-1 list-disc pl-4">
                  <li>Translated relief statistics into public information graphics, reducing delivery times by 30%.</li>
                  <li>Produced humanitarian documentation reels and aligned campaigns to SDG earth palettes.</li>
                </ul>
              </div>

              {/* Beatrix Konnect */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h3 className="font-sans text-sm font-bold text-ink">Beatrix Konnect</h3>
                  <span className="text-[10px] font-sans font-bold text-accent uppercase">Sept – Oct 2024</span>
                </div>
                <p className="font-sans text-xs text-graphite font-semibold">Brand Founder & Lead Developer</p>
                <ul className="text-xs text-graphite space-y-1 list-disc pl-4">
                  <li>Created logo systems and built the beatrixkonnect.com outsourcing portal.</li>
                </ul>
              </div>

              {/* Other engagements brief */}
              <div className="space-y-2 pt-2 border-t border-line/30">
                <h4 className="text-[10px] font-sans font-bold uppercase tracking-wider text-ink">
                  Additional Engagements
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-graphite">
                  <p><strong>• Fairmans Estate Agents UK:</strong> Web Designer (Mar–Apr 2025)</p>
                  <p><strong>• Green Pakistan Agro Farms:</strong> Designer & Producer (May–Jun 2024)</p>
                  <p><strong>• PM Office:</strong> Marketing Intern (Jul–Aug 2024)</p>
                  <p><strong>• Tim Hortons Pakistan:</strong> Launch Intern (Dec 2023–Apr 2024)</p>
                  <p><strong>• BIC SZABIST:</strong> Visual Journey Lead (Jan–Mar 2023)</p>
                  <p><strong>• Anebos Studios:</strong> Founder & Creative Director (Ongoing)</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Education & Skills & Certifications */}
          <div className="md:col-span-4 space-y-6">
            
            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-ink border-b-2 border-line pb-1">
                Education
              </h2>
              <div className="space-y-1">
                <h3 className="font-sans text-xs font-bold text-ink">SZABIST Islamabad</h3>
                <p className="font-sans text-[10px] text-accent font-bold">BS Social Sciences • 2022–Present</p>
                <p className="font-sans text-[11px] text-graphite leading-relaxed">
                  Major in Development Studies. CGPA 3.80, Gold Medal Contender, Dean&apos;s Honor List. Class Representative.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-ink border-b-2 border-line pb-1">
                Competencies
              </h2>
              <div className="space-y-3 text-[11px] text-graphite leading-snug">
                <div>
                  <p className="font-semibold text-ink">Visual Branding</p>
                  <p>Corporate Guidelines, Visual Identity, Art Direction, UI Visualization</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Multimedia Production</p>
                  <p>Product Photography, Videography, Choreography, Reel Creation</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Web Setup</p>
                  <p>WordPress, Elementor, Figma, Webflow, Vercel</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Software</p>
                  <p>Adobe CC (Ps, Ai, Lr), Figma, CapCut, DaVinci Resolve</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-ink border-b-2 border-line pb-1">
                Certifications
              </h2>
              <div className="space-y-2 text-[10px] text-graphite leading-snug">
                <p><strong>• Anti-Racism II</strong> — University of Colorado (2024)</p>
                <p><strong>• Green Entrepreneurship</strong> — Duke University (2024)</p>
                <p><strong>• Environmental Humanities</strong> — University of Zurich (2024)</p>
                <p><strong>• Sustainability Ethics</strong> — University of Manchester (2022)</p>
                <p><strong>• Philosophy & Religion</strong> — University of Edinburgh (2022)</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer citation */}
        <footer className="border-t border-line pt-6 mt-6 flex justify-between items-center text-[10px] font-sans text-graphite">
          <span>Verifiable online at: portfolio.muneebbilal.com</span>
          <span className="print:hidden">Muhammad Muneeb Bilal Resume</span>
        </footer>

      </article>
    </div>
  );
}
