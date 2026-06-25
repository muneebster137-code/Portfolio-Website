"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export const Nav = () => {
  const pathname = usePathname();

  const links = [
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-50 border-b border-line bg-paper/85 backdrop-blur-md transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo / Initials */}
        <Link href="/" className="group relative flex items-center gap-1.5 focus-visible:outline-none">
          <span className="font-display text-lg font-bold tracking-widest text-ink uppercase">
            M. M. Bilal
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </Link>

        {/* Links Navigation */}
        <nav className="flex items-center gap-8 md:gap-12">
          {links.map((link) => {
            const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                href={link.path}
                className="relative py-2 font-sans text-xs md:text-sm font-semibold tracking-wider uppercase text-ink/75 hover:text-ink focus-visible:outline-none transition-colors duration-300"
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-ink/30 transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
