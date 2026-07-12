"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const Nav = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const links = [
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const listVariants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
    },
    closed: {
      y: 40,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isMobileMenuOpen
          ? "py-6 bg-transparent border-transparent pointer-events-auto"
          : isScrolled
            ? "py-3 bg-transparent border-transparent backdrop-blur-none pointer-events-none"
            : "py-6 border-b border-line bg-paper/85 backdrop-blur-md pointer-events-auto"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          isMobileMenuOpen
            ? "w-full max-w-[1400px] px-6 md:px-12 pointer-events-auto"
            : isScrolled
              ? "w-[calc(100%-2rem)] max-w-xl bg-paper/85 backdrop-blur-md border border-line/60 rounded-full px-6 py-2.5 shadow-xl pointer-events-auto"
              : "w-full max-w-[1400px] px-6 md:px-12 pointer-events-auto"
        }`}
      >
        {/* Logo / Initials */}
        <Link 
          href="/" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="group relative flex items-center gap-1.5 focus-visible:outline-none z-50"
        >
          <span 
            className={`font-display text-lg font-bold tracking-widest uppercase transition-colors duration-300 ${
              isMobileMenuOpen ? "text-paper" : "text-ink"
            }`}
          >
            M. M. Bilal
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </Link>

        {/* Desktop Links Navigation */}
        <nav className="hidden md:flex items-center gap-8 md:gap-12">
          {links.map((link) => {
            const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                href={link.path}
                className="group relative py-2 font-sans text-xs md:text-sm font-semibold tracking-wider uppercase text-ink/75 hover:text-ink focus-visible:outline-none transition-colors duration-300"
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-ink/40 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 z-50 p-2 cursor-pointer focus-visible:outline-none"
          aria-label="Toggle Menu"
        >
          <span className={`block w-6 h-[2px] transition-all duration-300 ${isMobileMenuOpen ? "bg-paper rotate-45 translate-y-[8px]" : "bg-ink"}`} />
          <span className={`block w-6 h-[2px] transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "bg-ink"}`} />
          <span className={`block w-6 h-[2px] transition-all duration-300 ${isMobileMenuOpen ? "bg-paper -rotate-45 -translate-y-[8px]" : "bg-ink"}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink/98 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto"
          >
            <motion.nav
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center gap-8"
            >
              {links.map((link) => {
                const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
                return (
                  <div key={link.path} className="overflow-hidden py-2">
                    <motion.div variants={itemVariants}>
                      <Link
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-4xl md:text-5xl font-display font-semibold italic tracking-wide transition-colors duration-300 block text-center ${
                          isActive ? "text-accent" : "text-paper/85 hover:text-accent"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
