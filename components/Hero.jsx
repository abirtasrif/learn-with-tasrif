"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
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
import { ScrollReveal, StaggerReveal, TRANSITIONS, VARIANTS } from "./ui/ScrollReveal";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextRevealMask } from "./ui/TextRevealMask";

const labels = [
  { title: "Fashion & Textile", icon: Shirt, tone: "indigo" },
  { title: "Tech & Software", icon: Laptop, tone: "slate" },
  { title: "Self-Development", icon: Sparkles, tone: "sky" },
];

const statItems = [
  { value: 50, suffix: "+", label: "3D Simulations", delay: 0.2 },
  { value: 100, suffix: "K+", label: "Tutorial Views", delay: 0.3 },
  { value: 10, suffix: "+", label: "Systems Optimized", delay: 0.4 },
  { value: 100, suffix: "%", label: "Precision Standards", delay: 0.5 },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Badge spring pop
  const badgeTransition = reduceMotion
    ? { duration: 0 }
    : { ...TRANSITIONS.spring, delay: 0 };

  // Smooth orchestrated text/content transitions
  const smoothTransition = (delay = 0) =>
    reduceMotion ? { duration: 0 } : { ...TRANSITIONS.default, delay };

  return (
    <section id="home" className="relative overflow-hidden pt-10 sm:pt-16">
      <div className="absolute inset-0 soft-gradient" aria-hidden="true" />
      <div className="absolute inset-0 noise-grid" aria-hidden="true" />

      {/* Orbital ring decorations */}
      <div
        aria-hidden="true"
        className="orbit-ring animate-orbit left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2"
        style={{ "--orbit-duration": "40s" }}
      >
        <span className="orbit-sat" style={{ marginLeft: "-4px", top: "0%" }} />
      </div>
      <div
        aria-hidden="true"
        className="orbit-ring animate-orbit left-1/2 top-24 h-[46rem] w-[46rem] -translate-x-1/2 opacity-70"
        style={{ "--orbit-duration": "64s" }}
      >
        <span className="orbit-sat" style={{ marginTop: "-4px", left: "0%" }} />
      </div>

      {/* Interactive Canvas Particle network (21st.dev) */}
      <InteractiveParticles quantity={36} color="99, 102, 241" />

      {/* Ambient glow orbs — CSS aurora float */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-16 h-72 w-72 rounded-full bg-indigo-300/25 blur-3xl animate-float-a"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-32 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl animate-float-b"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-24 h-40 w-40 -translate-x-1/2 rounded-full bg-sky-200/20 blur-3xl animate-float-c"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8 sm:pb-32 sm:pt-14">
        <div className="mx-auto max-w-4xl text-center">

          {/* Badge — holographic pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={badgeTransition}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/70 bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-slate-700 shadow-lg shadow-indigo-500/10 backdrop-blur holo-border sm:text-[11px]"
          >
            <BorderBeam
              size={90}
              duration={10}
              colorFrom="#6366f1"
              colorTo="#22d3ee"
              borderWidth={1.5}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-linear-to-r from-indigo-500 to-sky-400 shadow-[0_0_10px_rgba(99,102,241,0.9)]" />
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Textile Engineering × Tech Enthusiast
          </motion.div>

          {/* Hero heading — masked reveal with aurora accent */}
          <div className="mt-6 sm:mt-8">
            <TextRevealMask
              as="h1"
              splitBy="lines"
              className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
              viewportMargin="0px"
              delay={0.08}
            >
              I bridge the gap between{" "}
              <strong>textile engineering</strong> and{" "}
              <strong>modern computer technology.</strong>
            </TextRevealMask>
          </div>

          {/* Sub text — word blur stagger */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={smoothTransition(0.55)}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            From optimizing production lines on the sewing floor to designing
            interfaces with custom tools — I help build better products, whether
            they&apos;re made of cotton, pixels, or a little bit of both.
          </motion.p>

          {/* CTAs — staggered spring scale */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.12,
                  delayChildren: 0.72,
                },
              },
            }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.92 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={TRANSITIONS.spring}
            >
              <Magnetic
                intensity={0.4}
                range={80}
                springOptions={{ stiffness: 200, damping: 15, mass: 0.3 }}
              >
                <Link
                  href="#designs"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-violet-500 to-sky-500 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 sm:w-auto"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-sky-500 via-indigo-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                  <span className="relative z-10">Explore My Work</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.92 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={TRANSITIONS.spring}
            >
              <Magnetic
                intensity={0.4}
                range={80}
                springOptions={{ stiffness: 200, damping: 15, mass: 0.3 }}
              >
                <Link
                  href="/blog"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/70 bg-white/80 px-6 py-3.5 text-sm font-medium text-slate-800 backdrop-blur holo-border transition-all hover:shadow-lg hover:shadow-indigo-500/10 sm:w-auto"
                >
                  Read My Articles
                  <BookOpen className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smoothTransition(0.95)}
            className="mt-5 inline-flex items-center gap-1.5 text-xs text-slate-500"
          >
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            Based in {profile.location} · Available for select collaborations
          </motion.div>

          {/* Stat tiles — holographic glass */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.08,
                  delayChildren: 0.9,
                },
              },
            }}
            className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 rounded-3xl border border-white/70 bg-white/65 p-4 shadow-xl shadow-indigo-500/10 backdrop-blur-xl holo-border sm:grid-cols-4 sm:p-5"
          >
            {statItems.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={VARIANTS.scaleUp}
                transition={{ ...TRANSITIONS.spring, delay: i * 0.06 }}
                className={`flex flex-col items-center justify-center p-2 text-center${i > 0 ? " border-l border-slate-200/70" : ""}`}
              >
                <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  <span className="gradient-text">
                    <NumberTicker value={stat.value} delay={stat.delay} />
                    {stat.suffix}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Focus cards — staggered slideRight entrance */}
        <StaggerReveal
          stagger={0.1}
          delay={1.0}
          as="div"
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {labels.map(({ title, icon: Icon, tone }) => {
            const toneStyles = {
              indigo:
                "from-indigo-500/10 via-white to-indigo-500/5 border-indigo-100 text-indigo-700",
              slate:
                "from-slate-500/10 via-white to-slate-500/5 border-slate-200 text-slate-700",
              sky: "from-sky-500/10 via-white to-sky-500/5 border-sky-100 text-sky-700",
            }[tone];
            return (
              <motion.div
                key={title}
                variants={VARIANTS.slideRight}
                transition={TRANSITIONS.default}
              >
                <SpotlightCard
                  glowColor={
                    tone === "indigo"
                      ? "rgba(99, 102, 241, 0.12)"
                      : tone === "sky"
                        ? "rgba(14, 165, 233, 0.10)"
                        : "rgba(100, 116, 139, 0.10)"
                  }
                  tiltStrength={6}
                  className={`group relative overflow-hidden rounded-2xl border border-white/70 bg-white/60 p-5 shadow-lg shadow-indigo-500/5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl glow-ring ${toneStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/80 ring-1 ring-black/5 holo-border">
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
              </motion.div>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}