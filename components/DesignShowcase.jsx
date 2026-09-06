"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import designs from "../data/designs.json";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextRevealMask } from "./ui/TextRevealMask";

const tabs = [
  { key: "All", label: "All" },
  { key: "CLO 3D", label: "CLO 3D" },
  { key: "Tech Packs", label: "Tech Packs" },
  { key: "Garment Design", label: "Garment Design" },
  { key: "Technical", label: "Technical" },
];

export default function DesignShowcase() {
  const [active, setActive] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const baseTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

  const filtered = useMemo(() => {
    const list =
      active === "All"
        ? designs
        : designs.filter((d) => d.categoryGroup === active);
    return list.sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [active]);

  return (
    <section id="designs" className="relative py-24 sm:py-32">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-64 w-full max-w-3xl -translate-x-1/2 bg-linear-to-b from-indigo-50/50 to-transparent blur-3xl" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={baseTransition}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Design Showcase
            </p>
            <div className="mt-4">
              <TextRevealMask
                as="h2"
                splitBy="words"
                className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
                viewportMargin="0px 0px -15% 0px"
              >
                Selected work across fashion tech and technical design.
              </TextRevealMask>
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              A mix of virtual garment simulations, production-ready tech packs,
              and technical drawings from real product development workflows.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...baseTransition, delay: 0.08 }}
            className="flex flex-wrap items-center gap-2 sm:justify-start lg:justify-end"
            role="tablist"
            aria-label="Filter design work by category"
          >
            <LayoutGroup id="design-tabs">
              {tabs.map((tab) => {
                const selected = tab.key === active;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(tab.key)}
                    className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                      selected
                        ? "text-slate-900"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="design-tab-pill"
                        className="absolute inset-0 rounded-xl bg-slate-900"
                        transition={baseTransition}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        selected ? "text-white" : ""
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </LayoutGroup>
          </motion.div>
        </div>

        <motion.div layout className="mt-14">
          <AnimatePresence mode="popLayout">
            <motion.ul
              key={active}
              layout
              initial="initial"
              animate={inView ? "animate" : "initial"}
              variants={{
                initial: {},
                animate: {
                  transition: { staggerChildren: reduceMotion ? 0 : 0.06 },
                },
              }}
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12"
            >
              {filtered.map((design, i) => {
                const spanCol =
                  design.size === "lg"
                    ? "lg:col-span-8"
                    : design.size === "md"
                      ? "lg:col-span-6"
                      : "lg:col-span-4";
                const spanRow =
                  design.size === "lg" ? "lg:row-span-2" : "lg:row-span-1";
                const featured = i === 0 && design.featured;
                return (
                  <motion.li
                    key={design.id}
                    layout
                    variants={{
                      initial: { opacity: 0, y: 28, scale: 0.97 },
                      animate: { opacity: 1, y: 0, scale: 1 },
                      exit: { opacity: 0, y: -10, scale: 0.97 },
                    }}
                    transition={baseTransition}
                    className={`${spanCol} ${spanRow}`}
                  >
                    <SpotlightCard
                      glowColor="rgba(99, 102, 241, 0.14)"
                      tiltStrength={6}
                      cursorLabel="VIEW"
                      className={`group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-2xl glow-ring ${
                        featured ? "ring-1 ring-indigo-100" : ""
                      }`}
                    >
                      {/* Image placeholder */}
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 sm:aspect-16/10 lg:aspect-auto lg:h-full lg:min-h-65">
                        <div
                          role="img"
                          aria-label={design.title}
                          className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-white"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(148,163,184,0.25),transparent_55%)]">
                          <div className="flex flex-col items-center gap-2 text-slate-400">
                            <Layers className="h-10 w-10" />
                            <span className="text-xs font-medium uppercase tracking-[0.24em]">
                              {design.category}
                            </span>
                          </div>
                        </div>

                        {/* Hover overlay */}
                        <motion.div
                          aria-hidden="true"
                          className="absolute inset-0 bg-slate-900/0 transition-all duration-500 group-hover:bg-slate-900/40"
                        />

                        {/* Badges */}
                        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700 backdrop-blur ring-1 ring-slate-200">
                            {design.category}
                          </span>
                          {design.featured && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                              {design.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                              {design.description}
                            </p>
                          </div>
                          <a
                            href="#"
                            aria-label={`Open case study for ${design.title}`}
                            onClick={(e) => e.preventDefault()}
                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                          <div className="flex flex-wrap gap-1.5">
                            {design.tools.map((t) => (
                              <span
                                key={t}
                                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs font-medium text-slate-500">
                            {design.year}
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
