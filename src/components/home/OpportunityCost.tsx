"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

const RED = "#d8694f"; // the one permitted desaturated warm-red (inaction only)

const milestones = [
  { t: "Month 6", body: "Leads still slip in the first five minutes. Manual hours never come back." },
  { t: "Year 1", body: "Competitors who systemized reply faster and close more of the same demand." },
  { t: "Year 2+", body: "The gap compounds into real revenue and time you cannot recover." },
];

// Opportunity-cost beat: loss aversion. Standing still gets more expensive as a
// gap widens. Scroll-scrubbed SVG path draw (no GSAP).
export function OpportunityCost() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathLength = reduce ? 1 : draw;

  return (
    <section ref={ref} className="relative isolate overflow-hidden py-section text-white">
      <div className="absolute inset-0 -z-[1] bg-ink-dark/70" />
      <div className="grain absolute inset-0 -z-[1] opacity-[0.05] mix-blend-overlay" />

      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-blue-bright">The cost of waiting</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
            Standing still is the expensive option
          </h2>
          <p className="mt-4 max-w-prose text-white/70">
            Every month without a system is leads lost in the first reply and
            hours spent on work a system should handle. The gap only widens.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Divergence chart */}
          <Reveal>
            <div className="rounded-panel border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <svg viewBox="0 0 400 240" className="h-auto w-full" role="img" aria-label="Widening gap between acting now and waiting">
                {/* faint baseline grid */}
                {[60, 120, 180].map((y) => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                ))}
                {/* gap fill */}
                <motion.path
                  d="M0,185 C120,180 240,172 400,168 L400,55 C240,120 120,165 0,185 Z"
                  fill="url(#gap)"
                  style={{ opacity: reduce ? 0.5 : draw }}
                />
                <defs>
                  <linearGradient id="gap" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(0,62,253,0.05)" />
                    <stop offset="100%" stopColor="rgba(0,62,253,0.28)" />
                  </linearGradient>
                </defs>
                {/* inaction (red, flat/declining) */}
                <motion.path
                  d="M0,185 C120,180 240,172 400,168"
                  fill="none"
                  stroke={RED}
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ pathLength }}
                />
                {/* with us (blue, rising) */}
                <motion.path
                  d="M0,185 C120,165 240,120 400,55"
                  fill="none"
                  stroke="#2B5BFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{ pathLength }}
                />
                {/* endpoint dots */}
                <circle cx="400" cy="55" r="5" fill="#2B5BFF" />
                <circle cx="400" cy="168" r="4" fill={RED} />
              </svg>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-2 text-white/85">
                  <span className="h-2 w-4 rounded-full bg-blue-bright" /> With a system
                </span>
                <span className="inline-flex items-center gap-2 text-white/70">
                  <span className="h-2 w-4 rounded-full" style={{ background: RED }} /> Waiting
                </span>
              </div>
            </div>
          </Reveal>

          {/* Milestone tiles */}
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <Reveal key={m.t} delay={i * 0.08}>
                <div className="clay-sm bg-white/[0.06] p-5">
                  <p className="font-mono text-sm uppercase tracking-[0.1em]" style={{ color: RED }}>
                    {m.t}
                  </p>
                  <p className="mt-1.5 text-[15px] text-white/80">{m.body}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <p className="flex items-center gap-2 pt-1 text-[15px] font-medium text-white">
                <Icon name="ArrowRight" size={18} className="text-blue-bright" />
                The fix is one short call away.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
