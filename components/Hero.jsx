"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Layers3,
  MapPin,
  Sparkles,
} from "lucide-react";
import profile from "../data/profile.json";

const labels = [
  { title: "3D Garment Design", icon: Layers3, tone: "indigo" },
  { title: "Industrial Engineering", icon: Briefcase, tone: "slate" },
  { title: "Content & Tutorials", icon: BookOpen, tone: "sky" },
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-32 hidden h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl md:block"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8 sm:pb-32 sm:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-slate-600 backdrop-blur sm:text-[11px]"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Textile Engineering × Digital Technology
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.06 }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:mt-8 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            I bridge the gap between{" "}
            <span className="gradient-text">textile engineering</span> and{" "}
            <span className="gradient-text">modern web technology</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            From optimizing production lines on the sewing floor to designing
            interfaces with Next.js — I help build better products, whether
            they&apos;re made of cotton, pixels, or a little bit of both.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.18 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href="#designs"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-medium text-white shadow-sm ring-1 ring-slate-900/5 transition-all hover:bg-slate-800 hover:shadow-md sm:w-auto"
            >
              Explore My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/blog"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-medium text-slate-800 backdrop-blur transition-all hover:border-slate-300 hover:bg-white sm:w-auto"
            >
              Read My Articles
              <BookOpen className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: 0.26 }}
            className="mt-5 inline-flex items-center gap-1.5 text-xs text-slate-500"
          >
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            Based in {profile.location} · Available for select collaborations
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.32 }}
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
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.38 + i * 0.06 }}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-md ${toneStyles}`}
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
