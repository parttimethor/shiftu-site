import type { Metadata } from "next";
import { Section, Container } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { IconChip } from "@/components/ui/IconChip";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern our websites, AI agents, subscriptions, and training. Quotes, payment, ownership, revisions, and how we work together.",
};

const lastUpdated = "June 15, 2026";
const jurisdiction = "Canada"; // confirm your province for the governing-law clause
const contactEmail = site.contact.email;

type Clause = {
  icon: string;
  title: string;
  body: string[];
  bullets?: string[];
};

const clauses: Clause[] = [
  {
    icon: "Layers",
    title: "1. The services we provide",
    body: [
      "We design and build websites, landing pages, AI agents, automations, paid ads management, branding, and operator training programs.",
      "The exact scope, deliverables, and timeline for your project are confirmed in writing before work begins.",
    ],
  },
  {
    icon: "BadgeCheck",
    title: "2. Quotes are estimates",
    body: [
      "Prices shown on the site (for example, landing pages from $350) are starting points.",
      "Your final quote depends on scope, pages, and integrations. We confirm the figure in writing before you pay anything.",
    ],
  },
  {
    icon: "Wrench",
    title: "3. Deposits and payment",
    body: [
      "A deposit secures your project slot and reserves our team's time.",
      "The remaining balance is due on launch, before the project goes live or is handed off.",
    ],
  },
  {
    icon: "Repeat",
    title: "4. Subscriptions",
    body: [
      "Monthly plans (for example, ads management at $300/mo or a managed website subscription) bill on a recurring basis.",
      "You can cancel anytime. No lock-in, no long contract.",
    ],
  },
  {
    icon: "ShieldCheck",
    title: "5. Ownership",
    body: [
      "One-shot builds (a fixed-price site or landing page) are owned by you once paid in full.",
      "Subscription sites stay built and managed by us while your subscription is active. If you cancel, ongoing management and hosting end on that plan.",
    ],
  },
  {
    icon: "PenTool",
    title: "6. Revisions",
    body: [
      "Every build includes 3 rounds of revisions.",
      "Changes beyond the agreed scope, or after the included rounds, are quoted separately before any extra work starts.",
    ],
  },
  {
    icon: "Timer",
    title: "7. Turnaround",
    body: [
      "Every engagement follows the timeline confirmed in your written scope. We give honest estimates and tell you promptly if anything shifts.",
      "Estimates assume timely content, access, and approvals from you. Delays on your side pause the clock, and we let you know when they do.",
    ],
  },
  {
    icon: "CircleCheck",
    title: "8. Cancellations and refunds",
    body: [
      "You can cancel a subscription anytime with no penalty.",
      "For one-shot builds, refunds are not offered once production work has started, since the deposit covers reserved time. We do not promise specific results, leads, or revenue.",
    ],
  },
  {
    icon: "ShieldCheck",
    title: "9. Limitation of liability",
    body: [
      "We deliver the work described in your scope and stand behind it. We are not liable for indirect or consequential losses, such as lost revenue or profits, beyond the amount you paid for the project.",
      "AI agents are tools, not employees. You are responsible for the messages, offers, and bookings they handle on your behalf.",
    ],
  },
  {
    icon: "MapPin",
    title: "10. Governing law",
    body: [
      `These terms are governed by the laws of ${jurisdiction}. Any dispute is handled there.`,
    ],
  },
];

export default function TermsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions",
    description:
      "The terms that govern our websites, AI agents, subscriptions, and programs.",
    publisher: { "@type": "Organization", name: "Shift Ü" },
    inLanguage: "en",
  };

  return (
    <>
      <PageHero
        align="center"
        eyebrow="Legal"
        title="Terms & Conditions"
        subhead="The plain-language terms that cover our work together: scope, payment, ownership, revisions, and how we run a project."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "Read our privacy policy", href: "/privacy" }}
      />

      <Section tone="white">
        <Container size="narrow">
          <Reveal>
            <p className="font-mono text-sm text-muted-soft">
              Last updated: {lastUpdated}
            </p>
            <p className="mt-4 max-w-prose text-muted">
              These terms apply to every project, subscription, and program with
              Shift Ü. By hiring us or paying a deposit, you agree to them.
            </p>
          </Reveal>

          <div className="mt-12 space-y-6">
            {clauses.map((clause, i) => (
              <Reveal key={clause.title} delay={(i % 4) * 0.05}>
                <article className="rounded-card border border-hair bg-card p-7 shadow-s1">
                  <div className="flex items-center gap-4">
                    <IconChip name={clause.icon} />
                    <h2 className="text-xl font-bold text-ink">
                      {clause.title}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-3">
                    {clause.body.map((p) => (
                      <p key={p} className="text-[15px] leading-relaxed text-ink/85">
                        {p}
                      </p>
                    ))}
                  </div>
                  {clause.bullets && (
                    <ul className="mt-4 space-y-2">
                      {clause.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
                            <Icon name="Check" size={12} />
                          </span>
                          <span className="text-[15px] text-ink/85">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <article className="mt-6 rounded-card border border-hair bg-surface p-7 shadow-s1">
              <div className="flex items-center gap-4">
                <IconChip name="Mail" />
                <h2 className="text-xl font-bold text-ink">11. Contact</h2>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/85">
                Questions about these terms? Reach us at{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-medium text-blue underline-offset-2 hover:underline"
                >
                  {contactEmail}
                </a>
                . We reply within {site.contact.bookingNote.replace("We reply within ", "").replace(".", "")}.
              </p>
            </article>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Clear terms, real results"
        subhead="No lock-in, no surprise invoices. Book a call and we will map the site, agent, or program that fits your business."
        secondary={{ label: "See pricing", href: "/pricing" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
