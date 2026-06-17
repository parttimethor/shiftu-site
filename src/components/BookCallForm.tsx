"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

const input =
  "mt-2 w-full rounded-tile border border-hair bg-card px-4 py-3 text-[15px] text-ink shadow-s1 outline-none transition-colors placeholder:text-muted-soft focus:border-blue";

export function BookCallForm({ options = [] }: { options?: string[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          email: f.get("email"),
          phone: f.get("phone"),
          need: f.get("need"),
          preferred: f.get("preferred"),
          notes: f.get("notes"),
        }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-card border border-blue/20 bg-blue/5 p-7 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue text-white">
          <Icon name="Check" size={22} />
        </span>
        <h3 className="mt-4 text-xl font-bold text-ink">Request received</h3>
        <p className="mt-2 text-muted">
          A real person will reply within one business day to confirm a time and
          send a plan and a price. Talk soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Your name</span>
          <input type="text" name="name" required placeholder="Jane Smith" className={input} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Best email</span>
          <input type="email" name="email" required placeholder="you@business.com" className={input} />
        </label>
      </div>

      {options.length > 0 && (
        <label className="block">
          <span className="text-sm font-medium text-ink">What can we help with?</span>
          <select name="need" defaultValue="" className={input}>
            <option value="" disabled>
              Choose one
            </option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Phone (optional)</span>
          <input type="tel" name="phone" placeholder="(555) 555-5555" className={input} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Preferred time (optional)</span>
          <input type="datetime-local" name="preferred" className={input} />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink">What's going on? (optional)</span>
        <textarea name="notes" rows={3} placeholder="A few lines on your goals and timeline." className={input} />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="clay-blue clay-pressable inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-medium text-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Book the call"}
        <Icon name="ArrowRight" size={18} />
      </button>

      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Email us at{" "}
          <a href={`mailto:${site.contact.email}`} className="underline">
            {site.contact.email}
          </a>{" "}
          and we will sort it out.
        </p>
      )}
      <p className="text-sm text-muted-soft">
        15 to 20 minutes. You leave with a plan and a price, even if you never hire us.
      </p>
    </form>
  );
}
