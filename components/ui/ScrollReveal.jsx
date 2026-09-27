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

  // ── 3D vocabulary ───────────────────────────────────────────────────────────
  // These need a perspective ancestor to read correctly. Wrap the container in
  // <PerspectiveGroup> (or pass perspective to ScrollReveal) — a bare 3D
  // variant without perspective renders flat.
  depthRise: {
    hidden: { opacity: 0, y: 48, z: -180, rotateX: -16, scale: 0.9 },
    visible: { opacity: 1, y: 0, z: 0, rotateX: 0, scale: 1 },
  },
  depthInset: {
    hidden: { opacity: 0, z: -260, scale: 0.88 },
    visible: { opacity: 1, z: 0, scale: 1 },
  },
  flipTop: {
    hidden: { opacity: 0, rotateX: -78, transformOrigin: "top center" },
    visible: { opacity: 1, rotateX: 0, transformOrigin: "top center" },
  },
  flipBottom: {
    hidden: { opacity: 0, rotateX: 78, transformOrigin: "bottom center" },
    visible: { opacity: 1, rotateX: 0, transformOrigin: "bottom center" },
  },
  hingeLeft: {
    hidden: { opacity: 0, rotateY: 62, x: -40, transformOrigin: "left center" },
    visible: { opacity: 1, rotateY: 0, x: 0, transformOrigin: "left center" },
  },
  hingeRight: {
    hidden: { opacity: 0, rotateY: -62, x: 40, transformOrigin: "right center" },
    visible: { opacity: 1, rotateY: 0, x: 0, transformOrigin: "right center" },
  },
  cardPush: {
    hidden: { opacity: 0, z: -220, scale: 0.9, rotateX: 6 },
    visible: { opacity: 1, z: 0, scale: 1, rotateX: 0 },
  },
  tiltBack: {
    hidden: { opacity: 0, y: 40, rotateX: 22, z: -120, scale: 0.94 },
    visible: { opacity: 1, y: 0, rotateX: 0, z: 0, scale: 1 },
  },
};

// ─── Shared transition presets ────────────────────────────────────────────────
export const TRANSITIONS = {
  default: { duration: 0.5, ease: EASE_SMOOTH },
  spring: { type: "spring", stiffness: 280, damping: 22, mass: 0.6 },
  springLight: { type: "spring", stiffness: 400, damping: 28, mass: 0.4 },
  slow: { duration: 0.75, ease: EASE_SMOOTH },
  // Softer landing for 3D entrances — a touch of overshoot sells the depth.
  depth: { type: "spring", stiffness: 160, damping: 24, mass: 0.9 },
};

// Variants that read as 3D and therefore want a perspective ancestor.
const PERSPECTIVE_VARIANTS = new Set([
  "depthRise",
  "depthInset",
  "flipTop",
  "flipBottom",
  "hingeLeft",
  "hingeRight",
  "cardPush",
  "tiltBack",
]);

// ─── ScrollReveal component ───────────────────────────────────────────────────
/**
 * ScrollReveal — universal viewport-triggered animation wrapper.
 *
 * Pass a 3D variant name (`depthRise`, `flipTop`, `hingeLeft`, …) and the
 * wrapper supplies its own perspective so the rotation actually reads.
 *
 * @example
 * <ScrollReveal variant="scaleUp" delay={0.15}>
 *   <MyCard />
 * </ScrollReveal>
 *
 * @example
 * <ScrollReveal variant="depthRise" perspective={1100}>
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
  perspective,
  transformStyle = "preserve-3d",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px", ...viewOptions });
  const [isViewed, setIsViewed] = useState(false);

  const resolvedVariants = variants ?? VARIANTS[variant] ?? VARIANTS.fadeUp;
  const is3D = PERSPECTIVE_VARIANTS.has(variant);
  const resolvedTransition =
    transition ??
    (is3D
      ? { ...TRANSITIONS.depth, delay }
      : { ...TRANSITIONS.default, delay });

  const MotionTag = motion[as] ?? motion.div;

  const isPerspectiveRoot = perspective !== undefined && perspective !== null;

  const element = (
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
      style={
        is3D
          ? { transformStyle, willChange: "transform", ...style }
          : style
      }
    >
      {children}
    </MotionTag>
  );

  // Only create the extra perspective node when this element is the 3D root —
  // nesting perspective on every child flattens sibling depth for no gain.
  if (isPerspectiveRoot) {
    return (
      <div style={{ perspective, perspectiveOrigin: "50% 50%" }}>
        {element}
      </div>
    );
  }

  return element;
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
  perspective,
  style,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px", ...viewOptions });
  const [isViewed, setIsViewed] = useState(false);

  const MotionTag = motion[as] ?? motion.div;

  const element = (
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
      style={style}
    >
      {children}
    </MotionTag>
  );

  if (perspective !== undefined && perspective !== null) {
    return (
      <div style={{ perspective, perspectiveOrigin: "50% 50%" }}>
        {element}
      </div>
    );
  }

  return element;
}

export default ScrollReveal;
