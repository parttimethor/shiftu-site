import { Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

const standards = [
  { icon: "Gauge", title: "Performance", line: "Pages load in under two seconds. LCP under 2.5s, on every page." },
  { icon: "ShieldCheck", title: "Security", line: "No raw passwords, ever. Delegated access and a clear access checklist." },
  { icon: "BadgeCheck", title: "Human oversight", line: "A person approves anything that moves money or touches a customer." },
  { icon: "Clock", title: "Responsiveness", line: "We reply within one business day, and tell you when something shifts." },
  { icon: "Check", title: "Ownership", line: "You own every account, asset, and system we build. No lock-in." },
  { icon: "ClipboardCheck", title: "Honesty", line: "No promises we cannot keep. Scope and price agreed in writing first." },
];

// Standards beat: codify non-negotiables as measurable commitments. Light,
// engineering-grade blueprint grid. Restraint is the trust signal.
export function Standards() {
  return (
    <section className="relative isolate overflow-hidden bg-base py-section">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(120%_90%_at_50%_0%,black,transparent)]" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Standards"
          title="The bar we build to"
          subhead="We think in systems, so we hold ourselves to measurable ones. These are commitments you can hold us to."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-panel border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-3">
          {standards.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.05}>
              <div className="flex h-full flex-col gap-3 bg-card p-7">
                <span className="clay-sm grid h-11 w-11 place-items-center bg-card text-blue">
                  <Icon name={s.icon} size={20} />
                </span>
                <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="font-mono text-[13.5px] leading-relaxed text-muted">
                  {s.line}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
