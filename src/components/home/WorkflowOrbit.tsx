"use client";

import { Magnet, Filter, BadgeCheck, Workflow, LineChart, FileText } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

// Workflow as one connected system. Orbital on desktop; a clean stacked list on
// mobile (the orbital's 200px radius overflows small screens). Data + lucide
// icon components live inside this client boundary (never passed server->client).
const workflow = [
  { id: 1, title: "Capture", date: "Step 1", category: "intake", icon: Magnet, status: "completed" as const, energy: 92, relatedIds: [2, 6], content: "Every lead and request is caught the moment it arrives, day or night." },
  { id: 2, title: "Qualify", date: "Step 2", category: "sort", icon: Filter, status: "completed" as const, energy: 84, relatedIds: [1, 3], content: "Sorted and prioritized by the rules you set, so the right things rise first." },
  { id: 3, title: "Approve", date: "Step 3", category: "oversight", icon: BadgeCheck, status: "in-progress" as const, energy: 72, relatedIds: [2, 4], content: "A human signs off on anything that moves money or touches a customer." },
  { id: 4, title: "Automate", date: "Step 4", category: "run", icon: Workflow, status: "in-progress" as const, energy: 88, relatedIds: [3, 5], content: "The repetitive work runs on its own, inside the rules and the approvals." },
  { id: 5, title: "Track", date: "Step 5", category: "log", icon: LineChart, status: "pending" as const, energy: 76, relatedIds: [4, 6], content: "Every step is logged with a full audit trail. Nothing falls through." },
  { id: 6, title: "Report", date: "Step 6", category: "report", icon: FileText, status: "pending" as const, energy: 68, relatedIds: [5, 1], content: "Live numbers replace spreadsheets rebuilt by hand. You see the truth." },
];

export function WorkflowOrbit() {
  return (
    <>
      {/* Desktop: orbital */}
      <div className="hidden md:block">
        <RadialOrbitalTimeline timelineData={workflow} />
      </div>

      {/* Mobile: stacked list */}
      <ol className="space-y-3 md:hidden">
        {workflow.map((w, i) => {
          const Icon = w.icon;
          return (
            <li key={w.id} className="flex items-start gap-4 rounded-card border border-white/10 bg-white/5 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-chip bg-blue/25 text-blue-bright">
                <Icon size={18} />
              </span>
              <div>
                <p className="font-display font-bold text-white">
                  <span className="mr-2 font-mono text-xs text-blue-bright">0{i + 1}</span>
                  {w.title}
                </p>
                <p className="mt-0.5 text-sm text-white/70">{w.content}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
