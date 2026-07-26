"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  easeLuxury,
  usePrefersReducedMotion,
} from "@/components/motion/motionPresets";

export function Stagger({
  children,
  className = "",
  delayChildren = 0.08,
  staggerChildren = 0.1,
  once = true,
  amount = 0.15,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  once?: boolean;
  amount?: number;
  immediate?: boolean;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: { delayChildren, staggerChildren },
    },
  };

  if (immediate) {
    return (
      <motion.div
        className={className}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  y = 24,
  duration = 0.7,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: easeLuxury },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
