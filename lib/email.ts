import { Resend } from "resend";
import type { ContactPayload } from "@/lib/validation";
import { siteConfig } from "@/data/site";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function plainBody(data: ContactPayload): string {
  return [
    "Yeni iletişim formu mesajı",
    "",
    `Ad Soyad: ${data.name}`,
    `E-posta: ${data.email}`,
    `Telefon: ${data.phone}`,
    `Konu: ${data.subject}`,
    "",
    "Mesaj:",
    data.message,
    "",
    `— ${siteConfig.url}`,
  ].join("\n");
}

function htmlBody(data: ContactPayload): string {
  const rows = [
    ["Ad Soyad", data.name],
    ["E-posta", data.email],
    ["Telefon", data.phone],
    ["Konu", data.subject],
  ]
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px;color:#6E655E;font-size:13px;width:120px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;color:#171412;font-size:15px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="tr">
<body style="margin:0;padding:0;background:#F8F5F0;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#ffffff;border:1px solid rgba(170,104,81,0.24);">
    <div style="padding:20px 24px;border-bottom:1px solid rgba(170,104,81,0.18);">
      <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#AA6851;">Şule Alp</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:400;color:#171412;">Yeni iletişim mesajı</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;padding:8px 0;">${rows}</table>
    <div style="padding:8px 24px 24px;">
      <p style="margin:0 0 8px;font-size:13px;color:#6E655E;">Mesaj</p>
      <p style="margin:0;font-size:15px;line-height:1.65;color:#171412;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  </div>
</body>
</html>`;
}

export type SendContactResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

export async function sendContactEmail(
  data: ContactPayload,
): Promise<SendContactResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY tanımlı değil." };
  }

  // Preview / non-production: never deliver to the live inbox
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development" ||
    (process.env.NODE_ENV !== "production" && !process.env.VERCEL_ENV);

  if (isPreview && process.env.CONTACT_ALLOW_LIVE_EMAIL !== "1") {
    const previewTo = process.env.CONTACT_PREVIEW_TO_EMAIL?.trim();
    if (!previewTo) {
      console.info("[contact] preview: email skipped (set CONTACT_PREVIEW_TO_EMAIL to deliver)");
      return { ok: true, id: "preview-skipped" };
    }
    return deliver(apiKey, previewTo, data);
  }

  const to =
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    siteConfig.email;

  return deliver(apiKey, to, data);
}

async function deliver(
  apiKey: string,
  to: string,
  data: ContactPayload,
): Promise<SendContactResult> {
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Şule Alp <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const { data: sent, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `[Web] ${data.subject.replace(/[\r\n]+/g, " ")} — ${data.name.replace(/[\r\n]+/g, " ")}`,
    text: plainBody(data),
    html: htmlBody(data),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, id: sent?.id };
}
