import { Section, Container } from "./Section";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { site } from "@/lib/site";

export function CtaBand({
  title = "Get the site and the AI",
  subhead = "One short call. We map the site, agent, or automation that fits your business. No pressure, no jargon.",
  primary = site.cta.primary,
  secondary = site.cta.secondary,
}: {
  title?: string;
  subhead?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <Section tone="dark" pad="md">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-lg text-white/70">
            {subhead}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={primary.href} size="lg" arrow>
              {primary.label}
            </Button>
            {secondary && (
              <Button href={secondary.href} size="lg" variant="onDark">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
