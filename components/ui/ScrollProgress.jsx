"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — glowing top-of-page progress bar tracking scroll depth.
 */
export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400"
      style={{ scaleX }}
    />
  );
}
