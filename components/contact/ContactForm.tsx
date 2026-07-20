"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { contactPage, contactSubjects } from "@/data/contact";
import type { ContactPayload, FieldErrors } from "@/lib/validation";
import { CONTACT_LIMITS, validateContact } from "@/lib/validation";

const initial: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  subject: contactSubjects[0],
  message: "",
  kvkk: false,
  website: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");
  const openedAt = useRef<number>(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const client = validateContact(form);
    if (!client.ok) {
      setErrors(client.errors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: form.website ?? "",
          _t: openedAt.current,
        }),
      });

      const data = (await res.json()) as {
        ok: boolean;
        errors?: FieldErrors;
      };

      if (res.status === 429) {
        setStatus("error");
        setStatusMessage(
          data.errors?.message ??
            "Çok fazla deneme. Lütfen daha sonra tekrar deneyin.",
        );
        return;
      }

      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        setStatusMessage(contactPage.errorMessage);
        return;
      }

      setForm(initial);
      openedAt.current = Date.now();
      setStatus("success");
    } catch {
      setStatus("error");
      setStatusMessage(contactPage.errorMessage);
    }
  };

  if (status === "success") {
    return (
      <div className="contact-success-state" role="status" aria-live="polite">
        <p className="contact-success-title">{contactPage.successTitle}</p>
        <p className="contact-success-text">{contactPage.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="contact-form relative" noValidate>
      <div className="contact-form-row">
        <Field
          id="name"
          label="Ad Soyad"
          error={errors.name}
          value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name}
          required
        />
        <Field
          id="email"
          label="E-posta"
          type="email"
          error={errors.email}
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          autoComplete="email"
          maxLength={CONTACT_LIMITS.email}
          required
        />
      </div>

      <div className="contact-form-row">
        <Field
          id="phone"
          label="Telefon"
          type="tel"
          error={errors.phone}
          value={form.phone}
          onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
          autoComplete="tel"
          maxLength={CONTACT_LIMITS.phone}
          required
        />
        <div className="contact-field">
          <label htmlFor="subject" className="contact-label">
            Konu
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={(e) =>
              setForm((f) => ({ ...f, subject: e.target.value }))
            }
            className="contact-input contact-select"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            required
          >
            {contactSubjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <p id="subject-error" className="contact-error" role="alert">
              {errors.subject}
            </p>
          ) : null}
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="message" className="contact-label">
          Mesaj
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          maxLength={CONTACT_LIMITS.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="contact-input contact-textarea"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
        />
        {errors.message ? (
          <p id="message-error" className="contact-error" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div
        className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
        aria-hidden
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        />
      </div>

      <div className="contact-field">
        <label className="contact-kvkk">
          <input
            type="checkbox"
            checked={form.kvkk}
            onChange={(e) => setForm((f) => ({ ...f, kvkk: e.target.checked }))}
            className="contact-checkbox"
            aria-invalid={Boolean(errors.kvkk)}
            aria-describedby={errors.kvkk ? "kvkk-error" : undefined}
            required
          />
          <span className="contact-kvkk-text">
            <Link href="/kvkk-aydinlatma-metni" className="contact-kvkk-link">
              KVKK Aydınlatma Metni
            </Link>
            ’ni okudum ve kişisel verilerimin iletişim amacıyla işlenmesini
            kabul ediyorum.
          </span>
        </label>
        {errors.kvkk ? (
          <p id="kvkk-error" className="contact-error" role="alert">
            {errors.kvkk}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="contact-submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Gönderiliyor..." : "Mesajı Gönder"}
      </button>

      {status === "error" && statusMessage ? (
        <p className="contact-error contact-error-global" role="alert">
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  required,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  maxLength?: number;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="contact-field">
      <label htmlFor={id} className="contact-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="contact-input"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p id={errorId} className="contact-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
