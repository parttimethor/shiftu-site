"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const EASE = [0, 0, 0.58, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// Pop-in for cards/badges: subtle backOut overshoot.
export function Pop({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
