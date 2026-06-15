import { NextRequest, NextResponse } from "next/server";
import { recordLead } from "@/lib/leads";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  business?: string;
  need?: string;
  message?: string;
  _honey?: string; // honeypot
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  // Honeypot: a bot filled the hidden field. Accept silently, record nothing.
  if (body._honey) return NextResponse.json({ ok: true });

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "name and a valid email are required" }, { status: 400 });
  }

  const result = await recordLead({
    kind: "contact",
    name,
    email,
    business: (body.business || "").trim(),
    need: (body.need || "").trim(),
    message: (body.message || "").trim(),
    source: "shiftu.ca/contact",
  });

  if (!result.ok) {
    // A channel is configured but the send failed — surface it so the UI shows
    // the email fallback rather than a false "received".
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
