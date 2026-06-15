import { NextRequest, NextResponse } from "next/server";
import { recordLead } from "@/lib/leads";

export const runtime = "nodejs";

// Call-booking intake. Like /api/contact, it routes the lead through
// recordLead() so a booking lands in the Google Sheet tracker (and an optional
// email notification) exactly like a contact request — just tagged kind:"booking".
type Body = {
  name?: string;
  email?: string;
  phone?: string;
  preferred?: string;
  notes?: string;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "name and a valid email are required" }, { status: 400 });
  }

  const result = await recordLead({
    kind: "booking",
    name,
    email,
    phone: (body.phone || "").trim(),
    preferred: (body.preferred || "").trim(),
    message: (body.notes || "").trim(),
    source: "shiftu.ca/contact#book",
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
