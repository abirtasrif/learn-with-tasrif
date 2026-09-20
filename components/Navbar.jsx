"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import profile from "../data/profile.json";
import { Magnetic } from "./ui/Magnetic";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Designs", href: "#designs", id: "designs" },
  { label: "Videos", href: "#videos", id: "videos" },
  { label: "Blog", href: "/blog", id: "" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);

      // Scroll-spy for section links
      let current = "";
      for (const item of navItems) {
        if (!item.id) continue;
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 160) current = item.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] };

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 380, damping: 30, mass: 0.6 };

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={transition}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_8px_32px_-18px_rgba(99,102,241,0.45)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 transition-all duration-300 ${
          scrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"
        }`}
      >
        <Magnetic intensity={0.2} range={60}>
          <Link
            href="/"
            className="group flex items-center gap-2 text-slate-900"
            aria-label={`${profile.name} — Home`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-indigo-600 via-violet-500 to-sky-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105">
              <span className="absolute inset-0 holo-border" aria-hidden="true" />
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                {profile.name}
              </span>
              <span className="hidden text-[11px] text-slate-500 sm:block">
                {profile.headline}
              </span>
            </div>
          </Link>
        </Magnetic>

        {/* Desktop pill nav — LumaBar style */}
        <nav
          className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/70 px-2 py-1.5 shadow-lg shadow-indigo-500/5 backdrop-blur-xl lg:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const isActive = item.id && item.id === activeId;
            const isExternal = item.href === "/blog";
            const link = (
              <Link
                href={item.href}
                className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline-none ${
                  isActive
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-glow-pill"
                    className="absolute inset-0 rounded-full bg-linear-to-r from-indigo-600 via-violet-500 to-sky-500 shadow-[0_4px_16px_-4px_rgba(99,102,241,0.7)]"
                    transition={spring}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative z-10 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
            return <Magnetic key={item.label} intensity={0.25} range={50}>{link}</Magnetic>;
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Magnetic intensity={0.35} range={75}>
            <Link
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 hover:shadow-indigo-500/30 focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <span className="absolute inset-0 bg-linear-to-r from-indigo-600 via-violet-500 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              <span className="relative z-10">Let&apos;s Connect</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/70 bg-white/80 text-slate-700 shadow-sm backdrop-blur holo-border lg:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transition}
            className="lg:hidden"
          >
            <div className="border-t border-white/70 bg-white/85 backdrop-blur-2xl">
              <nav
                aria-label="Mobile"
                className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-indigo-50/70 hover:text-slate-900"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-indigo-500 to-sky-400" />
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-violet-500 to-sky-500 px-4 py-3 text-base font-medium text-white shadow-lg shadow-indigo-500/25"
                >
                  Let&apos;s Connect
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}