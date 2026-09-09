"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Laptop,
  MapPin,
  Shirt,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import profile from "../data/profile.json";
import { BorderBeam } from "./ui/BorderBeam";
import { InteractiveParticles } from "./ui/InteractiveParticles";
import { Magnetic } from "./ui/Magnetic";
import { NumberTicker } from "./ui/NumberTicker";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextRevealMask } from "./ui/TextRevealMask";

const labels = [
  { title: "Fashion & Textile", icon: Shirt, tone: "indigo" },
  { title: "Tech & Software", icon: Laptop, tone: "slate" },
  { title: "Self-Development", icon: Sparkles, tone: "sky" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

  return (
    <section id="home" className="relative overflow-hidden pt-10 sm:pt-16">
      <div className="absolute inset-0 soft-gradient" aria-hidden="true" />
      <div className="absolute inset-0 noise-grid" aria-hidden="true" />

      {/* Interactive Canvas Particle network (21st.dev) */}
      <InteractiveParticles quantity={36} color="99, 102, 241" />

      {/* Ambient glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-16 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-32 h-56 w-56 rounded-full bg-violet-300/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8 sm:pb-32 sm:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge with 21st Border Beam */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-slate-700 shadow-xs backdrop-blur sm:text-[11px]"
          >
            <BorderBeam
              size={90}
              duration={10}
              colorFrom="#6366f1"
              colorTo="#a855f7"
              borderWidth={1.5}
            />
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Textile Engineering × Tech Enthusiast
          </motion.div>

          {/* Hero heading — masked reveal */}
          <div className="mt-6 sm:mt-8">
            <TextRevealMask
              as="h1"
              splitBy="lines"
              className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
              viewportMargin="0px"
              delay={0.08}
            >
              I bridge the gap between textile engineering and modern computer
              technology.
            </TextRevealMask>
          </div>

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.55 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            From optimizing production lines on the sewing floor to designing
            interfaces with custom tools — I help build better products, whether
            they&apos;re made of cotton, pixels, or a little bit of both.
          </motion.p>

          {/* CTAs with Magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.68 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Magnetic
              intensity={0.4}
              range={80}
              springOptions={{ stiffness: 200, damping: 15, mass: 0.3 }}
            >
              <Link
                href="#designs"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-medium text-white shadow-sm ring-1 ring-slate-900/5 transition-all hover:bg-slate-800 hover:shadow-lg sm:w-auto"
              >
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic
              intensity={0.4}
              range={80}
              springOptions={{ stiffness: 200, damping: 15, mass: 0.3 }}
            >
              <Link
                href="/blog"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-medium text-slate-800 backdrop-blur transition-all hover:border-slate-300 hover:bg-white hover:shadow-md sm:w-auto"
              >
                Read My Articles
                <BookOpen className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: 0.8 }}
            className="mt-5 inline-flex items-center gap-1.5 text-xs text-slate-500"
          >
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            Based in {profile.location} · Available for select collaborations
          </motion.div>

          {/* 21st NumberTicker metrics banner */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.85 }}
            className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 rounded-3xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-md sm:grid-cols-4 sm:p-5"
          >
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                <NumberTicker value={50} delay={0.2} />+
              </div>
              <p className="mt-1 text-xs font-medium text-slate-500">
                3D Simulations
              </p>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-slate-200/60 p-2 text-center">
              <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                <NumberTicker value={100} delay={0.3} />
                K+
              </div>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Tutorial Views
              </p>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-slate-200/60 p-2 text-center">
              <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                <NumberTicker value={10} delay={0.4} />+
              </div>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Systems Optimized
              </p>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-slate-200/60 p-2 text-center">
              <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                <NumberTicker value={100} delay={0.5} />%
              </div>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Precision Standards
              </p>
            </div>
          </motion.div>
        </div>

        {/* Focus cards — SpotlightCard */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.9 }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {labels.map(({ title, icon: Icon, tone }, i) => {
            const toneStyles = {
              indigo:
                "from-indigo-500/10 via-white to-indigo-500/5 border-indigo-100 text-indigo-700",
              slate:
                "from-slate-500/10 via-white to-slate-500/5 border-slate-200 text-slate-700",
              sky: "from-sky-500/10 via-white to-sky-500/5 border-sky-100 text-sky-700",
            }[tone];
            return (
              <SpotlightCard
                key={title}
                glowColor={
                  tone === "indigo"
                    ? "rgba(99, 102, 241, 0.12)"
                    : tone === "sky"
                      ? "rgba(14, 165, 233, 0.10)"
                      : "rgba(100, 116, 139, 0.10)"
                }
                tiltStrength={6}
                className={`group relative overflow-hidden rounded-2xl border bg-linear-to-br p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg glow-ring ${toneStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 ring-1 ring-black/5">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Focus
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {title}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
