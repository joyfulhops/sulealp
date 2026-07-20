import Link from "next/link";
import BrandMark from "@/components/brand/BrandMark";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

const hasSocial =
  Boolean(siteConfig.social.linkedin) ||
  Boolean(siteConfig.social.instagram) ||
  Boolean(siteConfig.social.youtube);

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shell footer-inner">
        <div className="footer-grid">
          {/* 1 — Brand */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo">
              <BrandMark
                variant="light"
                size="sm"
                showTagline={false}
                className="footer-brand-mark"
              />
            </div>
            <p className="footer-tagline">{siteConfig.tagline}</p>
            <p className="footer-blurb">
              Lüks gayrimenkul, stratejik yatırım ve kentsel dönüşüm alanında
              kişisel danışmanlık.
            </p>
            {hasSocial ? (
              <div className="footer-social">
                {siteConfig.social.linkedin ? (
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    LinkedIn
                  </a>
                ) : null}
                {siteConfig.social.instagram ? (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Instagram
                  </a>
                ) : null}
                {siteConfig.social.youtube ? (
                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    YouTube
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* 2 — Menü */}
          <nav className="footer-col" aria-label="Menü">
            <h2 className="footer-heading">Menü</h2>
            <ul className="footer-list">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3 — Hizmetler */}
          <nav className="footer-col" aria-label="Hizmetler">
            <h2 className="footer-heading">Hizmetler</h2>
            <ul className="footer-list">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className="footer-link"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 4 — İletişim */}
          <div className="footer-col footer-col-contact">
            <h2 className="footer-heading">İletişim</h2>
            <ul className="footer-list footer-contact-list">
              <li className="footer-contact-name">{siteConfig.name}</li>
              <li>
                <a href={siteConfig.phoneHref} className="footer-link footer-tap">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="footer-link footer-tap"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="footer-contact-place">
                {siteConfig.address.locality}, {siteConfig.address.country}
              </li>
            </ul>
            <Link href="/iletisim" className="footer-cta">
              Görüşme talep et
              <span className="footer-cta-arrow" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="footer-shell footer-bar-inner">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları
            saklıdır.
          </p>
          <div className="footer-legal">
            {siteConfig.legal.map((item) => (
              <Link key={item.href} href={item.href} className="footer-legal-link">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
