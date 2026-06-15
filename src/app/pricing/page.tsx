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

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Starting ranges for each service, as guidance. Real scope sets the final price, agreed in writing before any build. Ad spend always stays on your own account.",
};

type Card = {
  icon: string;
  name: string;
  price: string;
  note: string;
  bullets: string[];
  href: string;
  badge?: string;
};

const services: Card[] = [
  {
    icon: "Magnet",
    name: "Lead Generation Systems",
    price: "from $350",
    note: "Build one-time, plus ads managed monthly. Ad spend separate.",
    href: "/services/lead-generation",
    bullets: [
      "Landing page, lead form, and tracking",
      "Instant follow-up routing",
      "Ads setup on your own account",
      "Shared lead tracker",
    ],
  },
  {
    icon: "LayoutGrid",
    name: "Websites & Landing Pages",
    price: "from $800",
    note: "One-time by scope, or a low monthly plan.",
    href: "/services/websites",
    bullets: [
      "One page or a full multi-page site",
      "Researched, conversion-first copy",
      "Tracking and lead routing wired in",
      "SEO and schema on every page",
    ],
  },
  {
    icon: "ShoppingBag",
    name: "Ecommerce & Shopify",
    price: "from $3,000",
    note: "Setup, plus optional monthly support.",
    href: "/services/ecommerce",
    bullets: [
      "Store audit and product page rebuild",
      "SEO and product data cleanup",
      "Theme QA across devices",
      "Ecommerce dashboard",
    ],
  },
  {
    icon: "MessagesSquare",
    name: "AI Chat & Voice Agents",
    price: "from $500",
    note: "Per workflow or agent, plus support for tuning.",
    href: "/services/ai-agents",
    bullets: [
      "Trained on your business",
      "Qualifies leads and books appointments",
      "Human approval on sensitive steps",
      "Logs and ongoing tuning",
    ],
  },
  {
    icon: "Workflow",
    name: "Business Automation & Reporting",
    price: "from $2,000",
    note: "Scoped to the workflow, plus support.",
    href: "/services/automation",
    bullets: [
      "CRM cleanup and dashboards",
      "Follow-up and approval workflows",
      "Audit logs and reporting automation",
      "One internal hub to work from",
    ],
  },
  {
    icon: "Boxes",
    name: "Custom Managed Systems",
    price: "from $15,000",
    note: "Discovery-led and phased.",
    href: "/services/custom-systems",
    badge: "Discovery first",
    bullets: [
      "Custom app and integration layer",
      "Governed automation and role-based views",
      "Phased build, value early",
      "Run and governed with you",
    ],
  },
];

const principles = [
  {
    icon: "Search",
    title: "We price the problem",
    body: "The number follows the bottleneck we are removing, not a feature list.",
  },
  {
    icon: "ListChecks",
    title: "Scope sets the price",
    body: "These ranges are a starting point. Real scope decides the final number.",
  },
  {
    icon: "Wallet",
    title: "Ad spend stays separate",
    body: "Ad budget lives on your own account and is always quoted on its own line.",
  },
  {
    icon: "ClipboardCheck",
    title: "It is in writing",
    body: "Scope and price are agreed in writing before any build starts.",
  },
];

const faq = [
  {
    q: "Why ranges instead of fixed prices?",
    a: "Because real scope drives real price. The ranges here are honest starting guidance. After a short call we put an exact number and scope in writing, so there are no surprises later.",
  },
  {
    q: "How does ad spend work?",
    a: "Ad spend stays on your own account and goes to Google or Meta directly. Our fee is for managing the work. The two are always quoted on separate lines.",
  },
  {
    q: "Can I cancel a monthly plan?",
    a: "Yes. Monthly services like ads, agents, and support are month to month, with no lock-in. You own the accounts and the work.",
  },
  {
    q: "Do you offer team training?",
    a: "Yes, as a support to the systems we build, available on request. It is not a fixed packaged product. Tell us the goal and we scope it with the work.",
  },
];

function PriceCard({ card }: { card: Card }) {
  const featured = Boolean(card.badge);
  return (
    <div
      className={
        featured
          ? "relative flex h-full flex-col rounded-card border-2 border-blue bg-card p-7 shadow-s3"
          : "relative flex h-full flex-col rounded-card border border-hair bg-card p-7 shadow-s1"
      }
    >
      {card.badge && (
        <span className="absolute -top-3 left-7 rounded-full bg-blue px-3 py-1 text-xs font-semibold text-white shadow-s2">
          {card.badge}
        </span>
      )}
      <IconChip name={card.icon} />
      <h3 className="mt-4 text-xl font-bold text-ink">{card.name}</h3>
      <p className="mt-3 font-mono text-2xl font-bold text-ink">{card.price}</p>
      <p className="mt-1 text-sm text-muted-soft">{card.note}</p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {card.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[15px] text-ink/85">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
              <Icon name="Check" size={12} />
            </span>
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button href={card.href} variant={featured ? "primary" : "secondary"} className="w-full" arrow>
          See details
        </Button>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Shift Ü Pricing",
    provider: { "@type": "Organization", name: "Shift Ü" },
    areaServed: ["Canada"],
    itemListElement: services.map((c) => ({
      "@type": "Offer",
      name: c.name,
      url: `https://shiftu.ca${c.href}`,
      description: c.bullets[0],
    })),
  };

  return (
    <>
      <PageHero
        align="split"
        eyebrow="Pricing"
        title="Honest starting ranges, not surprise invoices"
        subhead="Here is roughly where each service starts. Real scope sets the final price, agreed in writing before any build. We would rather show you the value first, then the number."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "See our work", href: "/work" }}
        visual={<DashboardMock />}
      />

      {/* How we price */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="How we price"
            title="The number follows the problem"
            subhead="We start from the bottleneck worth removing, then scope and price it honestly. No mid-project markups."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((x, i) => (
              <Pop key={x.title} delay={i * 0.06}>
                <div className="h-full rounded-card border border-hair bg-card p-6 shadow-s1">
                  <IconChip name={x.icon} />
                  <h3 className="mt-4 text-lg font-bold text-ink">{x.title}</h3>
                  <p className="mt-1.5 text-[15px] text-muted">{x.body}</p>
                </div>
              </Pop>
            ))}
          </div>
        </Container>
      </Section>

      {/* Service ranges */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Starting ranges"
            title="Where each service starts"
            subhead="Guidance, not a checkout. Begin with the simplest fix, then add the next as it earns its place."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 0.06}>
                <PriceCard card={c} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-sm text-muted-soft">
              Ranges are starting guidance only. Final scope and price are agreed
              in writing. Ad spend is separate and stays on your own account.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Training note (dark) */}
      <Section tone="dark">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow className="text-blue-bright">Team training</Eyebrow>
              <h2 className="mt-3 max-w-[22ch] text-3xl font-bold text-white sm:text-4xl">
                Want your team to run it in-house?
              </h2>
              <p className="mt-4 max-w-prose text-white/70">
                Training is available as a support to the systems we build, scoped
                on request rather than sold as a fixed package. We get your people
                confident running the workflows, then step back.
              </p>
              <div className="mt-8">
                <Button href="/programs" variant="onDark" arrow>
                  See team training
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
          <SectionHeading eyebrow="Pricing FAQ" title="The money questions, answered" />
          <FAQ items={faq} />
        </Container>
      </Section>

      <CtaBand
        title="Tell us the goal, get a real number"
        subhead="One short call. We find the bottleneck, recommend the simplest fix, and put an honest scope and price in writing."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
