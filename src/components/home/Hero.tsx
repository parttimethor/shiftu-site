"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { WorkflowOrbit } from "./WorkflowOrbit";
import { Spotlight } from "../ui/spotlight";
import { FlipWords } from "../ui/flip-words";

const EASE = [0, 0, 0.58, 1] as const;
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// Hook / Hero beat. The raycast blue scene shows through; a 3D agent (Spline)
// sits on the right; flip-words give the headline motion. LCP = the H1 text.
export function Hero() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Play the entrance when the intro curtain lifts, so it is actually seen.
    // On repeat visits (intro already shown this session) or reduced motion,
    // start immediately. A fallback timer guarantees the hero never stays hidden.
    let seen = false;
    try {
      seen = sessionStorage.getItem("introSeen") === "1";
    } catch {}
    if (seen || reduce) {
      setStarted(true);
      return;
    }
    const onDone = () => setStarted(true);
    window.addEventListener("shiftu:intro-done", onDone);
    const fallback = setTimeout(() => setStarted(true), 4500);
    return () => {
      window.removeEventListener("shiftu:intro-done", onDone);
      clearTimeout(fallback);
    };
  }, [reduce]);

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden pb-20 pt-32 text-white lg:pt-40">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#2B5BFF" />
      {/* left legibility scrim over the bright raycast scene */}
      <div className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-r from-ink-dark/80 via-ink-dark/40 to-transparent" />

      <div className="container relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate={started ? "show" : "hidden"}>
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-eyebrow font-semibold uppercase tracking-[0.08em] text-blue-bright backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-bright" />
            Managed AI ops for teams that hold a high bar
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-6 max-w-[14ch] text-[2.6rem] font-bold leading-[1.04] sm:text-6xl lg:text-[4.5rem]"
          >
            Your operation, running like one system
          </motion.h1>
          <motion.div
            variants={item}
            className="mt-5 flex items-center text-xl font-medium text-white/90 sm:text-2xl"
          >
            No more lost
            <FlipWords
              words={["leads", "hours", "follow-ups", "revenue"]}
              className="font-bold text-blue-bright"
            />
          </motion.div>
          <motion.p variants={item} className="mt-4 max-w-prose text-lg text-white/70">
            We find the bottleneck, build the system that removes it, and run it
            with you. Workflows, approvals, and oversight, handled.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact#book" size="lg" variant="clay" arrow>
              Book a call
            </Button>
            <Button href="#how" size="lg" variant="onDark">
              See how it works
            </Button>
          </motion.div>
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="flex text-blue-bright">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="Star" size={14} />
                ))}
              </span>
              Trusted by teams across Canada
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Clock" size={15} className="text-blue-bright" />
              Replies within one business day
            </span>
          </motion.div>
        </motion.div>

        {/* The system in motion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <WorkflowOrbit />
        </motion.div>
      </div>
    </section>
  );
}
