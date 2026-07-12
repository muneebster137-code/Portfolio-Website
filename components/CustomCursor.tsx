"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    
    checkTouch();
    
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.closest("[role='button']")
      ) {
        setIsHoveringLink(true);
      }
    };

    const handleMouseOut = () => {
      setIsHoveringLink(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    // Apply cursor-none class to body
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Primary Dot - follows cursor immediately */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-1.5 h-1.5 bg-accent rounded-full fixed pointer-events-none z-[999999]"
      />
      
      {/* Secondary Ring - follows with spring physics */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHoveringLink ? 48 : 24,
          height: isHoveringLink ? 48 : 24,
          backgroundColor: isHoveringLink ? "rgba(194, 78, 43, 0.08)" : "rgba(194, 78, 43, 0)",
          borderColor: isHoveringLink ? "rgba(194, 78, 43, 0.8)" : "rgba(194, 78, 43, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed pointer-events-none z-[999999] rounded-full border border-accent/40"
      />
    </>
  );
};
