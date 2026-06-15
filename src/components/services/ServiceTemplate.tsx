import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal, Pop } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { IconChip } from "@/components/ui/IconChip";
import {
  ChatMock,
  DashboardMock,
  SystemMock,
  AutomationMock,
  VoiceMock,
} from "@/components/ui/Mock";
import { site } from "@/lib/site";
import { servicesData, type MockKind } from "@/lib/services-data";

function Visual({ kind, className }: { kind: MockKind; className?: string }) {
  switch (kind) {
    case "chat":
      return <ChatMock className={className} />;
    case "system":
      return <SystemMock className={className} />;
    case "automation":
      return <AutomationMock className={className} />;
    case "voice":
      return <VoiceMock className={className} />;
    default:
      return <DashboardMock className={className} />;
  }
}

export function ServiceTemplate({
  slug,
  accent,
}: {
  slug: string;
  accent?: React.ReactNode;
}) {
  const d = servicesData[slug];
  if (!d) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.label,
    serviceType: d.serviceType,
    provider: { "@type": "Organization", name: "Shift Ü" },
    description: d.metaDesc,
    areaServed: ["Canada"],
  };

  return (
    <>
      <PageHero
        align="split"
        eyebrow={d.eyebrow}
        title={d.heroTitle}
        subhead={d.heroSub}
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "See our work", href: "/work" }}
        visual={<Visual kind={d.mock} />}
      />

      {accent}

      {/* Problem */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow={d.problemEyebrow}
            title={d.problemTitle}
            subhead={d.problemSub}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {d.problems.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.06}>
                <div className="flex items-start gap-4 rounded-card border border-hair bg-card p-6 shadow-s1">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-chip bg-blue/10 text-blue">
                    <Icon name={p.icon} size={18} />
                  </span>
                  <div>
                    <p className="font-display font-bold text-ink">{p.title}</p>
                    <p className="mt-1 text-[15px] leading-snug text-muted">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* What we build */}
      <Section>
        <Container>
          <SectionHeading eyebrow="What you get" title={d.buildTitle} subhead={d.buildSub} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {d.builds.map((b, i) => (
              <Pop key={b.title} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-card border border-hair bg-card p-6 shadow-s1">
                  <IconChip name={b.icon} size="lg" />
                  <h3 className="mt-4 text-lg font-bold text-ink">{b.title}</h3>
                  <p className="mt-1.5 text-[15px] text-muted">{b.body}</p>
                </div>
              </Pop>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works + outcome (dark) */}
      <Section tone="dark">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow className="text-blue-bright">How it works</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                {d.outcomeTitle}
              </h2>
              <p className="mt-4 max-w-prose text-white/70">{d.outcomeSub}</p>
              <ol className="mt-8 space-y-4">
                {d.steps.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue/25 font-mono text-sm text-blue-bright">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{s.title}</p>
                      <p className="mt-0.5 text-[15px] text-white/70">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-3">
                {d.outcomes.map((o) => (
                  <div
                    key={o}
                    className="flex items-center gap-3 rounded-card border border-white/10 bg-white/5 p-5 text-white/90"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue/25 text-blue-bright">
                      <Icon name="Check" size={14} />
                    </span>
                    <span className="font-medium">{o}</span>
                  </div>
                ))}
                <div className="mt-2 flex justify-center lg:justify-start">
                  <Visual kind={d.mock} className="bg-card" />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Quick answers" title="Questions owners ask first" />
          <FAQ items={d.faq} />
        </Container>
      </Section>

      <CtaBand
        title="Tell us where it hurts"
        subhead={`A short call. We map whether ${d.label.toLowerCase()} is the right first fix, or point you to the one that is.`}
        secondary={site.cta.secondary}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
