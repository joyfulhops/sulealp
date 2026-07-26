"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SignatureMark } from "@/components/brand/BrandMark";
import FadeIn from "@/components/motion/FadeIn";
import { usePrefersReducedMotion } from "@/components/motion/motionPresets";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export default function AboutTeaser() {
  const [lead, ...rest] = siteConfig.aboutShort;
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [28, -28]);

  return (
    <section
      ref={sectionRef}
      className="about-teaser bg-ivory py-14 md:py-[72px] lg:py-[88px]"
    >
      <Container className="about-teaser-grid">
        <FadeIn className="about-teaser-media min-w-0" y={32} duration={0.85}>
          <div className="about-teaser-photo">
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
              <Image
                src="/images/sule-alp-portrait.jpg"
                alt="Şule Alp"
                fill
                priority
                className="object-cover object-[center_12%] scale-[1.08]"
                sizes="(max-width: 1023px) 90vw, 42vw"
              />
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn className="about-teaser-copy min-w-0" delay={0.12} y={28} duration={0.8}>
          <p className="eyebrow">Hakkında</p>

          <h2 className="h2 mt-3 text-ink md:mt-4">Şule Alp Kimdir?</h2>

          <div className="about-teaser-body">
            <p>{lead}</p>
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <blockquote className="about-teaser-quote">
            <p>“{siteConfig.quote}”</p>
            <SignatureMark className="about-teaser-signature" />
          </blockquote>

          <div className="about-teaser-cta">
            <Button
              href="/hakkinda"
              variant="secondary"
              className="about-teaser-btn"
            >
              Şule Alp’i Daha Yakından Tanıyın
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
