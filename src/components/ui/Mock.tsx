// Pure-markup, on-brand product mockups used as the "screenshot in a section"
// anchor (Attio/Section/Linear pattern) until real screenshots are supplied.
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

export function MockFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-card border border-hair bg-card shadow-s4",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* WhatsApp / chat agent conversation */
export function ChatMock({ className }: { className?: string }) {
  return (
    <MockFrame className={cn("w-full max-w-sm overflow-hidden", className)}>
      <div className="flex items-center gap-3 border-b border-hair px-4 py-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-blue font-display text-sm font-bold text-white">
          Ü
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ink">Shift Ü Assistant</p>
          <p className="flex items-center gap-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Online · replies instantly
          </p>
        </div>
      </div>
      <div className="space-y-3 bg-surface/60 p-4">
        <Bubble side="in">Hi, do you have availability this week?</Bubble>
        <Bubble side="out">
          Yes. I can book you Thursday 2pm or Friday 10am. Which works?
        </Bubble>
        <Bubble side="in">Thursday 2pm</Bubble>
        <Bubble side="out">Done. Thursday 2pm is booked, reminder is set.</Bubble>
        <div className="flex items-center gap-2 rounded-tile border border-hair bg-card px-3 py-2 text-xs font-medium text-ink shadow-s1">
          <span className="icon-chip h-7 w-7 rounded-lg">
            <Icon name="Calendar" size={14} />
          </span>
          Appointment booked · 0 staff time
        </div>
      </div>
    </MockFrame>
  );
}

function Bubble({ side, children }: { side: "in" | "out"; children: React.ReactNode }) {
  return (
    <div className={cn("flex", side === "out" ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[80%] rounded-2xl px-3 py-2 text-[13px] leading-snug",
          side === "out"
            ? "rounded-br-sm bg-blue text-white"
            : "rounded-bl-sm border border-hair bg-card text-ink",
        )}
      >
        {children}
      </p>
    </div>
  );
}

/* Lead / conversion dashboard */
export function DashboardMock({ className }: { className?: string }) {
  const bars = [38, 52, 47, 64, 71, 83, 92];
  return (
    <MockFrame className={cn("w-full max-w-md overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b border-hair px-5 py-3">
        <p className="text-sm font-semibold text-ink">Lead overview</p>
        <span className="font-mono text-[11px] text-muted">This month</span>
      </div>
      <div className="grid grid-cols-3 gap-3 p-5">
        <Stat label="Leads" value="312" trend="+24%" />
        <Stat label="Booked" value="148" trend="+31%" />
        <Stat label="Reply" value="<1m" trend="24/7" />
      </div>
      <div className="flex items-end gap-1.5 px-5 pb-5" aria-hidden>
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-blue/30 to-blue"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    </MockFrame>
  );
}

function Stat({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="rounded-tile border border-hair bg-surface/50 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-soft">
        {label}
      </p>
      <p className="mt-1 font-display text-xl font-bold text-ink">{value}</p>
      <p className="font-mono text-[11px] text-blue">{trend}</p>
    </div>
  );
}

/* Automation / workflow */
export function AutomationMock({ className }: { className?: string }) {
  const nodes = [
    { icon: "Send", label: "New lead" },
    { icon: "Check", label: "Qualify" },
    { icon: "Layers", label: "CRM sync" },
    { icon: "Repeat", label: "Follow-up" },
  ];
  return (
    <MockFrame className={cn("w-full max-w-md overflow-hidden p-5", className)}>
      <p className="mb-4 text-sm font-semibold text-ink">Automation flow</p>
      <div className="space-y-2.5">
        {nodes.map((n, i) => (
          <div key={n.label} className="relative">
            <div className="flex items-center gap-3 rounded-tile border border-hair bg-card px-3 py-2.5 shadow-s1">
              <span className="icon-chip h-8 w-8 rounded-lg">
                <Icon name={n.icon} size={16} />
              </span>
              <span className="text-sm font-medium text-ink">{n.label}</span>
              <span className="ml-auto font-mono text-[10px] text-green-600">live</span>
            </div>
            {i < nodes.length - 1 && (
              <span className="ml-7 block h-2.5 w-px bg-hair" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

/* Internal operating system: workflow + approval + oversight + tracking */
export function SystemMock({ className }: { className?: string }) {
  const steps = [
    { icon: "Send", label: "Request comes in", tag: "auto" },
    { icon: "Workflow", label: "Workflow runs", tag: "auto" },
    { icon: "BadgeCheck", label: "Approval step", tag: "human" },
    { icon: "LineChart", label: "Tracked and logged", tag: "live" },
  ];
  return (
    <MockFrame className={cn("w-full max-w-md overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b border-hair px-5 py-3">
        <p className="text-sm font-semibold text-ink">Operations board</p>
        <span className="font-mono text-[11px] text-blue">14h saved this week</span>
      </div>
      <div className="space-y-2.5 p-5">
        {steps.map((s, i) => (
          <div key={s.label} className="relative">
            <div className="flex items-center gap-3 rounded-tile border border-hair bg-card px-3 py-2.5 shadow-s1">
              <span className="icon-chip h-8 w-8 rounded-lg">
                <Icon name={s.icon} size={16} />
              </span>
              <span className="text-sm font-medium text-ink">{s.label}</span>
              <span
                className={cn(
                  "ml-auto rounded-full px-2 py-0.5 font-mono text-[10px]",
                  s.tag === "human"
                    ? "bg-blue/10 text-blue"
                    : "bg-green-500/10 text-green-600",
                )}
              >
                {s.tag === "human" ? "human review" : s.tag === "live" ? "live" : "auto"}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className="ml-7 block h-2.5 w-px bg-hair" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

/* Voice agent */
export function VoiceMock({ className }: { className?: string }) {
  const bars = [10, 22, 14, 30, 18, 26, 12, 28, 16, 24, 10, 20];
  return (
    <MockFrame className={cn("w-full max-w-sm overflow-hidden p-5", className)}>
      <div className="mb-4 flex items-center gap-3">
        <span className="icon-chip h-10 w-10">
          <Icon name="Phone" size={18} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ink">Incoming call</p>
          <p className="font-mono text-xs text-muted">00:42 · answered by AI</p>
        </div>
      </div>
      <div className="flex h-12 items-center justify-center gap-1" aria-hidden>
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-1 rounded-full bg-blue/70"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-tile border border-hair bg-surface/50 px-3 py-2 text-xs font-medium text-ink">
        <Icon name="CheckCheck" size={14} className="text-blue" />
        Booking confirmed and sent to calendar
      </div>
    </MockFrame>
  );
}
