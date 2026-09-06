"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * SpotlightCard – 3D tilt + radial spotlight glow following the cursor.
 * Usage: <SpotlightCard className="..." cursorLabel="VIEW">...</SpotlightCard>
 */
export function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(99, 102, 241, 0.15)",
  tiltStrength = 8, // max degrees
  cursorLabel,
  ...props
}) {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltStrength, -tiltStrength]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltStrength, tiltStrength]), springConfig);

  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX);
    mouseY.set(relY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const spotlightStyle = {
    background: useTransform(
      [glowX, glowY],
      ([x, y]) => {
        const px = ((x + 0.5) * 100).toFixed(1);
        const py = ((y + 0.5) * 100).toFixed(1);
        return `radial-gradient(600px circle at ${px}% ${py}%, ${glowColor}, transparent 60%)`;
      }
    ),
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      data-cursor-label={cursorLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: "800px" }}
      {...props}
    >
      {/* Spotlight overlay */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={spotlightStyle}
      />
      {children}
    </motion.div>
  );
}

export default SpotlightCard;
