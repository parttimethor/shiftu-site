import { Reveal } from "./Reveal";
import { Eyebrow } from "./Section";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

export function FeatureBlock({
  eyebrow,
  title,
  body,
  bullets,
  visual,
  reverse = false,
  cta,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  bullets?: string[];
  visual: React.ReactNode;
  reverse?: boolean;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn(reverse && "lg:order-2")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h3 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">{title}</h3>
        {body && <p className="mt-4 max-w-prose text-muted">{body}</p>}
        {bullets && bullets.length > 0 && (
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
                  <Icon name="Check" size={13} />
                </span>
                <span className="text-[15px] text-ink/85">{b}</span>
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <div className="mt-8">
            <Button href={cta.href} variant="secondary" arrow>
              {cta.label}
            </Button>
          </div>
        )}
      </Reveal>

      <Reveal
        delay={0.1}
        className={cn(
          "relative flex justify-center lg:justify-end",
          reverse && "lg:order-1 lg:justify-start",
        )}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 mesh-glow opacity-70" />
        {visual}
      </Reveal>
    </div>
  );
}
