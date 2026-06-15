// "One lead, start to finish" loop data (ported from the reference build).
// Five stages, three industries. Each step renders an artifact in the feed AND
// an audit entry (policy + gate + deterministic timestamp).

export const STAGES = ["Intake", "Schedule", "Follow-up", "Bill", "Route"] as const;

export type LoopStep = {
  st: number; // stage index
  k: "in" | "out" | "event" | "inv" | "hand";
  text?: string;
  title?: string;
  meta?: string;
  line?: string;
  amt?: string;
  a: { act: string; pol: string; gate: string };
};

export type Scenario = {
  label: string;
  channel: string;
  time: string;
  who: string;
  steps: LoopStep[];
};

export const SCENARIOS: Record<string, Scenario> = {
  dealership: {
    label: "Car dealership",
    channel: "Web form",
    time: "11:42 PM",
    who: "Marcus T.",
    steps: [
      { st: 0, k: "in", text: "Is the 2023 RAV4 still available? What's the out-the-door price?", a: { act: "Captured web lead, structured and deduped", pol: "First response under 60s", gate: "None" } },
      { st: 0, k: "out", text: "Hi Marcus, the 2023 RAV4 XLE is on the lot. Out-the-door is $34,980 including fees. Want to come see it?", a: { act: "Answered with live inventory and price", pol: "Never quote below floor", gate: "Price within policy" } },
      { st: 1, k: "event", title: "Test drive booked", meta: "Tomorrow 2:30 PM, reminder set", a: { act: "Booked test drive", pol: "No double-booking", gate: "Slot confirmed open" } },
      { st: 2, k: "out", text: "You're set for 2:30 PM tomorrow. I'll text a reminder an hour before. Reply STOP to opt out anytime.", a: { act: "Scheduled reminder", pol: "Consent on file, opt-out included", gate: "None" } },
      { st: 3, k: "inv", title: "Deposit hold drafted", line: "Refundable test-drive hold", amt: "Held", a: { act: "Drafted deposit, not charged", pol: "No charge without human approval", gate: "Awaiting rep approval" } },
      { st: 4, k: "hand", title: "Handed to sales rep", meta: "Full transcript and lead profile attached", a: { act: "Routed to a human with context", pol: "Enrich and attach transcript", gate: "None" } },
    ],
  },
  dental: {
    label: "Dental office",
    channel: "Missed call, text-back",
    time: "6:18 PM",
    who: "Priya R.",
    steps: [
      { st: 0, k: "in", text: "Hi, do you have any cleaning appointments this week?", a: { act: "Missed call answered by text", pol: "Text back under 60s", gate: "None" } },
      { st: 0, k: "out", text: "We do. I can offer Thursday 9:00 AM or Friday 1:15 PM for a cleaning. Are you a returning patient?", a: { act: "Offered open slots", pol: "Only show bookable times", gate: "Calendar checked" } },
      { st: 1, k: "event", title: "Cleaning booked", meta: "Friday 1:15 PM, insurance on file", a: { act: "Booked cleaning", pol: "No double-booking", gate: "Slot confirmed open" } },
      { st: 2, k: "out", text: "Booked for Friday 1:15 PM. I'll send a reminder and your intake form the day before.", a: { act: "Scheduled reminder and intake form", pol: "Consent on file", gate: "None" } },
      { st: 3, k: "inv", title: "Estimate prepared", line: "Cleaning and exam, pending insurance", amt: "$0 now", a: { act: "Prepared estimate", pol: "Never bill before service", gate: "None" } },
      { st: 4, k: "hand", title: "Front desk notified", meta: "Chart and insurance details attached", a: { act: "Routed to front desk", pol: "Attach chart context", gate: "None" } },
    ],
  },
  restaurant: {
    label: "Restaurant",
    channel: "Instagram DM",
    time: "7:55 PM",
    who: "Jordan M.",
    steps: [
      { st: 0, k: "in", text: "Do you have a table for 6 tomorrow around 7?", a: { act: "Captured DM, parsed party size and time", pol: "Answer every channel", gate: "None" } },
      { st: 0, k: "out", text: "We'd love to have you. For a party of 6 I can do 6:45 or 8:15. Which works better?", a: { act: "Offered seatings", pol: "Only offer real availability", gate: "Floor plan checked" } },
      { st: 1, k: "event", title: "Reservation held", meta: "Tomorrow 6:45 PM, party of 6", a: { act: "Held reservation", pol: "No double-booking", gate: "Table confirmed open" } },
      { st: 2, k: "out", text: "Booked for 6 at 6:45 PM tomorrow. I'll text a confirmation. Reply STOP to opt out.", a: { act: "Scheduled confirmation", pol: "Consent on file, opt-out included", gate: "None" } },
      { st: 3, k: "inv", title: "No deposit required", line: "Party-size policy: deposits at 8 or more", amt: "$0.00", a: { act: "Applied deposit policy", pol: "Deposits only for parties of 8+", gate: "Rule evaluated" } },
      { st: 4, k: "hand", title: "Added to floor plan", meta: "Host notified with party size and notes", a: { act: "Routed to host", pol: "Attach booking notes", gate: "None" } },
    ],
  },
};

// Deterministic timestamp: 11:42:03 baseline, +2s per step.
export function loopTime(stepIndex: number): string {
  const T0 = 11 * 3600 + 42 * 60 + 3;
  const s = T0 + (stepIndex + 1) * 2;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600) % 24)}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`;
}
