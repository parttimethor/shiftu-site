import { Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

// Final CTA beat: convert the committed, catch the scrollers. Restates the
// certainty promise so the loop closes on safety. The Field eases back to calm.
export function FinalCTAImmersive() {
  return (
    <section className="relative bg-base py-section">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          {/* avatar stack */}
          <div className="mb-6 flex justify-center -space-x-3">
            {[
              "from-blue to-blue-bright",
              "from-blue-bright to-blue",
              "from-ink to-blue",
              "from-blue to-ink",
            ].map((g, i) => (
              <span
                key={i}
                className={`h-10 w-10 rounded-full border-2 border-base bg-gradient-to-br ${g} shadow-s1`}
              />
            ))}
          </div>

          <h2 className="text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            Want your operation running like one system?
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-lg text-muted">
            We find the bottleneck, build the system that removes it, and run it
            with you. One short call to see what to fix first.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/contact#book" size="lg" variant="clay" arrow>
              Yes, book a call
            </Button>
            <Button href="/work" size="lg" variant="secondary">
              See our work
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-soft">
            Scope and price in writing first. You own everything we build.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
