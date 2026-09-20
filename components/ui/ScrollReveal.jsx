// Adapted from 21st.dev — cnippet-dev/scroll-reveal (id: 18675)
// Modified to use framer-motion instead of motion/react, and extended
// with pre-composed animation variant presets.

"use client";

import {
  motion,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";

// ─── Shared easing ────────────────────────────────────────────────────────────
// EaseOutQuint-ish: gentle ramp-up, soft landing. Only transform/opacity are
// animated (never CSS filter) so reveals run on the compositor and stay smooth.
const EASE_SMOOTH = [0.22, 1, 0.36, 1];

// ─── Animation vocabulary ─────────────────────────────────────────────────────
export const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, scale: 0.985 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.94, y: 12 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  springPop: {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1 },
  },
};

// ─── Shared transition presets ────────────────────────────────────────────────
export const TRANSITIONS = {
  default: { duration: 0.5, ease: EASE_SMOOTH },
  spring: { type: "spring", stiffness: 280, damping: 22, mass: 0.6 },
  springLight: { type: "spring", stiffness: 400, damping: 28, mass: 0.4 },
  slow: { duration: 0.75, ease: EASE_SMOOTH },
};

// ─── ScrollReveal component ───────────────────────────────────────────────────
/**
 * ScrollReveal — universal viewport-triggered animation wrapper.
 *
 * @example
 * <ScrollReveal variant="scaleUp" delay={0.15}>
 *   <MyCard />
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  variant = "fadeUp",
  variants,
  transition,
  viewOptions,
  as = "div",
  delay = 0,
  duration,
  once = true,
  className,
  style,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px", ...viewOptions });
  const [isViewed, setIsViewed] = useState(false);

  const resolvedVariants = variants ?? VARIANTS[variant] ?? VARIANTS.fadeUp;
  const resolvedTransition = transition ?? {
    ...(TRANSITIONS.default),
    delay,
    ...(duration ? { duration } : {}),
  };

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView || isViewed ? "visible" : "hidden"}
      variants={resolvedVariants}
      transition={resolvedTransition}
      onAnimationComplete={() => {
        if (once && isInView) setIsViewed(true);
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}

// ─── Stagger container helper ─────────────────────────────────────────────────
/**
 * StaggerReveal — orchestrates staggered children animations.
 * Children should each be a <ScrollReveal> or motion element.
 *
 * @example
 * <StaggerReveal stagger={0.07}>
 *   {items.map(item => <ScrollReveal key={item.id}>...</ScrollReveal>)}
 * </StaggerReveal>
 */
export function StaggerReveal({
  children,
  stagger = 0.07,
  delay = 0,
  viewOptions,
  className,
  as = "div",
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px", ...viewOptions });
  const [isViewed, setIsViewed] = useState(false);

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView || isViewed ? "visible" : "hidden"}
      onAnimationComplete={() => {
        if (once && isInView) setIsViewed(true);
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export default ScrollReveal;
