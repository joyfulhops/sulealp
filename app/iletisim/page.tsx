import type { ReactNode } from "react";
import ContactForm from "@/components/contact/ContactForm";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";
import { contactPage } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "İletişim | Şule Alp",
  description:
    "Şule Alp ile özel görüşme talep edin. Telefon, e-posta ve iletişim formu üzerinden ulaşın.",
  path: "/iletisim",
});

function ContactIcon({ children }: { children: ReactNode }) {
  return (
    <span className="contact-info-icon" aria-hidden>
      {children}
    </span>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "İletişim", path: "/iletisim" },
          ]),
        ])}
      />
      <section className="contact-page section-y bg-ivory pt-[calc(var(--header-h)+2rem)]">
        <Container className="contact-page-grid">
          <div className="contact-page-info">
            <SectionHeading
              eyebrow="İletişim"
              title={contactPage.h1}
              as="h1"
              description={contactPage.intro}
            />

            <p className="contact-privacy-note">{contactPage.privacyNote}</p>

            <ul className="contact-info-list">
              <li className="contact-info-row">
                <ContactIcon>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7.5 4.75h2.2l1.1 3.1-1.35 1.1a10.4 10.4 0 0 0 5.6 5.6l1.1-1.35 3.1 1.1v2.2A1.75 1.75 0 0 1 17.5 18a12.75 12.75 0 0 1-12.75-12.75 1.75 1.75 0 0 1 1.75-1.5Z"
                      stroke="currentColor"
                      strokeWidth="1.15"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ContactIcon>
                <div className="contact-info-body">
                  <span className="contact-info-label">Telefon</span>
                  <a href={siteConfig.phoneHref} className="contact-info-value">
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="contact-info-row">
                <ContactIcon>
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3.75"
                      y="5.75"
                      width="16.5"
                      height="12.5"
                      rx="1.2"
                      stroke="currentColor"
                      strokeWidth="1.15"
                    />
                    <path
                      d="m4.5 7.5 7.5 5.25L19.5 7.5"
                      stroke="currentColor"
                      strokeWidth="1.15"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ContactIcon>
                <div className="contact-info-body">
                  <span className="contact-info-label">E-posta</span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="contact-info-value contact-info-email"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="contact-info-row">
                <ContactIcon>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21s6.25-5.1 6.25-10.25A6.25 6.25 0 0 0 12 4.5a6.25 6.25 0 0 0-6.25 6.25C5.75 15.9 12 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="1.15"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="10.75"
                      r="2.1"
                      stroke="currentColor"
                      strokeWidth="1.15"
                    />
                  </svg>
                </ContactIcon>
                <div className="contact-info-body">
                  <span className="contact-info-label">Konum</span>
                  <p className="contact-info-value">İstanbul, Türkiye</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="contact-form-card">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
