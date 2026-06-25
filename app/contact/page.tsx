"use client";

import React from "react";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone, Linkedin, Download, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Direct Info & Taglines */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent">
                Engagement Inquiries
              </span>
            </div>
            <h1 className="font-display font-semibold italic text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
              Let&apos;s Design Your Strategy
            </h1>
            <p className="font-sans text-sm md:text-base text-graphite leading-relaxed">
              Have a project, a brand, or an account that needs a strategist? I&apos;m based in Islamabad, Pakistan, and collaborate remotely with global teams.
            </p>
          </div>

          {/* Direct Coordinates */}
          <div className="space-y-6 pt-6 border-t border-line">
            <h3 className="text-[10px] font-sans font-bold uppercase tracking-widest text-graphite/40">
              Direct Coordinates
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-line rounded-xl flex items-center justify-center text-accent bg-paper group-hover:bg-ink group-hover:text-paper transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-graphite/60 font-semibold block">Email</span>
                  <a href="mailto:muneebster137@gmail.com" className="font-sans text-sm font-semibold hover:text-accent transition-colors">
                    muneebster137@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-line rounded-xl flex items-center justify-center text-accent bg-paper group-hover:bg-ink group-hover:text-paper transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-graphite/60 font-semibold block">Phone</span>
                  <span className="font-sans text-sm font-semibold text-ink">
                    +92-328-5726711
                  </span>
                </div>
              </li>

              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-line rounded-xl flex items-center justify-center text-accent bg-paper group-hover:bg-ink group-hover:text-paper transition-all">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-graphite/60 font-semibold block">LinkedIn</span>
                  <a 
                    href="https://linkedin.com/in/Muneeb-Bilal" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-sans text-sm font-semibold hover:text-accent transition-colors"
                  >
                    linkedin.com/in/Muneeb-Bilal
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* CV Rebuild CTA */}
          <div className="border border-line rounded-3xl p-6 bg-paper/30 space-y-4">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-graphite">
              Print-Ready CV
            </h4>
            <p className="font-sans text-xs text-graphite/70 leading-relaxed">
              Recruiters looking for a hardcopy summary can print my direct web-rebuilt portfolio resume immediately.
            </p>
            <Link 
              href="/resume"
              className="pill-active-hover inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline uppercase tracking-wider"
            >
              <Download className="w-3.5 h-3.5" /> View Rebuilt CV
            </Link>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </section>
    </div>
  );
}
