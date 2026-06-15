// Server-only lead pipeline. Every contact request and call booking flows
// through recordLead(), which fans the lead out to two independent channels:
//
//   1. TRACKER — a Google Sheet in the team's Google Workspace, written via an
//      Apps Script Web App webhook (LEADS_WEBHOOK_URL). This is the system of
//      record. No Google API client, no service account: the Apps Script runs
//      as the owner and appends a row (see scripts/leads-tracker.gs).
//   2. EMAIL — an optional notification to the team inbox via Resend
//      (RESEND_API_KEY + CONTACT_TO). The Apps Script can also email on its own,
//      so this channel is purely a convenience / backup.
//
// Both channels are best-effort and independently configured. If neither is set
// the lead is still accepted so the visitor never sees a failure; the route
// logs it server-side (visible in Vercel logs). No secret is ever exposed to the
// client — nothing here is NEXT_PUBLIC_ and this module is only imported by
// server route handlers.

export type LeadKind = "contact" | "booking";

export type Lead = {
  kind: LeadKind;
  name: string;
  email: string;
  business?: string;
  phone?: string;
  need?: string; // contact: "what can we help with?"
  preferred?: string; // booking: preferred time
  message?: string; // free-text notes
  source?: string; // e.g. "shiftu.ca/contact"
};

type ChannelResult = { configured: boolean; delivered: boolean; reason?: string };

export type RecordResult = {
  ok: boolean; // false only when a configured channel hard-failed
  configured: boolean; // at least one channel is set up
  sheet: ChannelResult;
  email: ChannelResult;
};

// Order + labels for the tracker row and the email body. Keep in sync with the
// header row in scripts/leads-tracker.gs.
const FIELDS: [keyof Lead, string][] = [
  ["kind", "Kind"],
  ["name", "Name"],
  ["email", "Email"],
  ["business", "Business"],
  ["phone", "Phone"],
  ["need", "Need"],
  ["preferred", "Preferred time"],
  ["message", "Message"],
  ["source", "Source"],
];

function esc(s: string): string {
  return s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c,
  );
}

// --- Channel 1: Google Sheet tracker (Apps Script Web App webhook) ---
async function appendToTracker(lead: Lead): Promise<ChannelResult> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return { configured: false, delivered: false, reason: "LEADS_WEBHOOK_URL not set" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      redirect: "follow", // Apps Script Web Apps 302 to a googleusercontent URL
      body: JSON.stringify({
        ...lead,
        token: process.env.LEADS_WEBHOOK_TOKEN ?? "",
        ts: new Date().toISOString(),
      }),
    });
    if (!res.ok) return { configured: true, delivered: false, reason: `tracker ${res.status}` };
    // Apps Script returns JSON {ok:true}; treat a 200 as success even if parsing fails.
    return { configured: true, delivered: true };
  } catch (e) {
    return {
      configured: true,
      delivered: false,
      reason: e instanceof Error ? e.message : "tracker request failed",
    };
  }
}

// --- Channel 2: email notification (Resend REST API, no SDK dependency) ---
async function emailTeam(lead: Lead): Promise<ChannelResult> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    return { configured: false, delivered: false, reason: "RESEND_API_KEY / CONTACT_TO not set" };
  }
  const from = process.env.CONTACT_FROM || "Shift Ü <onboarding@resend.dev>";

  const pairs = FIELDS.map(
    ([k, label]) => [label, (lead[k] ?? "").toString().trim()] as const,
  ).filter(([, v]) => v);

  const subject =
    lead.kind === "booking"
      ? `New call booking — ${lead.name}`
      : `New contact request — ${lead.name}`;

  const rows = pairs
    .map(
      ([label, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#64748b;font:600 13px -apple-system,system-ui,sans-serif;white-space:nowrap;vertical-align:top">${esc(label)}</td><td style="padding:6px 0;color:#0f172a;font:14px -apple-system,system-ui,sans-serif">${esc(v)}</td></tr>`,
    )
    .join("");

  const html = `<div style="max-width:560px;margin:0 auto;font-family:-apple-system,system-ui,sans-serif">
  <p style="font:600 16px sans-serif;color:#0f172a;margin:0 0 2px">${esc(subject)}</p>
  <p style="font:13px sans-serif;color:#64748b;margin:0 0 16px">via ${esc(lead.source || "shiftu.ca")}</p>
  <table style="border-collapse:collapse">${rows}</table>
  <p style="font:12px sans-serif;color:#94a3b8;margin:20px 0 0">Reply directly to this email to reach ${esc(lead.name)}.</p>
</div>`;

  const text = pairs.map(([label, v]) => `${label}: ${v}`).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        ...(lead.email ? { reply_to: lead.email } : {}),
        html,
        text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { configured: true, delivered: false, reason: `resend ${res.status} ${detail.slice(0, 140)}` };
    }
    return { configured: true, delivered: true };
  } catch (e) {
    return {
      configured: true,
      delivered: false,
      reason: e instanceof Error ? e.message : "email send failed",
    };
  }
}

export async function recordLead(lead: Lead): Promise<RecordResult> {
  const cleaned: Lead = { ...lead, name: lead.name.trim(), email: lead.email.trim() };

  const [sheet, email] = await Promise.all([appendToTracker(cleaned), emailTeam(cleaned)]);

  const anyConfigured = sheet.configured || email.configured;
  const anyDelivered = sheet.delivered || email.delivered;
  // ok when nothing is wired yet (accept gracefully) OR a channel actually delivered.
  const ok = !anyConfigured || anyDelivered;

  if (!anyConfigured) {
    console.warn(
      "[lead] no channel configured (set LEADS_WEBHOOK_URL and/or RESEND_API_KEY); lead not persisted:",
      JSON.stringify(cleaned),
    );
  } else if (!anyDelivered) {
    console.error(
      "[lead] every configured channel failed:",
      sheet.reason,
      "|",
      email.reason,
      "|",
      JSON.stringify(cleaned),
    );
  }

  return { ok, configured: anyConfigured, sheet, email };
}
