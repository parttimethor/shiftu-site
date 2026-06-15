import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal, Pop } from "@/components/ui/Reveal";
import { ClayBadge } from "@/components/ui/Clay";
import { Icon } from "@/components/ui/Icon";

const reasons = [
  {
    icon: "Search",
    title: "We find the bottleneck first",
    body: "Before any build, we map exactly what is slowing you down and put it in writing.",
  },
  {
    icon: "ClipboardCheck",
    title: "Scope and price up front",
    body: "You agree the work and the number before we start. No surprise invoices, no scope creep.",
  },
  {
    icon: "Headphones",
    title: "We run it with you",
    body: "Launch is the start. We stay close, tune it, and keep it working as you grow.",
  },
];

// Certainty beat: answer "what if this doesn't work for us?" before it's asked.
// The clay guarantee seal sticky-pins while the promise + reasons scroll past.
export function Certainty() {
  return (
    <section className="relative bg-base py-section-sm lg:py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Sticky clay seal */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Pop className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <ClayBadge icon="ShieldCheck" className="h-36 w-36 [&_svg]:h-14 [&_svg]:w-14" />
              <p className="mt-6 font-mono text-sm uppercase tracking-[0.12em] text-muted-soft">
                The Shift Ü way
              </p>
              <p className="mt-2 max-w-xs text-lg font-medium text-ink">
                A safe first step, not a leap of faith.
              </p>
            </Pop>
          </div>

          {/* Scrolling promise */}
          <div>
            <Reveal>
              <Eyebrow>Certainty</Eyebrow>
              <h2 className="mt-3 max-w-[18ch] text-3xl font-bold text-ink sm:text-4xl lg:text-[2.75rem]">
                You will know exactly what you are getting before you commit
              </h2>
              <p className="mt-4 max-w-prose text-muted">
                Most teams hesitate because they have been burned by vague scopes
                and tools nobody set up. We remove that risk on purpose.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              {reasons.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.08}>
                  <div className="clay-sm flex items-start gap-4 bg-card p-6">
                    <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-chip bg-blue/10 text-blue">
                      <Icon name={r.icon} size={20} />
                    </span>
                    <div>
                      <p className="font-display font-bold text-ink">{r.title}</p>
                      <p className="mt-1 text-[15px] text-muted">{r.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-8 flex items-center gap-2 text-[15px] font-medium text-ink">
                <Icon name="Check" size={18} className="text-blue" />
                Month to month where it makes sense. You own everything we build.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
