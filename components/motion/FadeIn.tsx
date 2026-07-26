"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import {
  easeLuxury,
  fadeUp,
  usePrefersReducedMotion,
} from "@/components/motion/motionPresets";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "animate" | "variants">;

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  y = 28,
  once = true,
  amount = 0.2,
  ...rest
}: FadeInProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: easeLuxury }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function FadeInImmediate({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        ...fadeUp,
        hidden: { opacity: 0, y },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration, delay, ease: easeLuxury }}
    >
      {children}
    </motion.div>
  );
}
