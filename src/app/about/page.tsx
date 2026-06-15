import type { Metadata } from "next";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { FeatureBlock } from "@/components/ui/FeatureBlock";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal, Pop } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { IconChip } from "@/components/ui/IconChip";
import { DashboardMock } from "@/components/ui/Mock";

export const metadata: Metadata = {
  title: "About",
  description:
    "We build the website and the AI behind it. Sites, agents, and automations that bring more leads and less manual work for small teams.",
};

const principles = [
  { icon: "Target", title: "Outcome first", body: "We build for leads, not looks." },
  { icon: "MessageCircle", title: "Plain talk", body: "No jargon, no runaround." },
  { icon: "Rocket", title: "Fast delivery", body: "Live in days, not months." },
  { icon: "Headphones", title: "We stay", body: "Launch is the start, not the finish." },
];

const values = [
  { icon: "BadgeCheck", title: "Honest", body: "We tell you what works and what does not." },
  { icon: "Wrench", title: "Practical", body: "Tech that earns its place, nothing extra." },
  { icon: "ShieldCheck", title: "Present", body: "Real support after the site goes live." },
];

const team = [
  { name: "Christian", role: "CEO", line: "Strategy, scope, and system architecture." },
  { name: "Josh", role: "COO", line: "Operations, delivery, and the rhythm that ships." },
  { name: "Marcus", role: "CFO", line: "Pricing, terms, and the numbers." },
  { name: "Adam", role: "CSO", line: "Sales, outreach, and the pitch." },
  { name: "Juan", role: "CAIO", line: "AI systems, automation, and governance." },
];

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Shift Ü",
    description:
      "A managed, done-for-you AI ops and digital systems company. We find the bottleneck, build the system that removes it, and help run it.",
    mainEntity: {
      "@type": "Organization",
      name: "Shift Ü",
      slogan: "Find the bottleneck. Build the system. Run it for you.",
      areaServed: ["Canada"],
    },
  };

  return (
    <>
      <PageHero
        align="split"
        eyebrow="About Shift Ü"
        title="We find the bottleneck and build the fix"
        subhead="Shift Ü is a managed, done-for-you AI ops and digital systems company. We find what is slowing your business down, build the system that removes it, and help run it. Done for you, not handed over."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "See our work", href: "/work" }}
        visual={<DashboardMock />}
      />

      {/* Story */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Why we exist"
            title="Small teams deserve real tech"
            subhead="Enterprise tools without the enterprise headcount."
          />
          <Reveal>
            <p className="mx-auto mt-8 max-w-prose text-center text-lg text-ink/85">
              Most owners get stuck with a pretty site that just sits there, or
              an AI tool nobody set up right. We started Shift Ü to close that
              gap. You get the website and the system working together, no tech
              team required.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* How we work */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Four rules we never break"
            subhead="Simple principles that keep your project on track."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Pop key={p.title} delay={i * 0.08}>
                <div className="h-full rounded-card border border-hair bg-card p-7 shadow-s1">
                  <span className="font-mono text-sm text-muted-soft">0{i + 1}</span>
                  <IconChip name={p.icon} size="lg" className="mt-3" />
                  <h3 className="mt-4 text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.body}</p>
                </div>
              </Pop>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values (dark) */}
      <Section tone="dark">
        <Container>
          <div className="text-center">
            <Reveal>
              <Eyebrow className="text-blue-bright">What we stand for</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                What you can count on
              </h2>
              <p className="mx-auto mt-4 max-w-prose text-white/70">
                Three things that shape every build.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-card border border-white/10 bg-white/5 p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-chip bg-white/10 text-blue-bright">
                    <Icon name={v.icon} size={20} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">{v.title}</h3>
                  <p className="mt-1.5 text-[15px] text-white/70">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Reach */}
      <Section>
        <Container>
          <FeatureBlock
            eyebrow="Where we work"
            title="Built for Canadian businesses"
            body="We serve businesses in Canada. Wherever you are, the work is the same: sites and AI that bring in leads and cut the manual busywork. We work in English."
            bullets={[
              "Local builds for growing Canadian teams",
              "Same standard, same delivery speed nationwide",
              "English-first, async-friendly communication",
            ]}
            cta={{ label: "See all services", href: "/services" }}
            visual={<DashboardMock />}
          />
        </Container>
      </Section>

      {/* Team */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="Five operators. One company."
            subhead="Builders who answer their own messages. No account managers between you and the work."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {team.map((m, i) => (
              <Pop key={m.name} delay={(i % 5) * 0.05}>
                <div className="flex h-full flex-col items-center rounded-card border border-hair bg-card p-6 text-center shadow-s1">
                  <span className="clay-blue grid h-16 w-16 place-items-center rounded-full font-display text-xl font-bold text-white">
                    {m.name[0]}
                  </span>
                  <p className="mt-4 font-display text-lg font-bold text-ink">{m.name}</p>
                  <p className="font-mono text-xs uppercase tracking-wide text-blue">{m.role}</p>
                  <p className="mt-2 text-[14px] leading-snug text-muted">{m.line}</p>
                </div>
              </Pop>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Let's build your engine"
        subhead="Tell us what you sell. We will show you what to build and what it costs, no pressure. A site and AI that work while you sleep."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "See our work", href: "/work" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
