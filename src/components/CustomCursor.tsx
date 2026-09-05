"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 30, stiffness: 100 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Only show on desktop
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = Boolean(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("a") ||
          target.closest("button") ||
          window.getComputedStyle(target).cursor === "pointer",
      );
      setIsHovering(isClickable);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile/tablet
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        className="rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isVisible ? (isHovering ? 1.3 : 1) : 0,
          opacity: isVisible ? 0.8 : 0,
          backgroundColor: isHovering ? "#3b5ccc" : "#db4a2b",
        }}
        style={{
          width: 16,
          height: 16,
          marginLeft: -8,
          marginTop: -8,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          backgroundColor: { duration: 0.2 },
        }}
      />
    </motion.div>
  );
}

