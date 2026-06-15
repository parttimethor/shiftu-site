"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

// Desktop smooth-scroll skin. `root` mode drives native window scroll (no
// transform wrapper, so position:fixed keeps working). syncTouch:false leaves
// mobile on native momentum. Disabled entirely under reduced-motion.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis
      root
      options={{ lerp: 0.09, smoothWheel: true, syncTouch: false, wheelMultiplier: 1 }}
    >
      {children}
    </ReactLenis>
  );
}
