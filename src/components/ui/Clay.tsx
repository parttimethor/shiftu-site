import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

// Claymorphism surface primitives. Pure CSS (the .clay/.clay-sm/.clay-blue
// classes live in globals.css), RSC-safe, 0 JS. Matte premium navy/blue.

export function ClayCard({
  children,
  className,
  size = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "lg" | "sm";
}) {
  return (
    <div className={cn(size === "sm" ? "clay-sm" : "clay", className)}>
      {children}
    </div>
  );
}

// Big inflated focal badge (used as the certainty "guarantee seal").
export function ClayBadge({
  icon,
  className,
  accent = true,
}: {
  icon: string;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid place-items-center rounded-full",
        accent ? "clay-blue" : "clay",
        className,
      )}
    >
      <Icon name={icon} className={accent ? "text-white" : "text-blue"} />
    </div>
  );
}

// Tactile numeral / label chip (process steps, spec chips).
export function ClayChip({
  children,
  className,
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-grid place-items-center font-display font-bold",
        accent ? "clay-blue text-white" : "clay-sm text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
