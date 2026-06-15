import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal, Pop } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { IconChip } from "@/components/ui/IconChip";
import { ChatMock } from "@/components/ui/Mock";
import { BookCallForm } from "@/components/BookCallForm";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a call or get a quote. We build the website and the AI behind it. Fast replies from a real person, no pushy sales.",
};

const channels = [
  {
    icon: "Calendar",
    title: "Book a call",
    body: "15 to 20 minutes on your schedule. You leave with a plan and a price.",
    cta: { label: "Book a call", href: "/contact" },
  },
  {
    icon: "Mail",
    title: "Email us",
    body: "Send the details and we reply with a real answer, not an auto-response.",
    cta: { label: site.contact.email, href: `mailto:${site.contact.email}` },
  },
];

const promises = [
  { icon: "Headphones", title: "A real person replies", body: "No bots on our end. You talk to the team building your project." },
  { icon: "MessageCircle", title: "Plain talk, no jargon", body: "Straight answers and a clear price. No script, no hard sell." },
  { icon: "BadgeCheck", title: "Honest fit check", body: "If we are not the right fit, we tell you that and point you elsewhere." },
  { icon: "ShieldCheck", title: "We stay after launch", body: "Support does not end at handoff. We are here when you need us." },
];

const helpOptions = [
  "Landing page (from $350)",
  "Full website (3 to 10 pages)",
  "WhatsApp or web chat agent",
  "Voice agent (AI calls and bookings)",
  "Google or Meta ads ($300/mo)",
  "Business automations",
  "Not sure yet, help me decide",
];

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Shift Ü",
    description:
      "Book a call or get a quote. We build the website and the AI behind it. Fast replies, no pushy sales.",
    mainEntity: {
      "@type": "Organization",
      name: "Shift Ü",
      email: site.contact.email,
      areaServed: ["Canada"],
    },
  };

  return (
    <>
      <PageHero
        align="center"
        eyebrow="Contact"
        title="Let's build it together"
        subhead="Book a call or get a quote. Tell us what you need: a website, a chat agent, or automations that cut the manual work. No pressure, no pitch."
        primary={{ label: "Book a call", href: "#book" }}
        secondary={{ label: "Email us", href: `mailto:${site.contact.email}` }}
      />

      {/* Book a call */}
      <Section id="book" tone="surface">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Book a call"
            title="Grab a time that works"
            subhead="Pick a preferred time and we'll confirm with a calendar invite. A real person, no pushy sales."
          />
          <Reveal className="mt-10 rounded-panel border border-hair bg-card p-7 shadow-s2 sm:p-9">
            <BookCallForm />
          </Reveal>
        </Container>
      </Section>

      {/* Channels */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Pick your channel"
            title="Reach us the way you like"
            subhead="A short call beats a long email thread, but the choice is yours."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {channels.map((c, i) => (
              <Pop key={c.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-card border border-hair bg-card p-7 shadow-s1">
                  <IconChip name={c.icon} size="lg" />
                  <h3 className="mt-4 text-xl font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 flex-1 text-muted">{c.body}</p>
                  <Link
                    href={c.cta.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-blue hover:text-blue-bright"
                  >
                    {c.cta.label}
                    <Icon name="ArrowUpRight" size={16} />
                  </Link>
                </div>
              </Pop>
            ))}
          </div>
        </Container>
      </Section>

      {/* Form + side panel */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* Form */}
            <Reveal>
              <Eyebrow>Prefer to write</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
                Send the details, get a quote
              </h2>
              <p className="mt-4 max-w-prose text-muted">
                Four quick fields. We read every one and come back with a real answer.
              </p>

              <ContactForm options={helpOptions} />
            </Reveal>

            {/* Side panel */}
            <Reveal delay={0.1} className="lg:pl-4">
              <div className="rounded-card border border-hair bg-surface p-7 shadow-s1">
                <p className="text-sm font-semibold text-ink">What happens next</p>
                <ol className="mt-4 space-y-4">
                  {[
                    "You send the form or book a slot.",
                    "We reply within one business day, no auto-responder.",
                    "You get a clear plan and a price, even if you never hire us.",
                  ].map((s, i) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue/10 font-mono text-xs font-bold text-blue">
                        {i + 1}
                      </span>
                      <span className="text-[15px] text-ink/85">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 flex justify-center lg:justify-start">
                <ChatMock />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Promise (dark) */}
      <Section tone="dark">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow className="text-blue-bright">Our promise</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Fast replies, zero pressure
              </h2>
              <p className="mx-auto mt-4 max-w-prose text-white/70">
                You get straight answers and a clear price. If we are not the right
                fit, we will tell you that too.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 0.05}>
                <div className="h-full rounded-card border border-white/10 bg-white/5 p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-tile bg-white/10 text-blue-bright">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-1.5 text-[15px] text-white/70">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Have a quick question?"
        subhead="Book a call and we answer fast, then point you to the right next step."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={null}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
