"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  easeLuxury,
  usePrefersReducedMotion,
} from "@/components/motion/motionPresets";
import Button from "@/components/ui/Button";

export default function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="hero-seamless relative overflow-x-clip">
      {/* Desktop villa */}
      <div className="hero-media" aria-hidden>
        <motion.div
          className="hero-media-frame"
          initial={reduced ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduced ? 0 : 1.45, ease: easeLuxury }}
        >
          <Image
            src="/images/hero-villa-sunset.jpg"
            alt=""
            fill
            priority
            className="hero-photo object-cover object-[64%_center]"
            sizes="72vw"
            quality={94}
          />
        </motion.div>
      </div>

      <div className="hero-color-bridge" aria-hidden />

      <div className="hero-shell">
        <div className="hero-copy">
          <motion.p
            className="hero-eyebrow"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduced ? 0 : 0.15, ease: easeLuxury }}
          >
            Doğru Zaman. Doğru Karar.
          </motion.p>

          <motion.h1
            className="hero-title-seamless font-serif font-light text-ink"
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: reduced ? 0 : 0.28, ease: easeLuxury }}
          >
            <span className="block">Yüksek Değerli Gayrimenkul</span>
            <span className="block">ve Stratejik Yatırım</span>
            <span className="block">Danışmanlığı</span>
          </motion.h1>

          <motion.span
            className="hero-rule"
            aria-hidden
            initial={reduced ? false : { opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            style={{ transformOrigin: "left center" }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.42, ease: easeLuxury }}
          />

          <motion.p
            className="hero-lead"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduced ? 0 : 0.52, ease: easeLuxury }}
          >
            Vizyoner bakış, güçlü analiz ve deneyimle yatırımlarınızı koruyor,
            geleceğe değer katıyoruz.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduced ? 0 : 0.68, ease: easeLuxury }}
          >
            <Button href="/iletisim" className="hero-btn-primary">
              Özel Görüşme Talep Et
            </Button>
            <Button
              href="/hakkinda"
              variant="secondary"
              className="hero-btn-secondary"
            >
              Şule Alp’i Tanıyın
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet image under copy */}
      <div className="hero-mobile-shot">
        <motion.div
          className="hero-mobile-shot-frame"
          initial={reduced ? false : { opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduced ? 0 : 1.1, ease: easeLuxury }}
        >
          <Image
            src="/images/hero-villa-sunset-mobile.jpg"
            alt="Gün batımında taş ve ahşap detaylı lüks villa"
            fill
            priority
            className="hero-photo object-cover object-[64%_center]"
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </div>
    </section>
  );
}
