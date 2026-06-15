import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  tone = "ink",
  className,
  href = "/",
}: {
  tone?: "ink" | "white";
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Shift Ü home"
      className={cn(
        "font-display text-xl font-bold tracking-tight leading-none",
        className,
      )}
    >
      <span className={tone === "white" ? "text-white" : "text-ink"}>Shift</span>
      <span className="text-blue">&nbsp;Ü</span>
    </Link>
  );
}
