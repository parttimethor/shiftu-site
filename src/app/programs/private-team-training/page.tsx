import type { Metadata } from "next";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Pop } from "@/components/ui/Reveal";
import { IconChip } from "@/components/ui/IconChip";
import { SystemMock } from "@/components/ui/Mock";

export const metadata: Metadata = {
  title: "Team AI Training",
  description:
    "Get your whole team confident running the workflows we build, on your real tools and real cases. Scoped on request, alongside the work.",
};

const included = [
  { icon: "Users", title: "Hands-on sessions", body: "Live training on your actual workflows, not generic slides." },
  { icon: "ClipboardCheck", title: "Simple SOPs", body: "Clear, short playbooks for the people who use the system daily." },
  { icon: "Repeat", title: "Follow-up support", body: "Check-ins while the new habit takes hold across the team." },
  { icon: "LineChart", title: "A manager view", body: "A simple read on what changed and where time was won back." },
];

export default function Page() {
  return (
    <>
      <PageHero
        align="split"
        eyebrow="Team training"
        title="Team AI Training"
        subhead="Get your whole team confident running the workflows we build, on your real tools and real cases. Available as a support to the work, scoped on request."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "All training", href: "/programs" }}
        visual={<SystemMock />}
      />
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="What's included" title="Built around how your team actually works" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {included.map((x, i) => (
              <Pop key={x.title} delay={(i % 2) * 0.06}>
                <div className="h-full rounded-card border border-hair bg-card p-6 shadow-s1">
                  <IconChip name={x.icon} size="lg" />
                  <h3 className="mt-4 text-lg font-bold text-ink">{x.title}</h3>
                  <p className="mt-1.5 text-[15px] text-muted">{x.body}</p>
                </div>
              </Pop>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand
        title="Want your team running it in-house?"
        subhead="A short call. We map your team and workflows, then scope training that fits alongside the work."
      />
    </>
  );
}
