import type { Metadata } from "next";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal, Pop } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { IconChip } from "@/components/ui/IconChip";
import { DashboardMock } from "@/components/ui/Mock";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team Training",
  description:
    "Prefer to run the systems in-house? We get your team confident with the workflows we build. Available as a support to the work, scoped on request.",
};

const programs = [
  {
    icon: "Users",
    title: "Team AI Training",
    href: "/programs/private-team-training",
    format: "On-site and remote",
    body: "Get your whole team confident running the workflows we build, on your real tools and real cases.",
    bullets: [
      "Hands-on sessions on your actual workflows",
      "Simple SOPs for the people who use them daily",
      "Follow-up support as the habit sticks",
    ],
    featured: true,
  },
  {
    icon: "GraduationCap",
    title: "Operator Onboarding",
    href: "/programs/ai-operator-certification",
    format: "For the system owner",
    body: "Focused onboarding for the one person who owns the system, so they can run and tune it with confidence.",
    bullets: [
      "Deep walk-through of the system we built",
      "A prompt and process library tuned to you",
      "A clear playbook for day-to-day operation",
    ],
  },
  {
    icon: "Building2",
    title: "Adoption & Rollout",
    href: "/programs/workforce-transformation",
    format: "Across the organization",
    body: "Help the wider team adopt new workflows without friction, so the system actually gets used.",
    bullets: [
      "A phased rollout the team can absorb",
      "Owners named for each part of the system",
      "Check-ins to keep adoption on track",
    ],
  },
];

const steps = [
  {
    icon: "Phone",
    title: "Discovery",
    body: "A short call to map your team, your tools, and the workflows worth training on.",
  },
  {
    icon: "GraduationCap",
    title: "Delivery",
    body: "Sessions built on your real systems and real work, not generic slides.",
  },
  {
    icon: "LineChart",
    title: "Rollout",
    body: "We help the habit stick, then step back so the team owns it.",
  },
];

const faq = [
  {
    q: "Is training a fixed package I can buy?",
    a: "No. Training is a support to the systems we build, scoped on request. We shape it around your team and your workflows, and quote it with the work.",
  },
  {
    q: "Do I need training to work with you?",
    a: "Not at all. Most clients have us build and run the system. Training is for teams that want to own and operate it in-house.",
  },
  {
    q: "Can you train us on our own industry workflows?",
    a: "Yes. Every session is built on your real workflows and tools, so what your team learns is exactly what they will use.",
  },
  {
    q: "Do you work across Canada?",
    a: "Yes. We deliver on-site and remote, depending on the team and the workflow.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        align="center"
        eyebrow="Team training"
        title="Prefer to run it in-house? We train your team"
        subhead="The teams pulling ahead are the ones who actually use their systems every day. We get your people confident with the workflows we build. Available as a support to the work, scoped on request."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "See our services", href: "/services" }}
      />

      {/* Programs grid */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Three ways we train"
            title="Pick the depth your team needs"
            subhead="From onboarding one operator to rolling a system out across the whole team. Scoped to fit, never sold as a fixed package."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Pop key={p.title} delay={i * 0.08}>
                <div
                  className={
                    p.featured
                      ? "flex h-full flex-col rounded-card border border-blue/30 bg-card p-7 shadow-s3 ring-1 ring-blue/10"
                      : "flex h-full flex-col rounded-card border border-hair bg-card p-7 shadow-s1"
                  }
                >
                  {p.featured && (
                    <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-chip bg-blue/10 px-3 py-1 font-mono text-[11px] font-medium text-blue">
                      <Icon name="Star" size={12} /> Most chosen
                    </span>
                  )}
                  <IconChip name={p.icon} size="lg" />
                  <h3 className="mt-4 text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-1 font-mono text-[12px] text-muted-soft">{p.format}</p>
                  <p className="mt-3 text-[15px] text-muted">{p.body}</p>

                  <ul className="mt-5 space-y-2.5 border-t border-hair pt-5">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[14px] text-ink/85">
                        <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-blue" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-1">
                    <Button
                      href={p.href}
                      variant={p.featured ? "primary" : "secondary"}
                      size="md"
                      arrow
                      className="w-full"
                    >
                      View training
                    </Button>
                  </div>
                </div>
              </Pop>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-sm text-muted-soft">
              Training is scoped on request, alongside the systems we build.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* How it works */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Discovery, delivery, rollout"
            subhead="The same simple rhythm across every kind of training."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Pop key={s.title} delay={i * 0.08}>
                <div className="h-full rounded-card border border-hair bg-card p-7 shadow-s1">
                  <span className="font-mono text-sm text-muted-soft">0{i + 1}</span>
                  <IconChip name={s.icon} size="lg" className="mt-3" />
                  <h3 className="mt-4 text-xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </div>
              </Pop>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why daily use (dark) */}
      <Section tone="dark">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow className="text-blue-bright">Why it matters</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                A system only works if the team uses it
              </h2>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-white/80">
                The best system in the world does nothing sitting unused. Training
                is how a new workflow becomes the way your team simply works.
              </p>
              <div className="mt-8">
                <Button href="/contact#book" variant="onDark" arrow>
                  Book a call
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="flex justify-center lg:justify-end">
              <DashboardMock className="bg-card" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Quick answers" title="Questions owners ask first" />
          <FAQ items={faq} />
        </Container>
      </Section>

      <CtaBand
        title="Want your team running it in-house?"
        subhead="A short call. We map your team and workflows, then scope training that fits alongside the work."
        secondary={site.cta.secondary}
      />
    </>
  );
}
