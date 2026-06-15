"use client";

import { useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    n: "01",
    tag: "Find",
    title: "Find the bottleneck",
    body: "We map where your business leaks time and leads, end to end, and name the one fix that frees you up first.",
    bg: "radial-gradient(120% 120% at 18% 18%, #1b1d56 0%, #0b0c2a 70%)",
  },
  {
    n: "02",
    tag: "Build",
    title: "Build the system",
    body: "Structured workflows with approvals, tracking, and human oversight, wired into the tools you already use.",
    bg: "radial-gradient(120% 120% at 82% 20%, #13224f 0%, #0a0b26 70%)",
  },
  {
    n: "03",
    tag: "Run",
    title: "Run it for you",
    body: "We operate it, watch the numbers, and tune it as you grow. You get the outcome, not another tool to manage.",
    bg: "radial-gradient(120% 120% at 50% 82%, #101a4a 0%, #08091f 70%)",
  },
];

// "The experience": full-screen story panels that rotate and pin as you scroll
// (GSAP ScrollTrigger). Lenis is synced so the smooth-scroll and the pins agree.
export function StoryExperience() {
  useLenis(() => ScrollTrigger.update());

  return (
    <FlowArt aria-label="How Shift Ü works">
      {panels.map((p, i) => (
        <FlowSection key={p.n} className="text-white" style={{ background: p.bg }}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-blue-bright">{p.n}</span>
            <span className="eyebrow text-blue-bright">{p.tag}</span>
          </div>

          <h2 className="max-w-[15ch] text-[clamp(2.6rem,8vw,6rem)] font-bold leading-[0.98]">
            {p.title}
          </h2>

          <div className="flex flex-col gap-6">
            <p className="max-w-xl text-lg text-white/75">{p.body}</p>
            {i === panels.length - 1 && (
              <Button href="/contact#book" size="lg" variant="clay" arrow magnetic={false}>
                Book a call
              </Button>
            )}
          </div>
        </FlowSection>
      ))}
    </FlowArt>
  );
}
