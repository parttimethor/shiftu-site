"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { Container, Eyebrow } from "@/components/ui/Section";
import { SCENARIOS, STAGES, loopTime, type LoopStep, type Scenario } from "@/lib/leadLoopData";

const KEYS = Object.keys(SCENARIOS);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function Artifact({ sc, step }: { sc: Scenario; step: LoopStep }) {
  if (step.k === "in") {
    return (
      <div className="flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold text-white">
          {sc.who[0]}
        </span>
        <div className="min-w-0">
          <p className="text-xs text-white/45">{sc.who}</p>
          <div className="mt-1 inline-block rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-2.5 text-[15px] text-white/90">
            {step.text}
          </div>
        </div>
      </div>
    );
  }
  if (step.k === "out") {
    return (
      <div className="flex items-start justify-end gap-3">
        <div className="min-w-0 text-right">
          <p className="text-xs text-white/45">Shift Ü</p>
          <div className="mt-1 inline-block rounded-2xl rounded-tr-sm bg-blue px-4 py-2.5 text-left text-[15px] text-white shadow-s2">
            {step.text}
          </div>
        </div>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue font-display text-sm font-bold text-white">
          Ü
        </span>
      </div>
    );
  }
  // event / inv / hand cards
  const icon = step.k === "inv" ? "Banknote" : step.k === "hand" ? "Users" : "Calendar";
  const accent = step.k === "hand" ? "text-green-400" : "text-blue-bright";
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-card border bg-white/5 p-4",
        step.k === "hand" ? "border-green-500/30" : "border-white/10",
      )}
    >
      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-chip bg-white/10", accent)}>
        <Icon name={icon} size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center justify-between gap-2 font-semibold text-white">
          {step.title}
          {step.amt && <span className="font-mono text-xs text-white/60">{step.amt}</span>}
        </p>
        <p className="text-[13px] text-white/55">{step.meta ?? step.line}</p>
      </div>
    </div>
  );
}

export function LeadLoop() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.25 });
  const feedRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef(0);

  const [tab, setTab] = useState(KEYS[0]);
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);
  const started = useRef(false);

  const sc = SCENARIOS[tab];
  const steps = sc.steps;

  const play = useCallback(
    async (key: string) => {
      const my = ++tokenRef.current;
      setTab(key);
      setShown(0);
      setRunning(true);
      const total = SCENARIOS[key].steps.length;
      if (reduce) {
        setShown(total);
        setRunning(false);
        return;
      }
      for (let i = 0; i < total; i++) {
        await sleep(i === 0 ? 350 : 680);
        if (my !== tokenRef.current) return;
        setShown(i + 1);
      }
      setRunning(false);
    },
    [reduce],
  );

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      play(tab);
    }
  }, [inView, play, tab]);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [shown]);

  const visible = steps.slice(0, shown);
  const lastStage = visible.reduce((m, s) => Math.max(m, s.st), -1);
  const finished = shown >= steps.length;

  return (
    <section className="relative isolate overflow-hidden py-section text-white" ref={wrapRef}>
      <div className="absolute inset-0 -z-[1] bg-ink-dark/65" />
      <div className="grain absolute inset-0 -z-[1] opacity-[0.05] mix-blend-overlay" />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-blue-bright">How it works</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
            One lead, start to finish
          </h2>
          <p className="mt-4 text-white/70">
            The whole loop, running on a real workflow. Pick an industry and watch
            it go. Every step it takes leaves a record you can read, on the right.
          </p>
        </div>

        {/* Industry tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {KEYS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => play(k)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                tab === k
                  ? "clay-blue text-white"
                  : "border border-white/15 bg-white/5 text-white/70 hover:text-white",
              )}
            >
              {SCENARIOS[k].label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[170px_1fr_320px]">
          {/* Stage rail */}
          <ol className="hidden flex-col gap-1 lg:flex">
            {STAGES.map((s, i) => {
              const done = i < lastStage || finished;
              const active = i === lastStage && !finished;
              return (
                <li key={s} className="flex items-center gap-3 py-2">
                  <span
                    className={cn(
                      "grid h-4 w-4 place-items-center rounded-full border transition-colors",
                      done
                        ? "border-blue-bright bg-blue-bright"
                        : active
                          ? "border-blue-bright bg-blue-bright/30"
                          : "border-white/25 bg-transparent",
                    )}
                  >
                    {done && <Icon name="Check" size={10} className="text-ink-dark" />}
                  </span>
                  <span className={cn("text-sm", done || active ? "text-white" : "text-white/40")}>{s}</span>
                </li>
              );
            })}
          </ol>

          {/* Transcript feed */}
          <div className="rounded-panel border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
            <p className="mb-4 flex items-center gap-2 text-xs text-white/50">
              <span className="h-2 w-2 rounded-full bg-blue-bright" />
              <b className="font-semibold text-white/80">New lead</b> · {sc.channel} · {sc.time}
            </p>
            <div ref={feedRef} className="flex flex-col gap-4 overflow-y-auto pr-1 md:max-h-[420px]">
              {visible.map((step, i) => (
                <div key={i} className="animate-[fadeUp_0.4s_ease]">
                  <Artifact sc={sc} step={step} />
                </div>
              ))}
              {running && (
                <p className="text-xs text-white/40">Shift Ü is working…</p>
              )}
            </div>
          </div>

          {/* Audit trail */}
          <div className="rounded-panel border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white/50">
              <span className="h-2 w-2 rounded-full bg-green-400" /> Audit trail
            </p>
            <ol className="flex flex-col gap-3 overflow-y-auto pr-1 md:max-h-[420px]">
              {visible.map((step, i) => (
                <li key={i} className="animate-[fadeUp_0.4s_ease] rounded-tile border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-white/40">{loopTime(i)}</span>
                    <span className="rounded bg-blue/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-blue-bright">
                      {STAGES[step.st]}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] font-medium text-white">{step.a.act}</p>
                  <p className="mt-0.5 text-[11px] text-white/45">
                    Policy: {step.a.pol} · Gate: {step.a.gate}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => play(tab)}
            disabled={running}
            className="clay-blue clay-pressable inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium text-white disabled:opacity-60"
          >
            Replay the loop
            <Icon name="Repeat" size={16} />
          </button>
          <p className="text-sm text-white/50">Deterministic: same lead, same result, every time.</p>
        </div>
      </Container>
    </section>
  );
}
