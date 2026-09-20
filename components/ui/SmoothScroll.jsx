"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Respect reduced-motion — fall back to native scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // Smooth touch/trackpad panning on mobile & tablets too.
      syncTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    // Smooth anchor navigation – intercept same-page hash links,
    // including Next-style "/#section" links from the FloatingDock.
    function handleAnchor(e) {
      const anchor = e.target.closest('a[href^="#"], a[href^="/#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      // Only smooth-scroll when the target section is on the current page.
      const targetPath = anchor.pathname || "/";
      if (targetPath !== window.location.pathname) return;
      const id = href.slice(hashIndex + 1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    }
    document.addEventListener("click", handleAnchor);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchor);
      lenis.destroy();
    };
  }, []);

  return children;
}
