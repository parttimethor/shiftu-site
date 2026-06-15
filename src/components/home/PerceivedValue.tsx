import { Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const value = [
  { icon: "LayoutGrid", title: "A site built to convert", body: "Researched, fast, and tracked. Not a brochure that sits there." },
  { icon: "MessagesSquare", title: "AI agents that answer instantly", body: "Chat and voice that qualify and book around the clock, with human oversight." },
  { icon: "Workflow", title: "Automations that remove busywork", body: "Workflows, approvals, and one source of truth your team can trust." },
  { icon: "LineChart", title: "Reporting you can trust", body: "Live dashboards instead of spreadsheets rebuilt by hand every week." },
  { icon: "Headphones", title: "A team that runs it with you", body: "We operate and improve the system, so you stay focused on the business." },
];

// Perceived-value beat: make the offer feel far larger than the number by
// itemizing what one system replaces. Clay tiles sticky-stack as you scroll.
// No price on the home page (per brand rule); price lives on /pricing.
export function PerceivedValue() {
  return (
    <section className="relative bg-base py-section">
      <Container>
        <SectionHeading
          eyebrow="What you're getting"
          title="One system replaces a stack of hires and tools"
          subhead="Instead of a developer, a marketer, an ops manager, and a pile of subscriptions that never talk to each other, you get one system, run by one team."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          {value.map((v, i) => (
            <div
              key={v.title}
              className="sticky"
              style={{ top: `calc(7rem + ${i * 1.1}rem)` }}
            >
              <Reveal delay={(i % 3) * 0.05}>
                <div className="clay mb-5 flex items-start gap-5 bg-card p-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-chip bg-blue/10 text-blue">
                    <Icon name={v.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{v.title}</h3>
                    <p className="mt-1 text-[15px] text-muted">{v.body}</p>
                  </div>
                  <Icon name="Check" size={20} className="ml-auto mt-1 shrink-0 text-blue" />
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="clay-blue flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="font-display text-2xl font-bold text-white">
                One system. One team. One clear price.
              </p>
              <p className="mt-1 text-white/80">
                We show you the value first, then exactly what it costs. No surprises.
              </p>
            </div>
            <Button href="/pricing" size="lg" variant="onDark" arrow>
              See pricing
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
