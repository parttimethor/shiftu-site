import { Container, Eyebrow } from "@/components/ui/Section";
import { RevealImages, type RevealItem } from "@/components/ui/reveal-images";
import { Button } from "@/components/ui/Button";

const W = { src: "/img/workspace.jpg", alt: "" };
const P = { src: "/img/problem-phone.jpg", alt: "" };
const B = { src: "/img/problem-busy.jpg", alt: "" };

const items: RevealItem[] = [
  { text: "Websites", images: [W, B] },
  { text: "AI Agents", images: [P, W] },
  { text: "Automation", images: [B, P] },
  { text: "Lead Gen", images: [W, P] },
  { text: "Ecommerce", images: [B, W] },
];

// "What we build" — big words that reveal the work on hover (reveal-images).
export function RevealBuild() {
  return (
    <section className="relative bg-base py-section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Pick where it hurts. We build the rest.
            </h2>
            <p className="mt-4 max-w-prose text-muted">
              Hover to see the work. Each one removes a different bottleneck, and
              they connect into one system.
            </p>
            <div className="mt-8">
              <Button href="/services" arrow>
                See all services
              </Button>
            </div>
          </div>
          <RevealImages items={items} className="text-ink lg:items-end" />
        </div>
      </Container>
    </section>
  );
}
