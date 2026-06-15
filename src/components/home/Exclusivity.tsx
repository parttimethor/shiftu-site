import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SystemStage } from "./SystemStage";

// Luxury / exclusivity beat: the page's wow moment. Cinematic dark stage, The
// Core returns large in deep negative space, framed as curated access.
export function Exclusivity() {
  return (
    <section
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden py-section text-white"
      style={{
        background:
          "radial-gradient(100% 110% at 50% 28%, #14163f 0%, #0a0a26 58%, #06061a 100%)",
      }}
    >
      <div className="grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow className="text-blue-bright">By invitation</Eyebrow>
            <h2 className="mt-4 max-w-[16ch] text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[3.5rem]">
              Built for teams that hold a high bar
            </h2>
            <p className="mt-6 max-w-prose text-lg text-white/75">
              We take on a small number of partners at a time. Running a system
              with you means real attention, not a queue. If you care about how
              your operation actually works, we will get along.
            </p>
            <p className="mt-4 flex items-center gap-2 text-[15px] text-white/65">
              <Icon name="BadgeCheck" size={18} className="text-blue-bright" />
              Every system is built to a standard we would put our own name on.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact#book" size="lg" variant="clay" arrow>
                Book a call
              </Button>
              <Button href="/work" size="lg" variant="onDark">
                See our work
              </Button>
            </div>
          </Reveal>

          <div className="relative flex justify-center lg:justify-end">
            {/* focal glow */}
            <div
              className="pointer-events-none absolute inset-0 -z-[1] mx-auto h-[80%] w-[80%] self-center rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle at center, rgba(0,62,253,0.40), transparent 65%)" }}
            />
            <SystemStage labels={["Built", "Run", "Governed"]} className="max-w-lg" />
          </div>
        </div>
      </Container>
    </section>
  );
}
