import { cn } from "@/lib/cn";

// Clearly-visible animated background: a dot grid + large drifting blue aurora
// orbs. Pure CSS (GPU transforms), light + dark safe, reduced-motion auto-stops
// (global * rule). "hero" = full presence, "section" = softer for dark scenes.
export function AnimatedBackground({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "section";
}) {
  const dim = variant === "section" ? "opacity-70" : "";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* dot grid */}
      <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(100%_85%_at_50%_0%,black,transparent)]" />

      {/* drifting aurora orbs */}
      <div
        className={cn(
          "aurora-a absolute -left-[12%] -top-[22%] h-[34rem] w-[34rem] rounded-full blur-3xl",
          dim,
        )}
        style={{ background: "radial-gradient(circle at center, rgba(0,62,253,0.30), transparent 62%)" }}
      />
      <div
        className={cn(
          "aurora-b absolute -right-[8%] -top-[14%] h-[30rem] w-[30rem] rounded-full blur-3xl",
          dim,
        )}
        style={{ background: "radial-gradient(circle at center, rgba(43,91,255,0.26), transparent 62%)" }}
      />
      <div
        className={cn(
          "aurora-c absolute -bottom-[28%] left-[28%] h-[34rem] w-[34rem] rounded-full blur-3xl",
          dim,
        )}
        style={{ background: "radial-gradient(circle at center, rgba(0,62,253,0.22), transparent 62%)" }}
      />
    </div>
  );
}
