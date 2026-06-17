import { Container, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const items = ["Websites", "AI Agents", "Automation", "Lead Gen", "Ecommerce"];

// "What we build" — the core build categories as a clean list.
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
              Each one removes a different bottleneck, and they connect into one
              system.
            </p>
            <div className="mt-8">
              <Button href="/services" arrow>
                See all services
              </Button>
            </div>
          </div>
          <ul className="flex flex-col text-ink lg:items-end">
            {items.map((text) => (
              <li
                key={text}
                className="py-6 text-5xl font-black uppercase tracking-tight sm:text-7xl"
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
