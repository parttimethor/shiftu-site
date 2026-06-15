// Best-effort in-memory rate limiter. State lives per warm serverless instance,
// so this is a speed bump against naive floods from one source, NOT a hard
// global guarantee (a burst spread across cold starts can still get through).
// For strict limits, back this with a shared store (Vercel KV / Upstash Redis).

type Bucket = { count: number; start: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  opts: { windowMs?: number; max?: number } = {},
): { ok: boolean; retryAfter: number } {
  const windowMs = opts.windowMs ?? 60_000;
  const max = opts.max ?? 5;
  const now = Date.now();
  const b = buckets.get(key);

  if (!b || now - b.start > windowMs) {
    buckets.set(key, { count: 1, start: now });
    return { ok: true, retryAfter: 0 };
  }

  b.count += 1;
  if (b.count > max) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((b.start + windowMs - now) / 1000)) };
  }
  return { ok: true, retryAfter: 0 };
}

// First hop of x-forwarded-for (set by Vercel/Next), falling back to a constant
// so a missing header degrades to a single shared bucket rather than throwing.
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return xff?.split(",")[0]?.trim() || "anon";
}
