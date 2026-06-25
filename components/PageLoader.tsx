"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  "MUNEB",
  "STRATEGIST",
  "IDENTITY",
  "KINETIC",
  "EXPERIENCE"
];

export const PageLoader = () => {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    if (index === WORDS.length - 1) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 700);
      return () => clearTimeout(timer);
    }

    const interval = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 280);

    return () => {
      clearTimeout(interval);
      document.body.style.overflow = "";
    };
  }, [index, loading]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
            transition: { duration: 1.1, ease: [0.85, 0, 0.15, 1] as const },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-ink text-paper"
        >
          <div className="flex flex-col items-center justify-center max-w-lg px-8 text-center">
            {/* Pulsing Abstract Ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-16 h-16 mb-8 border border-line/30 rounded-full flex items-center justify-center"
            >
              <div className="w-2.5 h-2.5 bg-accent rounded-full animate-ping" />
            </motion.div>

            {/* Staggered Morphing Words */}
            <div className="overflow-hidden h-20 flex items-center justify-center">
              <motion.h2
                key={WORDS[index]}
                initial={{ y: 60, opacity: 0, rotate: 2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -60, opacity: 0, rotate: -2 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] as const }}
                className="font-display font-semibold text-4xl md:text-6xl tracking-wider text-paper uppercase italic"
              >
                {WORDS[index]}
              </motion.h2>
            </div>

            {/* Dynamic Status Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="mt-6 flex items-center gap-2"
            >
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] font-semibold text-paper/70">
                CHOREOGRAPHING PULSE
              </span>
              <span className="text-[10px] font-sans text-accent font-bold">
                {Math.round(((index + 1) / WORDS.length) * 100)}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
