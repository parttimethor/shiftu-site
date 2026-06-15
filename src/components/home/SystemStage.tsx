import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { cn } from "@/lib/cn";

// The "system" visual: an animated CPU/circuit (data flowing through one core)
// in a dark chamber, with the capabilities it handles labelled around it.
// Replaces the static clay object. Pure SVG + CSS, RSC-safe, very light.
export function SystemStage({
  className,
  labels = ["Leads", "Approvals", "Tracking", "Reports"],
  text = "ÜOS",
}: {
  className?: string;
  labels?: string[];
  text?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-md overflow-hidden rounded-[28px] border border-white/10",
        className,
      )}
      style={{
        background: "radial-gradient(120% 120% at 50% 30%, #16183f 0%, #0c0d2e 60%, #08081f 100%)",
        boxShadow: "0 40px 80px -34px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 42%, rgba(0,62,253,0.18), transparent 62%)" }}
      />

      <div className="relative p-6 sm:p-7">
        <div className="flex flex-wrap justify-center gap-2">
          {labels.map((l) => (
            <span
              key={l}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/70 backdrop-blur-sm"
            >
              {l}
            </span>
          ))}
        </div>
        <div className="mt-4 aspect-[2/1] w-full">
          <CpuArchitecture text={text} className="h-full w-full text-white/30" />
        </div>
      </div>
    </div>
  );
}
