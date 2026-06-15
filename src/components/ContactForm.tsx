"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

const input =
  "mt-2 w-full rounded-tile border border-hair bg-card px-4 py-3 text-[15px] text-ink shadow-s1 outline-none transition-colors placeholder:text-muted-soft focus:border-blue";

export function ContactForm({ options }: { options: string[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          business: f.get("business"),
          email: f.get("email"),
          need: f.get("need"),
          message: f.get("message"),
          _honey: f.get("_honey"),
        }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="mt-8 rounded-card border border-blue/20 bg-blue/5 p-7 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue text-white">
          <Icon name="Check" size={22} />
        </span>
        <h3 className="mt-4 text-xl font-bold text-ink">Got it, thank you</h3>
        <p className="mt-2 text-muted">
          Your details are in. {site.contact.bookingNote} A real person, not a bot.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      {/* Honeypot: bots fill it, humans never see it. */}
      <input
        type="text"
        name="_honey"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Your name</span>
          <input type="text" name="name" required placeholder="Jane Smith" className={input} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Your business</span>
          <input type="text" name="business" placeholder="Company name" className={input} />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink">Best email</span>
        <input type="email" name="email" required placeholder="you@business.com" className={input} />
      </label>

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

      <label className="block">
        <span className="text-sm font-medium text-ink">Tell us what is going on</span>
        <textarea
          name="message"
          rows={4}
          placeholder="A few lines on your goals and timeline."
          className={input}
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue px-6 text-base font-medium text-white shadow-s2 transition-colors hover:bg-blue-bright disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send the details"}
        <Icon
          name="ArrowRight"
          size={18}
          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
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
      <p className="text-sm text-muted-soft">{site.contact.bookingNote}</p>
    </form>
  );
}
