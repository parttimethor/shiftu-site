import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

export function IconChip({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <span className={cn("icon-chip", size === "lg" && "icon-chip-lg", className)}>
      <Icon name={name} size={size === "lg" ? 26 : 20} />
    </span>
  );
}
