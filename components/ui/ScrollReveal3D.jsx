// Scroll-linked 3D reveal primitives.
//
// The core technique is adapted from 21st.dev's "ScrollTiltedGrid"
// (@ruixen.ui, id 12434): instead of a one-shot viewport trigger, tie the
// transform directly to `scrollYProgress` with the offsets ["start end",
// "end start"]. That maps the element's full pass through the viewport to a
// 0 → 1 progress value, so the motion is continuous and scrubbable rather
// than "played once and forgotten".
//
// Everything here is transform/opacity by default. `blur` is opt-in because a
// live CSS filter on several elements at once is the fastest way to drop
// frames on a mid-range laptop.

"use client";

import {
  cubicBezier,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

/** Rise-and-settle easing, mirrored on the way out. */
const EASE_INTO = cubicBezier(0.22, 1, 0.36, 1);
const EASE_OUT = cubicBezier(0, 0, 0.58, 1);
const FOCUS_EASE = [EASE_INTO, EASE_OUT];

/**
 * Track an element's progress across the viewport.
 * 0 = element's start edge touches the viewport end
 * 0.5 = element is centred
 * 1 = element's end edge leaves the viewport start
 */
export function useScrollProgress(
  ref,
  offset = ["start end", "end start"],
) {
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return scrollYProgress;
}

// ─── Reveal3D ────────────────────────────────────────────────────────────────
/**
 * Reveal3D — an element that flies in from below while tipped forward,
 * snaps flat into focus at mid-viewport, then tips back as it exits.
 *
 * Unlike ScrollReveal this never "finishes" — scrub it and the card follows.
 *
 * @example
 * <Reveal3D distance={240} tilt={26} blur={5}>
 *   <DesignCard />
 * </Reveal3D>
 */
export function Reveal3D({
  children,
  className = "",
  as = "div",
  // Depth pushed away from the viewer at the entry/exit extremes.
  distance = 220,
  // Peak rotateX, in degrees.
  tilt = 22,
  // Vertical travel as a percentage of the element's own height.
  travel = 55,
  // Horizontal drift in percent, signed by `origin`.
  drift = 0,
  origin = "left",
  // Optional focus pull: blurs and dims at the extremes.
  blur = 0,
  brightness = null,
  scaleFrom = 1,
  perspective = 1200,
  offset = ["start end", "end start"],
  spring,
  style,
}) {
  const ref = useRef(null);
  const progress = useScrollProgress(ref, offset);
  const reduce = useReducedMotion();

  const sign = origin === "right" ? 1 : origin === "center" ? 0 : -1;

  // Lenis already smooths the scroll signal, so this spring only needs to
  // remove jitter — keep it stiff or the reveal visibly trails the cursor.
  const springCfg = spring ?? { stiffness: 400, damping: 50, mass: 0.4 };
  const p = useSpring(progress, springCfg);

  const y = useTransform(p, [0, 0.5, 1], [`${travel}%`, "0%", `${-travel * 0.5}%`], {
    ease: FOCUS_EASE,
  });
  const x = useTransform(
    p,
    [0, 0.5, 1],
    [`${sign * drift}%`, "0%", `${sign * drift}%`],
    { ease: FOCUS_EASE },
  );
  const z = useTransform(p, [0, 0.5, 1], [distance, 0, -distance * 0.6], {
    ease: FOCUS_EASE,
  });
  const rotateX = useTransform(p, [0, 0.5, 1], [tilt, 0, -tilt * 0.55], {
    ease: FOCUS_EASE,
  });
  const rotateY = useTransform(
    p,
    [0, 0.5, 1],
    [sign * tilt * 0.4, 0, -sign * tilt * 0.3],
    { ease: FOCUS_EASE },
  );
  const scale = useTransform(p, [0, 0.5, 1], [scaleFrom, 1, scaleFrom], {
    ease: FOCUS_EASE,
  });
  const opacity = useTransform(p, [0, 0.18, 0.82, 1], [0, 1, 1, 0], {
    // One easing, not the FOCUS_EASE pair — that array is sized for three
    // keyframes and this mapping has four.
    ease: EASE_INTO,
  });
  const blurValue = useTransform(
    p,
    [0, 0.5, 1],
    [blur, 0, blur],
    { ease: FOCUS_EASE },
  );
  const brightnessValue = useTransform(
    p,
    [0, 0.5, 1],
    [brightness ?? 1, 1, brightness ?? 1],
    { ease: FOCUS_EASE },
  );
  // Compose the filter through useMotionTemplate — string-concatenating a
  // MotionValue into a style object re-runs reconciliation every frame.
  const filter = useMotionTemplate`blur(${blurValue}px) brightness(${brightnessValue})`;

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const MotionTag = motion[as] ?? motion.div;

  return (
    <div
      className="relative"
      style={{
        // 0 is falsy on purpose — callers whose parent already establishes
        // perspective pass 0 to avoid a nested (and flattening) context.
        ...(perspective ? { perspective, perspectiveOrigin: "50% 50%" } : null),
      }}
    >
      <MotionTag
        ref={ref}
        className={className}
        style={{
          y,
          x,
          z,
          rotateX,
          rotateY,
          scale,
          opacity,
          filter:
            blur > 0 || brightness !== null
              ? filter
              : undefined,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
          ...style,
        }}
      >
        {children}
      </MotionTag>
    </div>
  );
}

// ─── PerspectiveGroup ────────────────────────────────────────────────────────
/**
 * PerspectiveGroup — establishes a 3D stage for its children and leans the
 * whole stage slightly as the section scrolls through the viewport. The lean
 * is deliberately capped low (a couple of degrees): more than that reads as
 * motion sickness rather than depth.
 *
 * @example
 * <PerspectiveGroup lean={2.2} parallax={40}>
 *   <div className="grid ...">…</div>
 * </PerspectiveGroup>
 */
export function PerspectiveGroup({
  children,
  className = "",
  perspective = 1400,
  perspectiveOrigin = "50% 50%",
  // Degrees of scroll-driven lean. 0 disables.
  lean = 1.6,
  // Vertical parallax shift in px across the section's scroll range.
  parallax = 0,
  offset = ["start end", "end start"],
  style,
}) {
  const ref = useRef(null);
  const progress = useScrollProgress(ref, offset);
  const reduce = useReducedMotion();

  const p = useSpring(progress, { stiffness: 180, damping: 34, mass: 0.7 });
  const rotateX = useTransform(p, [0, 1], [lean, -lean]);
  const y = useTransform(p, [0, 1], [parallax, -parallax]);

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // 0 is falsy on purpose — callers wrapping an element that already has
        // perspective upstream can pass 0 to skip adding a nested context.
        ...(perspective ? { perspective, perspectiveOrigin } : null),
        ...style,
      }}
    >
      <motion.div
        style={{
          rotateX,
          y,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── ScrollProgressRail ──────────────────────────────────────────────────────
/**
 * ScrollProgressRail — a vertical progress rail that fills as its target
 * scrolls through the viewport, with a glowing head that trails on a spring.
 *
 * Reads as a "depth gauge" when paired with PerspectiveGroup.
 *
 * @example
 * <ScrollProgressRail side="left" targetRef={sectionRef} />
 */
export function ScrollProgressRail({
  side = "left",
  className = "",
  // Which element to track. Falls back to a rail-sized sentinel of its own.
  targetRef,
  // Placement along the parent's cross axis and along its block axis.
  inset = "top-[16%] bottom-[16%]",
  offset = ["start end", "end start"],
  tone = "indigo",
}) {
  const fallbackRef = useRef(null);
  const ref = targetRef ?? fallbackRef;
  const progress = useScrollProgress(ref, offset);
  const reduce = useReducedMotion();

  // The head overshoots the raw value slightly, so it leads on scroll-down and
  // trails on scroll-up — reads as physical momentum.
  const fill = useSpring(progress, { stiffness: 140, damping: 26, mass: 0.5 });
  const head = useSpring(progress, { stiffness: 220, damping: 20, mass: 0.35 });
  // Percentage string keeps the head correct at any rail height without
  // measuring the DOM.
  const headY = useTransform(head, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`);

  const gradients = {
    indigo: "from-indigo-400 via-violet-500 to-sky-400",
    violet: "from-violet-400 via-fuchsia-500 to-indigo-400",
    emerald: "from-emerald-400 via-teal-500 to-cyan-400",
    amber: "from-amber-400 via-orange-500 to-rose-400",
  };
  const dotTones = {
    indigo: "bg-indigo-500 shadow-[0_0_12px_3px_rgba(99,102,241,0.55)]",
    violet: "bg-violet-500 shadow-[0_0_12px_3px_rgba(139,92,246,0.55)]",
    emerald: "bg-emerald-500 shadow-[0_0_12px_3px_rgba(16,185,129,0.55)]",
    amber: "bg-amber-500 shadow-[0_0_12px_3px_rgba(245,158,11,0.55)]",
  };

  const gradient = gradients[tone] ?? gradients.indigo;
  const dot = dotTones[tone] ?? dotTones.indigo;

  const isLeft = side === "left";
  const position = isLeft ? "left-0" : "right-0";
  const railClasses = `pointer-events-none absolute ${position} ${inset} w-0.5 ${className}`;

  if (reduce) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={railClasses}
      />
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={railClasses}
      style={{ perspective: 400 }}
    >
      {/* Track */}
      <div className="rail-track absolute inset-0 rounded-full bg-slate-200/70" />
      {/* Fill — grows from the top of the rail */}
      <motion.div
        className={`absolute inset-x-0 top-0 h-full rounded-full bg-linear-to-b ${gradient} origin-top`}
        style={{ scaleY: fill, willChange: "transform" }}
      />
      {/* Glowing head — a full-height layer shifted down the rail */}
      <motion.div
        className="absolute inset-0"
        style={{ y: headY, willChange: "transform" }}
      >
        <span
          className={`rail-head absolute left-1/2 top-0 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${dot}`}
        />
      </motion.div>
    </div>
  );
}

export default Reveal3D;
