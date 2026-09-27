"use client";

import { useRef } from "react";
import {
  PerspectiveGroup,
  ScrollProgressRail,
} from "./ui/ScrollReveal3D";

/**
 * SectionShell — gives a page section a 3D stage.
 *
 * Two jobs:
 *  1. Puts `perspective` on the section, so any 3D variant rendered inside it
 *     (depthRise, flipTop, hingeLeft, cardPush, …) resolves to real depth
 *     instead of a flat 2D transform. This is the bit that matters — without a
 *     perspective ancestor, rotateX/rotateY are effectively no-ops.
 *  2. Drops a scroll progress rail down one edge, tracking how far the section
 *     has travelled through the viewport.
 *
 * `lean` / `parallax` are opt-in and default to 0. A rotated ancestor creates a
 * new containing block, which is safe for most content but makes `position:
 * sticky` columns jitter — leave them off for sections that stick.
 *
 * @example
 * <SectionShell id="skills" tone="emerald" rail="right">
 *   …
 * </SectionShell>
 */
export default function SectionShell({
  children,
  id,
  className = "",
  contentClassName = "",
  // Rail placement: "left" | "right" | null to omit.
  rail = "left",
  tone = "indigo",
  perspective = 1500,
  lean = 0,
  parallax = 0,
  railInset = "top-[16%] bottom-[16%]",
  railClassName = "hidden md:block",
  ...props
}) {
  const sectionRef = useRef(null);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative ${className}`}
      style={perspective ? { perspective } : undefined}
      {...props}
    >
      {rail ? (
        <ScrollProgressRail
          targetRef={sectionRef}
          side={rail}
          tone={tone}
          inset={railInset}
          className={railClassName}
        />
      ) : null}

      {lean || parallax ? (
        <PerspectiveGroup
          className={contentClassName}
          perspective={0}
          lean={lean}
          parallax={parallax}
        >
          {children}
        </PerspectiveGroup>
      ) : (
        <div className={contentClassName}>{children}</div>
      )}
    </section>
  );
}
