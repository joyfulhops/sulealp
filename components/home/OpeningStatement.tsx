"use client";

import { motion } from "motion/react";
import { SignatureMark } from "@/components/brand/BrandMark";
import {
  easeLuxury,
  usePrefersReducedMotion,
} from "@/components/motion/motionPresets";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Container from "@/components/ui/Container";
import { openingManifesto } from "@/data/manifesto";

export default function OpeningStatement() {
  const [lead, ...rest] = openingManifesto.paragraphs;
  const reduced = usePrefersReducedMotion();

  return (
    <section className="opening-statement bg-ivory" aria-label="Şule Alp yazısı">
      <Container className="opening-statement-inner">
        <Stagger
          immediate
          className="opening-statement-body"
          delayChildren={0.12}
          staggerChildren={0.12}
        >
          <StaggerItem y={20}>
            <p className="opening-statement-lead">{lead}</p>
          </StaggerItem>
          {rest.map((paragraph) => (
            <StaggerItem key={paragraph} y={18}>
              <p>{paragraph}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <motion.footer
          className="opening-statement-sign"
          initial={reduced ? false : { opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reduced ? 0 : 0.85,
            delay: reduced ? 0 : 1.05,
            ease: easeLuxury,
          }}
        >
          <SignatureMark className="opening-statement-signature" />
          <motion.p
            className="opening-statement-name"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduced ? 0 : 0.55,
              delay: reduced ? 0 : 1.35,
              ease: easeLuxury,
            }}
          >
            {openingManifesto.signOff}
          </motion.p>
        </motion.footer>
      </Container>
    </section>
  );
}
