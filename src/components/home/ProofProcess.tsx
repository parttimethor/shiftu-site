import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "./Counter";
import { DashboardMock, ChatMock, SystemMock } from "@/components/ui/Mock";

const metrics = [
  { to: 14, suffix: "h", label: "manual work removed each week" },
  { to: 90, suffix: "%", label: "faster first reply to inbound" },
  { to: 40, suffix: "%", label: "less manual reporting" },
];

// Proof beat: the system's outputs + the numbers that move. Dark, translucent
// so the shader background shows through. (The workflow itself now lives in the
// hero.)
export function ProofProcess() {
  return (
    <section id="how" className="relative isolate overflow-hidden py-section text-white">
      <div className="absolute inset-0 -z-[1] bg-ink-dark/60" />
      <div className="grain absolute inset-0 -z-[1] opacity-[0.05] mix-blend-overlay" />

      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-blue-bright">Proof it works</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
            The result, not just the promise
          </h2>
          <p className="mt-4 text-white/70">
            Real outputs from the system: instant replies, clean tracking, and
            numbers you can act on.
          </p>
        </Reveal>

        {/* Proof artifacts */}
        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          <Reveal className="flex justify-center">
            <ChatMock className="bg-card" />
          </Reveal>
          <Reveal delay={0.08} className="flex justify-center">
            <SystemMock className="bg-card" />
          </Reveal>
          <Reveal delay={0.16} className="flex justify-center">
            <DashboardMock className="bg-card" />
          </Reveal>
        </div>

        {/* Metric band */}
        <Reveal className="mt-16">
          <div className="grid gap-6 rounded-panel border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:grid-cols-3 sm:p-10">
            {metrics.map((m) => (
              <div key={m.label} className="text-center sm:text-left">
                <p className="font-display text-4xl font-bold text-white lg:text-5xl">
                  <Counter to={m.to} suffix={m.suffix} />
                </p>
                <p className="mt-1 text-sm text-white/65">{m.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-white/45 sm:text-left">
            * Typical results from our engagements. Real figures are confirmed with you per project.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
