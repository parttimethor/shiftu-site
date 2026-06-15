"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

/* Shift Ü brand-first intro overlay.
 * Order: stage opens (soft) -> brand anchors SHIFT (white) + Ü (electric blue)
 * land first via blur + mask reveal -> the rest of each line grows in around
 * them -> hold -> curtain lifts. Once per session; skipped on reduced-motion. */

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_IN_QUINT = [0.7, 0, 0.84, 0] as const;
const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

const T = {
  brandDelay: 0.26,
  restLine1: 0.78,
  restLine2: 1.0,
  wordStagger: 0.07,
  holdUntil: 2.5, // seconds before exit
  exitMs: 1100,
};

const brandVariant: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(14px)", clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: T.brandDelay },
  },
};

const restWord: Variants = {
  hidden: { opacity: 0, x: -10, filter: "blur(8px)" },
  show: (delay: number) => ({
    opacity: 0.55,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.76, ease: EASE_OUT_QUINT, delay },
  }),
};

const groupVariant: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_QUINT } },
  leave: { opacity: 0, y: -24, filter: "blur(6px)", transition: { duration: 0.5, ease: EASE_IN_QUINT } },
};

const LINE1_REST = ["the", "busy", "work."];
const LINE2_REST = ["keep", "the", "business."];
const d = (base: number, i: number) => base + i * T.wordStagger;

export function IntroOverlay() {
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const reduce = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("introSeen") === "1";
    } catch {}
    if (seen || reduce) {
      setShow(false);
      return;
    }
    document.body.style.overflow = "hidden";
    timers.current.push(setTimeout(() => setLeaving(true), T.holdUntil * 1000));
    timers.current.push(
      setTimeout(() => {
        try {
          sessionStorage.setItem("introSeen", "1");
        } catch {}
        document.body.style.overflow = "";
        setShow(false);
      }, T.holdUntil * 1000 + 120),
    );
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: T.exitMs / 1000, ease: EASE_CURTAIN }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink-dark px-6"
        >
          <motion.div
            aria-hidden
            className="mesh-glow pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.9, ease: EASE_OUT_QUINT }}
          />
          <motion.div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1.1, ease: EASE_OUT_QUINT }}
          />

          <motion.div
            variants={groupVariant}
            initial="hidden"
            animate={leaving ? "leave" : "show"}
            className="relative text-center font-display font-bold tracking-tight"
            role="img"
            aria-label="SHIFT the busy work. Ü keep the business."
          >
            <p aria-hidden className="text-[2rem] leading-[1.1] sm:text-5xl lg:text-[4rem]">
              <motion.span
                variants={brandVariant}
                initial="hidden"
                animate="show"
                className="inline-block text-white [will-change:transform,filter,opacity]"
              >
                SHIFT
              </motion.span>{" "}
              {LINE1_REST.map((w, i) => (
                <motion.span
                  key={`l1-${i}`}
                  custom={d(T.restLine1, i)}
                  variants={restWord}
                  initial="hidden"
                  animate="show"
                  className="inline-block text-white [will-change:transform,filter,opacity]"
                >
                  {w}
                  {i < LINE1_REST.length - 1 ? " " : ""}
                </motion.span>
              ))}
            </p>
            <p aria-hidden className="mt-2 text-[2rem] leading-[1.1] sm:text-5xl lg:text-[4rem]">
              <motion.span
                variants={brandVariant}
                initial="hidden"
                animate="show"
                className="inline-block text-blue-bright [will-change:transform,filter,opacity]"
                style={{ textShadow: "0 0 22px rgba(0,62,253,0.45)" }}
              >
                Ü
              </motion.span>{" "}
              {LINE2_REST.map((w, i) => (
                <motion.span
                  key={`l2-${i}`}
                  custom={d(T.restLine2, i)}
                  variants={restWord}
                  initial="hidden"
                  animate="show"
                  className="inline-block text-white [will-change:transform,filter,opacity]"
                >
                  {w}
                  {i < LINE2_REST.length - 1 ? " " : ""}
                </motion.span>
              ))}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
