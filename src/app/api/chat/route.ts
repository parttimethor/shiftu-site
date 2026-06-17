import { NextRequest, NextResponse } from "next/server";
import { respond } from "@/lib/chat-responder";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

// The widget is powered by a deterministic, rule-based responder (src/lib/
// chat-responder.ts). No LLM, no API key, no external calls — so there is no
// per-message cost for a flood to run up. The rate limit + origin check below
// are abuse hygiene, not cost control.

// Same-origin / first-party guard: blocks other sites from embedding the widget.
function originOk(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin / server fetch
  try {
    const host = new URL(origin).host;
    const self = req.headers.get("host") ?? "";
    return (
      host === self ||
      host === "shiftu.ca" ||
      host === "www.shiftu.ca" ||
      host.endsWith(".shiftu.ca") ||
      host.endsWith(".vercel.app") ||
      host.startsWith("localhost")
    );
  } catch {
    return false;
  }
}

const SOFT_FALLBACK =
  "I can't quite parse that. The fastest way to a real answer is to book a quick call at shiftu.ca/contact, or email hello@shiftu.ca.";

export async function POST(req: NextRequest) {
  if (!originOk(req)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const rl = rateLimit(`chat:${clientIp(req)}`, { windowMs: 60_000, max: 30 });
  if (!rl.ok) {
    return NextResponse.json(
      { reply: "You're sending messages quickly. Give it a moment, then try again." },
      { status: 429, headers: { "retry-after": String(rl.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  // The responder is stateless: the last user message drives the reply.
  const lastUser = [...raw]
    .reverse()
    .find(
      (m): m is { role: string; content: string } =>
        !!m &&
        (m as { role?: unknown }).role === "user" &&
        typeof (m as { content?: unknown }).content === "string",
    );

  const text = (lastUser?.content || "").slice(0, 2000).trim();
  if (!text) return NextResponse.json({ reply: SOFT_FALLBACK });

  return NextResponse.json({ reply: respond(text) });
}
