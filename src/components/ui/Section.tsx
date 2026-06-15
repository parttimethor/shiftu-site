import { cn } from "@/lib/cn";

type Tone = "white" | "surface" | "dark";
type Pad = "lg" | "md" | "sm";

const tones: Record<Tone, string> = {
  white: "bg-base text-ink",
  surface: "bg-surface text-ink",
  dark: "relative bg-ink-dark text-white overflow-hidden",
};

const pads: Record<Pad, string> = {
  lg: "py-section-xs md:py-section-sm lg:py-section",
  md: "py-section-xs md:py-section-sm",
  sm: "py-section-xs",
};

export function Section({
  children,
  tone = "white",
  pad = "lg",
  className,
  id,
}: {
  children: React.ReactNode;
  tone?: Tone;
  pad?: Pad;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative isolate", tones[tone], pads[pad], className)}>
      {tone === "dark" && (
        <div className="pointer-events-none absolute inset-0 mesh-glow opacity-80" />
      )}
      <div className="relative">{children}</div>
    </section>
  );
}

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow";
}) {
  return (
    <div
      className={cn(
        "container",
        size === "narrow" && "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
