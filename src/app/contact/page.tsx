import type { Metadata } from "next";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ChatMock } from "@/components/ui/Mock";
import { BookCallForm } from "@/components/BookCallForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a call or get a quote. We build the website and the AI behind it. Fast replies from a real person, no pushy sales.",
};

const helpOptions = [
  "Website or landing page",
  "Lead generation + ads",
  "AI chat or voice agent",
  "Business automation",
  "Ecommerce / Shopify",
  "Custom system",
  "Not sure yet, help me decide",
];

const promises = [
  { icon: "Headphones", title: "A real person replies", body: "No bots on our end. You talk to the team building your project." },
  { icon: "MessageCircle", title: "Plain talk, no jargon", body: "Straight answers and a clear price. No script, no hard sell." },
  { icon: "BadgeCheck", title: "Honest fit check", body: "If we are not the right fit, we tell you that and point you elsewhere." },
  { icon: "ShieldCheck", title: "We stay after launch", body: "Support does not end at handoff. We are here when you need us." },
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
        subhead="Tell us what you need: a website, a chat agent, or automations that cut the manual work. Book a call below, or email us. No pressure, no pitch."
        primary={{ label: "Book a call", href: "#book" }}
        secondary={{ label: "Email us", href: `mailto:${site.contact.email}` }}
      />

      {/* Book a call: the one form + what happens next */}
      <Section id="book" tone="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* Form */}
            <Reveal>
              <Eyebrow>Book a call</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
                Grab a time that works
              </h2>
              <p className="mt-4 max-w-prose text-muted">
                Pick a time and we'll confirm with a calendar invite, or just
                leave the details and we'll reply. A real person, within one
                business day, no pushy sales.
              </p>
              <div className="mt-8 rounded-panel border border-hair bg-card p-7 shadow-s2 sm:p-9">
                <BookCallForm options={helpOptions} />
              </div>
            </Reveal>

            {/* Side panel */}
            <Reveal delay={0.1} className="lg:pl-4">
              <div className="rounded-card border border-hair bg-surface p-7 shadow-s1">
                <p className="text-sm font-semibold text-ink">What happens next</p>
                <ol className="mt-4 space-y-4">
                  {[
                    "You book a time or send a quick note.",
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
                <p className="mt-5 border-t border-hair pt-4 text-[15px] text-muted">
                  Prefer to write?{" "}
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="font-medium text-blue hover:text-blue-bright"
                  >
                    {site.contact.email}
                  </a>
                </p>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
