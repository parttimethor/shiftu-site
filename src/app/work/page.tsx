import type { Metadata } from "next";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal, Pop } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { DashboardMock } from "@/components/ui/Mock";
import { CaseStudies } from "@/components/work/CaseStudies";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Real builds, real systems. Websites, custom portals, AI agents, and automations we shipped for real businesses, from a coffee roaster to a B2B ad agency.",
};

const filters = [
  { icon: "Magnet", label: "Lead generation" },
  { icon: "LayoutGrid", label: "Websites" },
  { icon: "MessagesSquare", label: "AI agents" },
  { icon: "Workflow", label: "Automation" },
];

export default function WorkPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Our Work",
    description:
      "Real builds and results. Lead systems, websites, AI agents, and automations shipped for businesses in Canada.",
    publisher: { "@type": "Organization", name: "Shift Ü" },
    about: ["Lead generation", "Websites", "AI agents", "Business automation"],
  };

  return (
    <>
      <PageHero
        align="center"
        eyebrow="Our work"
        title="Real builds. Real results."
        subhead="Lead systems, sites, agents, and automations we shipped and still support. Every project below went live, removed a bottleneck, and stayed live."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "See our services", href: "/services" }}
      />

      {/* Browse by service */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Browse by service"
            title="Find work like yours"
            subhead="One team across every service line. Filter by the bottleneck you came to fix."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {filters.map((f, i) => (
              <Pop key={f.label} delay={i * 0.06}>
                <span className="inline-flex items-center gap-2 rounded-chip border border-hair bg-card px-4 py-2.5 text-[15px] font-medium text-ink shadow-s1">
                  <Icon name={f.icon} size={16} className="text-blue" />
                  {f.label}
                </span>
              </Pop>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-soft">
            Labels are for browsing. Below: a few real builds and exactly what went into each.
          </p>
        </Container>
      </Section>

      {/* Case studies */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Case studies"
            title="Real businesses, real systems"
            subhead="A few of the builds we've shipped, and exactly what went into each."
          />
          <div className="mt-14">
            <CaseStudies />
          </div>
        </Container>
      </Section>

      {/* Proof band (dark) */}
      <Section tone="dark">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow className="text-blue-bright">Why it works</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Built to ship, then run with you
              </h2>
              <p className="mt-4 max-w-prose text-white/70">
                We do not hand over a file and disappear. Every build below is live, monitored, and improved as the business grows.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Canada-wide delivery, one dedicated team",
                  "Live, monitored, and improved after launch",
                ].map((t) => (
                  <div
                    key={t}
                    className="rounded-card border border-white/10 bg-white/5 p-5 text-sm text-white/80"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="flex justify-center lg:justify-end">
              <DashboardMock className="bg-card" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Want results like these?"
        subhead="Tell us where your business leaks time and leads. We map the one system that fixes it first."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "See our services", href: "/services" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
