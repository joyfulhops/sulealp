"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import BrandMark from "@/components/brand/BrandMark";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

type Indicator = {
  left: number;
  width: number;
  visible: boolean;
};

const DESKTOP_MQ = "(min-width: 1024px)";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function DesktopNav({ pathname }: { pathname: string }) {
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState<Indicator>({
    left: 0,
    width: 0,
    visible: false,
  });
  const hoverKey = useRef<string | null>(null);

  const placeOn = useCallback((el: HTMLElement | null | undefined) => {
    const nav = navRef.current;
    if (!nav || !el) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({
      left: rect.left - navRect.left,
      width: rect.width,
      visible: true,
    });
  }, []);

  const placeOnActive = useCallback(() => {
    const activeHref =
      siteConfig.nav.find((item) => isActivePath(pathname, item.href))?.href ??
      null;
    if (!activeHref) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    placeOn(linkRefs.current.get(activeHref));
  }, [pathname, placeOn]);

  useLayoutEffect(() => {
    hoverKey.current = null;
    placeOnActive();
  }, [placeOnActive]);

  useEffect(() => {
    const onResize = () => {
      if (hoverKey.current) {
        placeOn(linkRefs.current.get(hoverKey.current));
      } else {
        placeOnActive();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [placeOn, placeOnActive]);

  return (
    <nav
      ref={navRef}
      className="nav-desktop"
      aria-label="Ana menü"
      onMouseLeave={() => {
        hoverKey.current = null;
        placeOnActive();
      }}
    >
      <span
        className="nav-indicator"
        aria-hidden
        style={{
          transform: `translate3d(${indicator.left}px, 0, 0)`,
          width: indicator.width,
          opacity: indicator.visible ? 1 : 0,
        }}
      />

      {siteConfig.nav.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(node) => {
              if (node) linkRefs.current.set(item.href, node);
              else linkRefs.current.delete(item.href);
            }}
            aria-current={active ? "page" : undefined}
            className={`nav-link ${active ? "is-active" : ""}`}
            onMouseEnter={() => {
              hoverKey.current = item.href;
              placeOn(linkRefs.current.get(item.href));
            }}
            onFocus={() => {
              hoverKey.current = item.href;
              placeOn(linkRefs.current.get(item.href));
            }}
            onBlur={() => {
              hoverKey.current = null;
              placeOnActive();
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`mobile-menu-link${active ? " is-active" : ""}${pressed ? " is-pressed" : ""}`}
      onPointerDown={(e: ReactPointerEvent<HTMLAnchorElement>) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        setPressed(true);
      }}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onClick={onNavigate}
    >
      <span className="mobile-menu-link-text">{label}</span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerId = useId();
  const lastToggleAt = useRef(0);

  const closeMenu = useCallback(() => setOpen(false), []);

  const toggleMenu = useCallback(() => {
    const now = Date.now();
    if (now - lastToggleAt.current < 280) return;
    lastToggleAt.current = now;
    setOpen((v) => !v);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => {
      if (mq.matches) closeMenu();
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);

  const menuPortal =
    mounted && open
      ? createPortal(
          <div className="mobile-menu-root">
            <button
              type="button"
              className="mobile-menu-overlay"
              aria-label="Menüyü kapat"
              onClick={closeMenu}
            />
            <div
              id={drawerId}
              className="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobil menü"
            >
              <nav className="mobile-menu-nav" aria-label="Mobil menü">
                {siteConfig.nav.map((item) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={isActivePath(pathname, item.href)}
                    onNavigate={closeMenu}
                  />
                ))}
              </nav>

              <div className="mobile-menu-footer">
                <a
                  href={siteConfig.phoneHref}
                  className="mobile-menu-contact-link"
                  onClick={closeMenu}
                >
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mobile-menu-contact-link"
                  onClick={closeMenu}
                >
                  {siteConfig.email}
                </a>
                <Link
                  href="/iletisim"
                  className="mobile-menu-cta"
                  onClick={closeMenu}
                >
                  Özel Görüşme Talep Et
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header className="site-header">
        <div
          className={`site-header-bar ${scrolled || open ? "is-elevated" : ""}`}
        >
          <Container className="site-header-inner">
            <div className="site-header-brand">
              <BrandMark size="sm" showTagline={false} />
            </div>

            <DesktopNav pathname={pathname} />

            <button
              type="button"
              className="mobile-menu-toggle"
              aria-expanded={open}
              aria-controls={drawerId}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              onClick={toggleMenu}
            >
              <span className="sr-only">Menü</span>
              <span className="mobile-menu-icon" data-open={open} aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </button>
          </Container>
        </div>
      </header>

      {menuPortal}
    </>
  );
}
