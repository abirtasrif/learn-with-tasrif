"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * CustomCursor — a spring-animated dual-ring cursor trailer for desktop.
 * Automatically hides on touch/mobile. Reads data-cursor-label and data-cursor attributes.
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [isButton, setIsButton] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 400, damping: 30, mass: 0.5 };
  const trailConfig = { stiffness: 100, damping: 20, mass: 0.8 };

  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  const ringX = useSpring(cursorX, trailConfig);
  const ringY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    // Only show on non-touch pointer devices
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.style.cursor = "none";

    const onMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible((prev) => (!prev ? true : prev));

      const target = e.target;
      const closestButton = target.closest("button, a, [role='button'], input, select, textarea");
      const cursorLabelEl = target.closest("[data-cursor-label]");
      setLabel(cursorLabelEl?.dataset?.cursorLabel ?? "");
      setIsButton(!!closestButton);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] top-0 left-0"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: isButton ? 0 : 1,
            opacity: isButton ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="h-2.5 w-2.5 rounded-full bg-indigo-600"
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] top-0 left-0"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: isButton ? (label ? 72 : 48) : 36,
            height: isButton ? (label ? 72 : 48) : 36,
            borderColor: isButton ? "rgb(99, 102, 241)" : "rgba(99, 102, 241, 0.4)",
            backgroundColor: isButton ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex items-center justify-center rounded-full border-2 border-indigo-400/40"
        >
          {label && isButton && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-[8px] font-bold uppercase tracking-widest text-indigo-600"
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
