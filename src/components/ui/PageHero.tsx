import { Section, Container, Eyebrow } from "./Section";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

export function PageHero({
  eyebrow,
  title,
  subhead,
  primary,
  secondary,
  visual,
  align,
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  visual?: React.ReactNode;
  align?: "center" | "split";
}) {
  const isSplit = align === "split" && visual;

  return (
    <section className="relative overflow-hidden bg-base pt-32 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 mesh-glow" />
      <Container
        className={cn(
          "relative pb-section-xs lg:pb-section-sm",
          isSplit
            ? "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
            : "",
        )}
      >
        <Reveal className={cn(!isSplit && "mx-auto max-w-3xl text-center")}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1
            className={cn(
              "mt-4 text-[2.5rem] font-bold sm:text-5xl lg:text-6xl",
              !isSplit && "mx-auto max-w-[18ch]",
            )}
          >
            {title}
          </h1>
          {subhead && (
            <p
              className={cn(
                "mt-5 text-lg text-muted",
                !isSplit ? "mx-auto max-w-prose" : "max-w-prose",
              )}
            >
              {subhead}
            </p>
          )}
          {(primary || secondary) && (
            <div
              className={cn(
                "mt-8 flex flex-wrap gap-3",
                !isSplit && "justify-center",
              )}
            >
              {primary && (
                <Button href={primary.href} size="lg" arrow>
                  {primary.label}
                </Button>
              )}
              {secondary && (
                <Button href={secondary.href} size="lg" variant="secondary">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
        </Reveal>

        {isSplit && (
          <Reveal delay={0.15} className="relative flex justify-center lg:justify-end">
            {visual}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
