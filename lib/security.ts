/** In-memory sliding window rate limiter.
 * NOT production-safe across Vercel serverless instances:
 * each isolate has its own Map — limits are best-effort, not shared/persistent.
 * Acceptable for a low-traffic personal site; add Redis/KV only if spam spikes.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const MAX_BUCKETS = 5000;

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 64);
  return "unknown";
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();

  if (buckets.size > MAX_BUCKETS) {
    for (const [k, v] of buckets) {
      if (v.resetAt <= now) buckets.delete(k);
    }
    if (buckets.size > MAX_BUCKETS) {
      const oldest = buckets.keys().next().value;
      if (oldest) buckets.delete(oldest);
    }
  }

  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (current.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { ok: true };
}

export function sanitizeText(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function isAllowedOrigin(request: Request, siteUrl: string): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  const isDevLocal = (value: string) =>
    process.env.NODE_ENV !== "production" &&
    (value.startsWith("http://localhost:") ||
      value.startsWith("http://127.0.0.1:"));

  try {
    const site = new URL(siteUrl);

    if (origin) {
      if (origin === site.origin) return true;
      return isDevLocal(origin);
    }

    // Bazı tarayıcılar Origin göndermez; Referer ile doğrula
    if (referer) {
      const ref = new URL(referer);
      if (ref.origin === site.origin) return true;
      return isDevLocal(ref.origin);
    }

    // Origin ve Referer yoksa reddet (curl / scrapers)
    return false;
  } catch {
    return false;
  }
}

export function escapeJsonForScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
