import type { Metadata } from "next";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Pop } from "@/components/ui/Reveal";
import { IconChip } from "@/components/ui/IconChip";
import { DashboardMock } from "@/components/ui/Mock";

export const metadata: Metadata = {
  title: "Operator Onboarding",
  description:
    "Focused onboarding for the person who owns the system, so they can run and tune it with confidence. Scoped on request.",
};

const included = [
  { icon: "Search", title: "Full walk-through", body: "A deep tour of the exact system we built for you." },
  { icon: "PenTool", title: "Prompt and process library", body: "A working library tuned to your business and tools." },
  { icon: "ClipboardCheck", title: "Operating playbook", body: "A clear, day-to-day guide for running the system." },
  { icon: "Headphones", title: "Support window", body: "Time with us while the operator finds their footing." },
];

export default function Page() {
  return (
    <>
      <PageHero
        align="split"
        eyebrow="Team training"
        title="Operator Onboarding"
        subhead="Focused onboarding for the one person who owns the system, so they can run and tune it with confidence. Available as a support to the work, scoped on request."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "All training", href: "/programs" }}
        visual={<DashboardMock />}
      />
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="What's included" title="Everything the system owner needs" />
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
        title="Want to own and run the system?"
        subhead="A short call. We scope onboarding that gets your operator confident, fast."
      />
    </>
  );
}
