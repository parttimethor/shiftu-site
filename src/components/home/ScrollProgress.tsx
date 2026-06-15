"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin top rail that fills as you move through the page = "one journey".
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-blue to-blue-bright"
    />
  );
}
