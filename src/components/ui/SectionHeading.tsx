import { Reveal } from "./Reveal";
import { Eyebrow } from "./Section";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  subhead,
  align = "center",
  tone = "ink",
  className,
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  align?: "center" | "left";
  tone?: "ink" | "white";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-3 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]",
          tone === "white" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subhead && (
        <p
          className={cn(
            "mt-4 text-lg",
            tone === "white" ? "text-white/70" : "text-muted",
            align === "center" && "mx-auto max-w-prose",
          )}
        >
          {subhead}
        </p>
      )}
    </Reveal>
  );
}
