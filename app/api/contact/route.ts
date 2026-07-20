import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { sendContactEmail } from "@/lib/email";
import {
  getClientIp,
  isAllowedOrigin,
  rateLimit,
} from "@/lib/security";
import {
  CONTACT_LIMITS,
  normalizeContact,
  validateContact,
} from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 dk / IP
const MIN_SUBMIT_MS = 1800; // form açılışından sonra min süre

function json(
  body: Record<string, unknown>,
  status = 200,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limited.ok) {
    return json(
      { ok: false, errors: { message: "Çok fazla deneme. Lütfen daha sonra tekrar deneyin." } },
      429,
      { "Retry-After": String(limited.retryAfterSec) },
    );
  }

  if (!isAllowedOrigin(request, siteConfig.url)) {
    return json({ ok: false, errors: { message: "Geçersiz istek." } }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ ok: false, errors: { message: "Geçersiz istek." } }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > CONTACT_LIMITS.bodyBytes) {
    return json({ ok: false, errors: { message: "İstek çok büyük." } }, 413);
  }

  let rawText: string;
  try {
    rawText = await request.text();
  } catch {
    return json({ ok: false, errors: { message: "Geçersiz istek." } }, 400);
  }

  if (rawText.length > CONTACT_LIMITS.bodyBytes) {
    return json({ ok: false, errors: { message: "İstek çok büyük." } }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText) as unknown;
  } catch {
    return json({ ok: false, errors: { message: "Geçersiz istek." } }, 400);
  }

  const body = normalizeContact(parsed);

  // Honeypot — bots fill hidden field; respond as success
  if (body.website && body.website.length > 0) {
    return json({ ok: true });
  }

  // Speed trap — missing or absurd timestamps look like bots
  if (typeof body._t !== "number") {
    return json({ ok: true });
  }

  const elapsed = Date.now() - body._t;
  if (elapsed < MIN_SUBMIT_MS || elapsed > 1000 * 60 * 60 * 6) {
    return json({ ok: true });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return json({ ok: false, errors: result.errors }, 400);
  }

  // TODO: Cloudflare Turnstile

  const sent = await sendContactEmail(body);
  if (!sent.ok) {
    console.error("[contact] email failed", sent.error);
    return json(
      {
        ok: false,
        errors: {
          message:
            "Mesaj şu an iletilemedi. Lütfen daha sonra tekrar deneyin veya telefonla ulaşın.",
        },
      },
      502,
    );
  }

  console.info("[contact]", {
    ok: true,
    subject: body.subject,
    messageLength: body.message.length,
    emailId: sent.id,
    ...(process.env.NODE_ENV !== "production" ? { ip } : {}),
  });

  return json({ ok: true });
}

export function GET() {
  return json({ ok: false, errors: { message: "Method not allowed." } }, 405);
}
