"use client";

import { useState } from "react";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

type Field = { key: string; label: string; min: number; max: number; step: number; prefix?: string; suffix?: string };

const FIELDS: Field[] = [
  { key: "leads", label: "Leads a week", min: 5, max: 200, step: 1 },
  { key: "after", label: "Arrive after hours or get missed", min: 0, max: 80, step: 1, suffix: "%" },
  { key: "value", label: "Average customer value", min: 50, max: 5000, step: 10, prefix: "$" },
  { key: "admin", label: "Admin hours a week", min: 0, max: 60, step: 1, suffix: " hrs" },
];

const fmtMoney = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-US");

// "What it gives you back" ROI estimate. Same math as the reference build:
// recovered = leads * 4.33 * after% * 0.9 ; revenue = recovered * 0.25 * value ;
// hours = admin * 0.6. An estimate from inputs, not a measured result.
export function RoiCalculator() {
  const [v, setV] = useState<Record<string, number>>({ leads: 40, after: 35, value: 450, admin: 18 });

  const recovered = v.leads * 4.33 * (v.after / 100) * 0.9;
  const revenue = recovered * 0.25 * v.value;
  const hours = v.admin * 0.6;

  const outputs = [
    { value: Math.round(recovered).toLocaleString("en-US"), label: "Leads recovered / month" },
    { value: fmtMoney(revenue), label: "Revenue recovered / month", big: true },
    { value: Math.round(hours).toString(), label: "Hours saved / week" },
  ];

  return (
    <section className="relative isolate overflow-hidden py-section text-white">
      <div className="absolute inset-0 -z-[1] bg-ink-dark/65" />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-blue-bright">The math</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
            What it gives you back
          </h2>
          <p className="mt-4 text-white/70">
            Move the sliders to match your business. This is an estimate from your
            inputs, not a measured result. The real number comes from a demo on
            your own workflows.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Sliders */}
          <div className="rounded-panel border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-9">
            <div className="space-y-7">
              {FIELDS.map((f) => (
                <div key={f.key}>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor={f.key} className="text-[15px] text-white/80">
                      {f.label}
                    </label>
                    <span className="font-display text-lg font-bold text-white">
                      {f.prefix}
                      {f.key === "value" ? v[f.key].toLocaleString("en-US") : v[f.key]}
                      {f.suffix}
                    </span>
                  </div>
                  <input
                    id={f.key}
                    type="range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={v[f.key]}
                    onChange={(e) => setV((p) => ({ ...p, [f.key]: Number(e.target.value) }))}
                    className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-blue [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-bright"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col rounded-panel border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-9">
            <div className="space-y-6">
              {outputs.map((o, i) => (
                <div key={o.label} className={i > 0 ? "border-t border-white/10 pt-6" : ""}>
                  <p
                    className={`font-display font-bold tabular-nums text-white ${o.big ? "text-5xl lg:text-6xl" : "text-4xl"}`}
                  >
                    {o.value}
                  </p>
                  <p className="mt-1 text-sm text-white/60">{o.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13px] leading-relaxed text-white/50">
              Assumes Shift Ü answers about 90% of after-hours leads, a 25% close
              rate, and takes roughly 60% of the repetitive admin off your team.
              Your numbers will differ, which is exactly what a demo is for.
            </p>
            <div className="mt-6">
              <Button href="/contact#book" size="lg" variant="clay" arrow className="w-full justify-center sm:w-auto">
                Get your real number
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
