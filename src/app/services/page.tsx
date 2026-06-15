import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal, Pop } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { IconChip } from "@/components/ui/IconChip";
import { site, servicesMenu } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six service categories, one idea: find the bottleneck, build the system that removes it, and help run it. Start with the simplest fix, then grow.",
};

const allServices = servicesMenu.flatMap((g) =>
  g.items.map((it) => ({ ...it, group: g.heading })),
);

const ladder = [
  { icon: "Magnet", title: "Lead Generation", body: "You need leads and have no real funnel yet." },
  { icon: "LayoutGrid", title: "Websites & Conversion", body: "You have traffic or an offer, but the site does not convert." },
  { icon: "ShoppingBag", title: "Ecommerce", body: "Your store does real revenue but loses margin to mess." },
  { icon: "MessagesSquare", title: "AI Agents", body: "A clear, repetitive task is eating your team's time." },
  { icon: "Workflow", title: "Business Systems", body: "You are the bottleneck for every report and approval." },
  { icon: "Boxes", title: "Custom Systems", body: "Off-the-shelf tools no longer fit how you run." },
];

const faq = [
  {
    q: "How do I know which one I need?",
    a: "You usually do not, and that is fine. We start by finding the real bottleneck, then recommend the simplest service that removes it. Most clients start small and add more as it earns its place.",
  },
  {
    q: "Do I have to commit to a big system up front?",
    a: "No. We never lead with complexity. A small, working entry job comes first. The larger system comes later, only when it clearly pays for itself.",
  },
  {
    q: "Do you require a long contract?",
    a: "Monthly services like ads, agents, and support are month to month. Build work is scoped and priced per project, agreed in writing before we start.",
  },
  {
    q: "Who owns the work after delivery?",
    a: "You do. Your site, accounts, and data stay in your name. We work through delegated access, never raw passwords.",
  },
];

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Shift Ü Services",
    description:
      "Six service categories that find and remove the bottleneck in a business.",
    itemListElement: allServices.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.label,
        description: s.desc,
        url: `${site.domain}${s.href}`,
        provider: { "@type": "Organization", name: "Shift Ü" },
        areaServed: ["Canada"],
      },
    })),
  };

  return (
    <>
      <PageHero
        align="center"
        eyebrow="Services"
        title="Find the bottleneck, then remove it"
        subhead="Six service categories, one idea. We start from the problem that is actually costing you, build the system that fixes it, and help run it. No feature you do not need."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "See our work", href: "/work" }}
      />

      {/* The six categories */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The menu"
            title="Six ways we remove a bottleneck"
            subhead="Pick the one that closes the leak you have today. Stack the rest as the business earns it."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allServices.map((s, i) => (
              <Pop key={s.href} delay={(i % 3) * 0.05}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col gap-4 rounded-card border border-hair bg-card p-6 shadow-s1 transition-shadow duration-300 hover:shadow-s3"
                >
                  <div className="flex items-center justify-between">
                    <IconChip name={s.icon} size="lg" />
                    <span className="font-mono text-[11px] uppercase tracking-wide text-muted-soft">
                      {s.group}
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold text-ink">
                      {s.label}
                    </p>
                    <p className="mt-1.5 text-[15px] leading-snug text-muted">
                      {s.desc}
                    </p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-blue">
                    Explore {s.label}
                    <Icon
                      name="ArrowRight"
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Pop>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why start small */}
      <Section tone="surface">
        <Container size="narrow">
          <Reveal className="text-center">
            <Eyebrow>How to start</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Start with the simple need
            </h2>
            <p className="mt-5 text-xl leading-relaxed text-ink/80">
              We never lead with complexity. A small, working fix earns the right
              to build the bigger system later.
            </p>
            <p className="mt-6 text-muted">
              Most businesses start with leads or a site, prove a return, then
              connect agents, automation, and a full system as revenue earns it.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* The ladder (dark) */}
      <Section tone="dark">
        <Container>
          <Reveal>
            <Eyebrow className="text-blue-bright">The ladder</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Match the lane to the problem
            </h2>
            <p className="mt-4 max-w-prose text-white/70">
              The simplest lane that fits the real problem wins. Here is how we
              route it.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ladder.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-card border border-white/10 bg-white/5 p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-chip bg-blue/25 text-blue-bright">
                    <Icon name={t.icon} size={20} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">{t.title}</h3>
                  <p className="mt-1.5 text-[15px] text-white/70">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Quick answers" title="Questions clients ask first" />
          <FAQ items={faq} />
        </Container>
      </Section>

      <CtaBand
        title="Tell us where you lose time"
        subhead="A short call. We find the bottleneck and tell you the one service that fixes it first."
        secondary={site.cta.secondary}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
