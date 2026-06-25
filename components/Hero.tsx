"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smoothing
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouseActive = true;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Define floating abstract visual nodes for liquid simulation
    interface Blob {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      originalRadius: number;
      color: string;
    }

    const colors = [
      "rgba(194, 78, 43, 0.95)", // Terracotta accent (vibrant)
      "rgba(74, 77, 82, 0.85)",  // Deep graphite
      "rgba(216, 212, 201, 0.95)" // Warm line grey
    ];

    const blobs: Blob[] = Array.from({ length: 8 }, () => {
      const radius = Math.random() * 100 + 180; // Huge blobs (180px to 280px)
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.8, // More active drifting speed
        vy: (Math.random() - 0.5) * 1.8,
        radius,
        originalRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Update and draw floating blobs
      blobs.forEach((blob) => {
        // Move blobs
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce off bounds
        if (blob.x - blob.radius < -100 || blob.x + blob.radius > width + 100) blob.vx *= -1;
        if (blob.y - blob.radius < -100 || blob.y + blob.radius > height + 100) blob.vy *= -1;

        // Mouse interaction (elastic pull and distortion)
        if (mouseActive) {
          const dx = mouse.x - blob.x;
          const dy = mouse.y - blob.y;
          const distance = Math.hypot(dx, dy);
          
          if (distance < 550) {
            const force = (550 - distance) / 550;
            // Snappy elastic pull
            blob.x += dx * force * 0.08;
            blob.y += dy * force * 0.08;
            blob.radius = blob.originalRadius + force * 45;
          } else {
            blob.radius += (blob.originalRadius - blob.radius) * 0.1;
          }
        } else {
          blob.radius += (blob.originalRadius - blob.radius) * 0.1;
        }

        // Draw radial gradient blob for liquid blur merging
        const baseColor = blob.color.substring(0, blob.color.lastIndexOf(",")); // Extracts 'rgba(r, g, b'
        const grad = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        grad.addColorStop(0, `${baseColor}, 0.95)`);
        grad.addColorStop(0.6, `${baseColor}, 0.25)`);
        grad.addColorStop(1, "rgba(246, 244, 239, 0)");
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw mouse-attracted slime nucleolus
      if (mouseActive) {
        const mouseRadius = 220; // Massive attractor blob
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseRadius
        );
        grad.addColorStop(0, "rgba(194, 78, 43, 0.95)"); // Terracotta core
        grad.addColorStop(0.6, "rgba(194, 78, 43, 0.25)");
        grad.addColorStop(1, "rgba(246, 244, 239, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Text Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 py-16 md:py-24 border-b border-line overflow-hidden"
    >
      {/* Background Interactive Art */}
      <canvas
        ref={canvasRef}
        style={{ filter: "url(#gooey-hero)" }}
        className="absolute -top-20 -left-20 w-[calc(100%+160px)] h-[calc(100%+160px)] pointer-events-none z-0 select-none"
      />

      {/* SVG gooey filter for alpha-only thresholding (prevents color bleaching) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="gooey-hero">
            <feGaussianBlur in="SourceGraphic" stdDeviation="35" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      {/* Structural Watermark Silhouette Background */}
      <div className="absolute right-[-10%] top-[-10%] w-[60%] h-[120%] opacity-[0.018] pointer-events-none z-0 select-none hidden lg:block">
        <svg viewBox="0 0 500 500" className="w-full h-full fill-none stroke-ink" strokeWidth="0.5">
          <circle cx="250" cy="250" r="230" />
          <circle cx="250" cy="250" r="170" />
          <path d="M250,10 L250,490 M10,250 L490,250 M80,80 L420,420 M80,420 L420,80" />
          <path d="M250,30 C130,30 30,130 30,250 C30,370 130,470 250,470 C370,470 470,370 470,250" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Headline Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 flex flex-col items-start"
        >
          {/* Eyebrow Label */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-accent">
              Visual Director & Digital Strategist
            </span>
          </motion.div>

          {/* Hero Name / Title */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-semibold italic text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.0] text-ink mb-8"
          >
            Muhammad Muneeb Bilal
          </motion.h1>

          {/* Positioning Statement */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-lg md:text-xl lg:text-2xl font-light text-graphite leading-relaxed max-w-2xl mb-10 border-l border-line pl-6"
          >
            I build brand identities that didn&apos;t exist before I touched them — from a Turkish flooring manufacturer&apos;s first Instagram post to a five-entity education group&apos;s entire visual language. Four years, sixteen brands, one person doing the strategy and the execution.
          </motion.p>

          {/* CTA Buttons with Hover Anticipation */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link
              href="/work"
              className="pill-active-hover flex items-center justify-center gap-2 px-8 py-4 bg-ink text-paper rounded-full font-sans text-xs md:text-sm font-semibold tracking-wider uppercase shadow-sm border border-ink hover:bg-paper hover:text-ink hover:border-ink transition-all"
            >
              Explore Portfolio
            </Link>
            <Link
              href="/contact"
              className="pill-active-hover flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-line rounded-full font-sans text-xs md:text-sm font-semibold tracking-wider uppercase text-graphite hover:text-ink hover:border-ink transition-all"
            >
              Start Engagement
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Columns (Abstract Design space) */}
        <div className="lg:col-span-4 hidden lg:flex justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="w-80 h-96 relative border border-line rounded-3xl p-6 flex flex-col justify-between bg-paper/30 backdrop-blur-sm overflow-hidden"
          >
            {/* Silhouette Placeholder in background of the card */}
            <div className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none flex items-center justify-center p-8">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current text-ink" strokeWidth="0.5">
                <path d="M50,15 C30,15 25,30 25,50 C25,70 35,85 50,85 C65,85 75,70 75,50 C75,30 70,15 50,15 Z" />
                <path d="M35,45 C35,40 40,35 45,35 M65,45 C65,40 60,35 55,35 M40,70 C45,74 55,74 60,70" />
                <circle cx="50" cy="50" r="45" />
                <line x1="50" y1="5" x2="50" y2="95" />
                <line x1="5" y1="50" x2="95" y2="50" />
              </svg>
            </div>

            {/* Visual Design Elements representing art direction */}
            <div className="flex justify-between items-start z-10 relative">
              <span className="font-display font-bold italic text-accent text-6xl md:text-7xl leading-none">16+</span>
              <span className="text-[10px] font-sans font-semibold tracking-wider text-graphite uppercase">
                Active brands
              </span>
            </div>
            
            <div className="my-auto py-8">
              {/* Graphic bars representing timelines/campaign structure */}
              <div className="space-y-4">
                <div className="h-[1px] w-full bg-line" />
                <div className="h-[2px] w-[80%] bg-accent" />
                <div className="h-[1px] w-full bg-line" />
                <div className="h-[2px] w-[50%] bg-graphite" />
                <div className="h-[1px] w-[90%] bg-line" />
              </div>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-[10px] font-sans font-semibold tracking-widest text-ink uppercase">
                Choreographed
              </span>
              <span className="text-[10px] font-sans font-semibold tracking-widest text-accent uppercase font-bold">
                Pulse
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-graphite">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 text-graphite" />
      </motion.div>
    </div>
  );
};
