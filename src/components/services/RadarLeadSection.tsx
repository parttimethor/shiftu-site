"use client";

import { Radar, IconContainer } from "@/components/ui/radar-effect";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

const nodes = [
  { icon: "Layout", text: "Landing page" },
  { icon: "ClipboardCheck", text: "Lead form" },
  { icon: "Send", text: "Instant follow-up" },
  { icon: "Target", text: "Ads" },
  { icon: "LineChart", text: "Tracking" },
];

// Lead-generation radar: the system sweeping for and catching every lead.
export function RadarLeadSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-dark py-section text-white">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue/50 to-transparent" />

      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-blue-bright">Lead capture</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Every lead, caught the moment it arrives
          </h2>
          <p className="mt-4 text-white/70">
            Your page, form, ads, and follow-up wired into one system that picks
            up every inquiry and routes it to a human while it is still warm.
          </p>
        </Reveal>

        <div className="relative mt-16 flex h-[300px] items-start justify-center overflow-hidden">
          {/* nodes */}
          <div className="z-50 flex flex-wrap items-start justify-center gap-x-10 gap-y-8 sm:gap-x-16">
            {nodes.map((n, i) => (
              <IconContainer
                key={n.text}
                delay={i * 0.12}
                text={n.text}
                icon={<Icon name={n.icon} className="h-6 w-6 text-blue-bright" />}
              />
            ))}
          </div>

          {/* sweeping radar anchored at the bottom center */}
          <div className="absolute -bottom-[260px] left-1/2 -translate-x-1/2">
            <Radar className="scale-90" />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue/40 to-transparent" />
        </div>
      </Container>
    </section>
  );
}
