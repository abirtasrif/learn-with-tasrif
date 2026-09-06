"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Check,
  Code2,
  Factory,
  ImageIcon,
  LayoutDashboard,
  Palette,
  PenTool,
  Ruler,
  ShieldCheck,
  Shirt,
  Table,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import tools from "../data/tools.json";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextRevealMask } from "./ui/TextRevealMask";

const iconMap = {
  shirt: Shirt,
  ruler: Ruler,
  "pen-tool": PenTool,
  image: ImageIcon,
  table: Table,
  factory: Factory,
  "shield-check": ShieldCheck,
  "code-2": Code2,
  "layout-dashboard": LayoutDashboard,
  palette: Palette,
};

const tabs = [
  { key: "All", label: "All" },
  { key: "Textile & Fashion", label: "Textile & Fashion" },
  { key: "Design", label: "Design" },
  { key: "Engineering", label: "Engineering" },
  { key: "Development", label: "Development" },
  { key: "Productivity", label: "Productivity" },
];

export default function Skills() {
  const [active, setActive] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const baseTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

  const filtered = useMemo(
    () =>
      active === "All"
        ? tools
        : tools.filter((t) => t.categoryGroup === active),
    [active],
  );

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-white via-slate-50 to-white"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-1/4 h-96 w-72 rounded-full bg-violet-100/25 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={baseTransition}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Skills & Tools
          </p>
          <div className="mt-4">
            <TextRevealMask
              as="h2"
              splitBy="words"
              className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
              viewportMargin="0px 0px -15% 0px"
            >
              A toolkit built across the factory floor and the codebase.
            </TextRevealMask>
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            From 3D garment simulation to component-driven interfaces — a
            curated set of tools I rely on every day.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...baseTransition, delay: 0.15 }}
          className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Filter tools by category"
        >
          <LayoutGroup id="skills-tabs">
            {tabs.map((tab) => {
              const selected = tab.key === active;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(tab.key)}
                  className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none ${
                    selected
                      ? "text-slate-900"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="skills-tab-pill"
                      className="absolute inset-0 rounded-xl bg-white shadow-sm ring-1 ring-slate-200"
                      transition={baseTransition}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="mt-12">
          <AnimatePresence mode="popLayout">
            <motion.ul
              key={active}
              layout
              initial="initial"
              animate={inView ? "animate" : "initial"}
              variants={{
                initial: {},
                animate: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.04,
                  },
                },
              }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((tool) => {
                const Icon = iconMap[tool.icon] || Code2;
                return (
                  <motion.li
                    key={tool.name}
                    layout
                    variants={{
                      initial: { opacity: 0, y: 18 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -10, scale: 0.97 },
                    }}
                    transition={baseTransition}
                  >
                    <SpotlightCard
                      className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg glow-ring"
                      tiltStrength={5}
                      glowColor="rgba(99, 102, 241, 0.12)"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-slate-50 to-white text-indigo-600 ring-1 ring-slate-200">
                            <Icon className="h-6 w-6" />
                          </span>
                          <div>
                            <h3 className="text-base font-semibold text-slate-900">
                              {tool.name}
                            </h3>
                            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                              {tool.category}
                            </p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700 ring-1 ring-inset ring-indigo-100">
                          <Check className="h-3 w-3" />
                          {tool.label}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-slate-600">
                        {tool.description}
                      </p>

                      {/* Animated skill bar */}
                      <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                          <span>Skill level</span>
                          <span className="font-medium text-slate-700">
                            {tool.level}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${tool.level}%` } : {}}
                            transition={{
                              ...baseTransition,
                              delay: 0.4,
                              duration: 0.8,
                            }}
                            className="h-full rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-indigo-400"
                            role="progressbar"
                            aria-valuenow={tool.level}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${tool.name} skill level`}
                          />
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
