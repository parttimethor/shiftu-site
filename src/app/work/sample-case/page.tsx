import type { Metadata } from "next";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { FeatureBlock } from "@/components/ui/FeatureBlock";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal, Pop } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { IconChip } from "@/components/ui/IconChip";
import { ChatMock, DashboardMock } from "@/components/ui/Mock";

export const metadata: Metadata = {
  title: "Case Study",
  description:
    "How we built the website and the AI behind it, and the results it drove for a business like yours. See the work and the numbers.",
};

const challenge = [
  "[PLACEHOLDER: The old site looked dated and leads went unanswered.]",
  "[PLACEHOLDER: Replies took hours, so prospects went cold.]",
  "[PLACEHOLDER: The owner handled every message by hand.]",
];

const built = [
  { icon: "Layout", title: "New website", body: "[PLACEHOLDER: Built to load fast and convert visitors into leads.]" },
  { icon: "MessageCircle", title: "WhatsApp AI agent", body: "[PLACEHOLDER: Answers 24/7 in the customer's language.]" },
  { icon: "Calendar", title: "Qualify and book", body: "[PLACEHOLDER: Leads qualified and appointments booked automatically.]" },
  { icon: "Workflow", title: "Connected automations", body: "[PLACEHOLDER: Their tools and CRM wired together.]" },
  { icon: "Wrench", title: "Ongoing support", body: "[PLACEHOLDER: Updates and help after launch.]" },
];

const results = [
  { icon: "TrendingUp", metric: "[PLACEHOLDER: +X%]", label: "more leads", note: "in [PLACEHOLDER: timeframe]" },
  { icon: "Clock", metric: "[PLACEHOLDER: X hrs]", label: "saved per week", note: "on manual replies" },
  { icon: "Zap", metric: "[PLACEHOLDER: X%]", label: "faster response", note: "answered in seconds" },
];

export default function SampleCasePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Shift Ü Case Study",
    description:
      "How we built the website and the AI behind it, and the results it drove for a business like yours.",
    author: { "@type": "Organization", name: "Shift Ü" },
    publisher: { "@type": "Organization", name: "Shift Ü" },
    about: { "@type": "Service", name: "Website plus AI agent build" },
  };

  return (
    <>
      <PageHero
        align="split"
        eyebrow="Case study"
        title="[PLACEHOLDER: Result in one line]"
        subhead="[PLACEHOLDER: Client name], [PLACEHOLDER: industry] in [PLACEHOLDER: city]. We built the website and the AI behind it. Here is what changed."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "See our work", href: "/work" }}
        visual={<ChatMock />}
      />

      {/* Challenge */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="The challenge"
            title="What was slowing them down"
            subhead="Before we started, every new lead was a coin toss. Here is what the owner was up against."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {challenge.map((c, i) => (
              <Reveal key={c} delay={i * 0.06}>
                <div className="flex h-full items-start gap-3 rounded-card border border-hair bg-card p-5 shadow-s1">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
                    <Icon name="Zap" size={14} />
                  </span>
                  <p className="text-[15px] text-ink/85">{c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* What we built */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we built"
            title="The site and the AI behind it"
            subhead="One team, one stack, built to convert and run on its own."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {built.map((b, i) => (
              <Pop key={b.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-card border border-hair bg-card p-6 shadow-s1">
                  <IconChip name={b.icon} />
                  <h3 className="mt-4 text-lg font-bold text-ink">{b.title}</h3>
                  <p className="mt-1.5 text-[15px] text-muted">{b.body}</p>
                </div>
              </Pop>
            ))}
          </div>
        </Container>
      </Section>

      {/* Results (dark) */}
      <Section tone="dark">
        <Container>
          <Reveal>
            <Eyebrow className="text-blue-bright">The results</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Numbers after launch
            </h2>
            <p className="mt-4 max-w-prose text-white/70">
              Real outcomes, measured after go-live. [REVIEW: confirm every
              metric with client data before publishing.]
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {results.map((r, i) => (
              <Pop key={r.label} delay={i * 0.08}>
                <div className="h-full rounded-card border border-white/10 bg-white/5 p-6">
                  <Icon name={r.icon} size={20} className="text-blue-bright" />
                  <p className="mt-4 font-display text-4xl font-bold text-white">
                    {r.metric}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/90">{r.label}</p>
                  <p className="mt-1 font-mono text-xs text-white/55">{r.note}</p>
                </div>
              </Pop>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonial */}
      <Section>
        <Container size="narrow">
          <Reveal>
            <div className="rounded-panel border border-hair bg-surface p-8 shadow-s2 sm:p-12">
              <Eyebrow>In their words</Eyebrow>
              <blockquote className="mt-5 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
                &ldquo;[PLACEHOLDER: Short quote about the result and what it felt
                like to work with us, 2-3 lines max.]&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-blue font-display text-sm font-bold text-white">
                  Ü
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink">[PLACEHOLDER: Full name]</p>
                  <p className="text-sm text-muted">
                    [PLACEHOLDER: role], [PLACEHOLDER: company]
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Recap / what they got */}
      <Section tone="surface">
        <Container>
          <FeatureBlock
            eyebrow="The full package"
            title="Website and AI, built together"
            body="No stitching together five tools. We designed, built, and connected everything, then stayed on after launch."
            bullets={[
              "A fast site that turns visitors into booked calls",
              "A WhatsApp agent that answers and qualifies on its own",
              "Automations that keep your CRM and calendar in sync",
            ]}
            cta={{ label: "See all our work", href: "/work" }}
            visual={<DashboardMock />}
          />
        </Container>
      </Section>

      <CtaBand
        title="Want results like these"
        subhead="Tell us what you sell. We will show you the site and the AI to match, then build it for you."
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
