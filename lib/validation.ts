import { contactSubjects } from "@/data/contact";
import { sanitizeText } from "@/lib/security";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  kvkk: boolean;
  website?: string; // honeypot
  /** Client form open timestamp (ms) — bot speed check */
  _t?: number;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneRegex = /^[0-9+\s()-]{10,20}$/;

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  phone: 20,
  message: 4000,
  website: 200,
  bodyBytes: 24_576, // ~24KB
} as const;

export function normalizeContact(raw: unknown): ContactPayload {
  const data = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;

  return {
    name: sanitizeText(data.name, CONTACT_LIMITS.name),
    email: sanitizeText(data.email, CONTACT_LIMITS.email).toLowerCase(),
    phone: sanitizeText(data.phone, CONTACT_LIMITS.phone),
    subject: sanitizeText(data.subject, 80),
    message: sanitizeText(data.message, CONTACT_LIMITS.message),
    kvkk: data.kvkk === true || data.kvkk === "true",
    website: sanitizeText(data.website, CONTACT_LIMITS.website),
    _t: typeof data._t === "number" && Number.isFinite(data._t) ? data._t : undefined,
  };
}

export function validateContact(data: ContactPayload): {
  ok: boolean;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  if (!data.name || data.name.length < 2) {
    errors.name = "Ad soyad en az 2 karakter olmalıdır.";
  }

  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Geçerli bir e-posta adresi girin.";
  }

  if (!data.phone || !phoneRegex.test(data.phone)) {
    errors.phone = "Geçerli bir telefon numarası girin.";
  }

  if (
    !data.subject ||
    !contactSubjects.includes(data.subject as (typeof contactSubjects)[number])
  ) {
    errors.subject = "Lütfen bir konu seçin.";
  }

  if (!data.message || data.message.length < 10) {
    errors.message = "Mesajınız en az 10 karakter olmalıdır.";
  } else if (data.message.length > CONTACT_LIMITS.message) {
    errors.message = "Mesajınız çok uzun.";
  }

  if (!data.kvkk) {
    errors.kvkk = "Devam etmek için KVKK aydınlatma metnini onaylamalısınız.";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}
