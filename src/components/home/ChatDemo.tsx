"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { Container, Eyebrow } from "@/components/ui/Section";

const STAGES = ["Intake", "Schedule", "Follow-up", "Bill", "Route"];

type Reply = { reply: string; chips: string[]; stages: number[] };

function route(text: string): Reply {
  const s = text.toLowerCase();
  if (/^(hi|hey|hello|yo)\b/.test(s))
    return { reply: "Hey! I'm Shift Ü. I can book an appointment, pull a price, check hours, or hand you to a teammate. What do you need?", chips: [], stages: [] };
  if (/hour|open|close|when.*you/.test(s))
    return { reply: "We're open Mon to Sat, 8:00 AM to 6:00 PM. Want me to hold a time for you while you're thinking about it?", chips: ["Info sent", "Offered a booking ✓"], stages: [0, 4] };
  if (/reschedul|move|change.*(appoint|booking)|cancel/.test(s))
    return { reply: "No problem. I can move it and resend the confirmation right away.", chips: ["Booking updated", "Confirmation resent ✓"], stages: [0, 1, 4] };
  if (/complain|refund|angry|upset|wrong|terrible|bad/.test(s))
    return { reply: "I'm sorry about that. I've logged the details and flagged this for a manager to make it right. Someone will reach out shortly.", chips: ["Issue logged", "Escalated to manager ✓"], stages: [0, 4] };
  if (/rav4|\bcar\b|vehicle|test drive|dealer|truck|\bsuv\b|sedan|out.?the.?door|trade.?in/.test(s))
    return { reply: "Yes, it's on the lot, $34,980 out-the-door. I can hold a test drive tomorrow at 2:30 PM and text you a reminder beforehand.", chips: ["Test drive · Tue 2:30", "Reminder set", "Rep notified ✓"], stages: [0, 1, 2, 4] };
  if (/clean|dental|teeth|dentist|hygien|checkup|cavity|filling|whiten/.test(s))
    return { reply: "I can get you in this Friday at 1:15 PM for a cleaning. I'll send a reminder and your intake form the day before.", chips: ["Booked · Fri 1:15", "Reminder set", "Confirmed ✓"], stages: [0, 1, 2, 4] };
  if (/quote|insur|civic|premium|coverage|\brate\b|how much|pricing|\bprice\b|\bcost\b|estimate/.test(s))
    return { reply: "Happy to get you a number. I'll capture a couple of details and follow up with options today, usually within the hour.", chips: ["Details captured", "Follow-up scheduled", "Routed to a specialist ✓"], stages: [0, 2, 4] };
  if (/table|reservation|party|seat|dinner|book a table|\bdine\b/.test(s))
    return { reply: "We'd love to have you. For a party of 6 I can do 6:45 or 8:15. I'll hold 6:45 and text a confirmation.", chips: ["Reservation · 6:45 PM", "Confirmed ✓", "Host notified ✓"], stages: [0, 1, 4] };
  if (/account|\btax|return|filing|bookkeep/.test(s))
    return { reply: "I can book a 30-minute discovery call: Tuesday 11:00 or Wednesday 3:00, and send a checklist of docs to bring.", chips: ["Discovery booked", "Checklist sent", "Routed to senior ✓"], stages: [0, 1, 2, 4] };
  if (/\bbook|appoint|schedul|reserve|set up|slot|come in|\bvisit\b/.test(s))
    return { reply: "Done. I can get you in this week. I'll confirm the slot, send a reminder, and have everything ready when you arrive.", chips: ["Booked", "Reminder set", "Confirmed ✓"], stages: [0, 1, 2, 4] };
  return { reply: "Got it. Here's how I'd handle that: capture the request, book the next step, follow up on your cadence, and loop in a teammate if it needs a human.", chips: ["Captured", "Next step booked", "Handed off ✓"], stages: [0, 1, 2, 4] };
}

const QUICK = [
  "Is the 2023 RAV4 still available?",
  "Book me a cleaning this Friday",
  "Quote on my 2021 Civic?",
  "Table for 6 tomorrow at 7?",
  "I need to reschedule my appointment",
];

type Msg = { role: "cust" | "ai"; text: string; chips?: string[] };

export function ChatDemo() {
  const reduce = useReducedMotion();
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hey, I'm Shift Ü. Message me like a customer would, or tap a question below to watch how I'd handle it." },
  ]);
  const [active, setActive] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [msgs, typing]);

  function send(text: string) {
    const t = text.trim();
    if (!t || typing) return;
    setInput("");
    setMsgs((m) => [...m, { role: "cust", text: t }]);
    const r = route(t);
    setActive(r.stages);
    setTyping(true);
    const delay = reduce ? 0 : 650;
    window.setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: r.reply, chips: r.chips }]);
      setTyping(false);
    }, delay);
  }

  return (
    <section className="relative isolate overflow-hidden py-section text-white">
      <div className="absolute inset-0 -z-[1] bg-ink-dark/55" />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-blue-bright">Talk to it</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
            See how it would answer your customers
          </h2>
          <p className="mt-4 text-white/70">
            Not a script. Message it like a customer would, and watch which steps
            of the loop it touches, live.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-panel border border-white/10 bg-ink-dark/70 shadow-s4 backdrop-blur-md">
          {/* window bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              <span className="ml-2 font-mono text-xs text-white/50">shift-ü · live</span>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> ONLINE
            </span>
          </div>

          {/* stage row */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 px-5 py-3">
            {STAGES.map((s, i) => (
              <span
                key={s}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition-colors",
                  active.includes(i)
                    ? "border-blue-bright/50 bg-blue/20 text-blue-bright"
                    : "border-white/10 text-white/40",
                )}
              >
                {s}
              </span>
            ))}
          </div>

          {/* feed */}
          <div ref={feedRef} className="flex max-h-[340px] flex-col gap-4 overflow-y-auto p-5">
            {msgs.map((m, i) =>
              m.role === "cust" ? (
                <div key={i} className="flex items-start justify-end gap-3">
                  <div className="rounded-2xl rounded-tr-sm border border-white/10 bg-white/5 px-4 py-2.5 text-[15px] text-white/90">
                    {m.text}
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-[10px] font-bold text-white">
                    You
                  </span>
                </div>
              ) : (
                <div key={i} className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue font-display text-sm font-bold text-white">
                    Ü
                  </span>
                  <div className="min-w-0">
                    <div className="inline-block rounded-2xl rounded-tl-sm bg-blue px-4 py-2.5 text-[15px] text-white shadow-s2">
                      {m.text}
                    </div>
                    {m.chips && m.chips.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.chips.map((c) => (
                          <span key={c} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}
            {typing && (
              <div className="flex items-center gap-2 text-white/40">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue font-display text-sm font-bold text-white">
                  Ü
                </span>
                <span className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </span>
              </div>
            )}
          </div>

          {/* quick chips */}
          <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-5 py-3 [scrollbar-width:none] md:flex-wrap md:overflow-x-visible [&::-webkit-scrollbar]:hidden">
            {QUICK.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[13px] text-white/75 transition-colors hover:text-white"
              >
                {q}
              </button>
            ))}
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try: Quote on my 2021 Civic?"
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[15px] text-white placeholder:text-white/35 focus:border-blue-bright/50 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className="clay-blue clay-pressable grid h-11 w-11 shrink-0 place-items-center rounded-full text-white"
            >
              <Icon name="Send" size={18} />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
