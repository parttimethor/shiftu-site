"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "clay";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-blue text-white shadow-s2 hover:bg-blue-bright",
  secondary:
    "bg-card text-ink shadow-s1 ring-1 ring-hair hover:ring-ink/15",
  ghost: "text-ink hover:text-blue",
  onDark: "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15 backdrop-blur",
  // Claymorphism CTA: matte electric-blue clay with pressable depth.
  clay: "clay-blue clay-pressable text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  magnetic = true,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

  function onMove(e: React.MouseEvent) {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
    x.set(Math.max(-8, Math.min(8, dx)));
    y.set(Math.max(-8, Math.min(8, dy)));
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");

  const cls = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium font-sans transition-colors duration-200 ease-out",
    variants[variant],
    sizes[size],
    className,
  );

  const inner = (
    <>
      {children}
      {arrow && (
        <Icon
          name="ArrowRight"
          size={18}
          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (external) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={{ x, y }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cls}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <MotionLink
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cls}
    >
      {inner}
    </MotionLink>
  );
}
