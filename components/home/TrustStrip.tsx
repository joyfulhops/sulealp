"use client";

import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

const icons = [
  <svg key="a" viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden>
    <path
      d="M6 22.5 9.5 11l6.5 6.5L22.5 11 26 22.5H6Z"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    <path d="M7.5 25h17" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
  </svg>,
  <svg key="b" viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden>
    <circle cx="16" cy="11.5" r="3.25" stroke="currentColor" strokeWidth="1.15" />
    <path
      d="M9.5 24c1.4-3.2 3.6-4.8 6.5-4.8s5.1 1.6 6.5 4.8"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="c" viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden>
    <path
      d="M7 25V10.5L16 6l9 4.5V25"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
    <path
      d="M12 14h2.5M17.5 14H20M12 18.5h2.5M17.5 18.5H20M14.5 25v-4h3v4"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="d" viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden>
    <path
      d="M8 9h16M9.5 9v12.5M16 9v12.5M22.5 9v12.5M7 21.5h18M8.5 24.5h15M9.5 6.5h13L21 9H11L9.5 6.5Z"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
  </svg>,
];

export default function TrustStrip() {
  return (
    <section className="relative bg-ivory">
      <Container>
        <Stagger
          className="grid grid-cols-1 gap-0 py-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 sm:py-14 lg:grid-cols-4 lg:gap-0 lg:py-20"
          delayChildren={0.06}
          staggerChildren={0.1}
        >
          {siteConfig.trustPoints.map((item, index) => (
            <StaggerItem key={item.title} className="min-w-0" y={22}>
              <article
                className={`min-w-0 border-b border-[rgba(170,104,81,0.14)] py-7 last:border-b-0 sm:border-b-0 sm:py-0 lg:px-7 ${
                  index > 0 ? "lg:border-l lg:border-[rgba(170,104,81,0.14)]" : ""
                }`}
              >
                <span className="mb-4 inline-flex text-accent" aria-hidden>
                  {icons[index % icons.length]}
                </span>
                <h2 className="font-serif text-[1.35rem] leading-[1.2] font-normal tracking-[-0.01em] text-ink md:text-[1.5rem]">
                  {item.title}
                </h2>
                <p className="mt-2.5 max-w-[22rem] text-[14px] leading-[1.65] text-muted md:text-[15px]">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
