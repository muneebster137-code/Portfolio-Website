import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-ink text-paper border-t border-line/10 relative overflow-hidden transition-colors duration-500">
      {/* Visual Accent Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--accent-primary),transparent_35%)] opacity-20 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-line/10 pb-16">
          
          {/* Identity Column */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl font-bold italic tracking-wide mb-4">
              Muhammad Muneeb Bilal
            </h3>
            <p className="font-sans text-sm text-paper/60 max-w-sm leading-relaxed mb-6">
              Visual Designer and Digital Strategist. Structuring visual coherence and kinetic brand expressions for digital products.
            </p>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-line/10 bg-paper/5 text-paper/80">
              One Structure. Sixteen Voices.
            </span>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/40 mb-6">
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:muneebster137@gmail.com"
                  className="group flex items-center gap-1 font-sans text-sm hover:text-accent transition-colors duration-300"
                >
                  muneebster137@gmail.com
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </li>
              <li>
                <span className="font-sans text-sm text-paper/60 block">
                  +92-328-5726711
                </span>
              </li>
              <li>
                <span className="font-sans text-sm text-paper/60 block">
                  Islamabad, Pakistan (GMT+5)
                </span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/40 mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://linkedin.com/in/Muneeb-Bilal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 font-sans text-sm hover:text-accent transition-colors duration-300"
                >
                  LinkedIn
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="group flex items-center gap-1 font-sans text-sm hover:text-accent transition-colors duration-300"
                >
                  Printable CV / Resume
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="group flex items-center gap-1 font-sans text-sm hover:text-accent transition-colors duration-300"
                >
                  All Projects
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 text-[11px] font-sans text-paper/40">
          <div>
            © {currentYear} Muhammad Muneeb Bilal. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Visual Strategy & Identity Showcase</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
