"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useRef, useState } from "react";
import posts from "../data/posts.json";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextRevealMask } from "./ui/TextRevealMask";

const tabs = [
  { key: "All", label: "All" },
  { key: "Industrial Engineering", label: "Industrial Engineering" },
  { key: "Textile Quality", label: "Textile Quality" },
  { key: "Web Development", label: "Web Development" },
];

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function categoryTone(cat) {
  switch (cat) {
    case "Industrial Engineering":
      return "bg-amber-50 text-amber-700 ring-amber-200";
    case "Textile Quality":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "Web Development":
      return "bg-indigo-50 text-indigo-700 ring-indigo-200";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-200";
  }
}

function BlogListContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const validCat =
    catParam && tabs.some((t) => t.key === catParam) ? catParam : "All";

  const [active, setActive] = useState(validCat);
  const [prevCatParam, setPrevCatParam] = useState(catParam);

  // Sync state during render if URL query param changes without effect
  if (catParam !== prevCatParam) {
    setPrevCatParam(catParam);
    setActive(validCat);
  }

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const baseTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

  const sorted = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filtered = useMemo(() => {
    if (active === "All") return sorted;
    return sorted.filter((p) => p.category === active);
  }, [sorted, active]);

  return (
    <section className="relative pb-24 pt-14 sm:pb-32 sm:pt-20">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={baseTransition}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to home
          </Link>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...baseTransition, delay: 0.04 }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Blog
            </p>
            <div className="mt-4">
              <TextRevealMask
                as="h1"
                splitBy="words"
                className="text-3xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
                viewportMargin="0px"
              >
                Writing at the intersection of manufacturing, quality, and web
                craft.
              </TextRevealMask>
            </div>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Filter by topic to explore the full archive. All articles are
              based on hands-on experience from the factory floor and real
              software projects.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Filter blog posts by category"
            >
              <LayoutGroup id="blog-list-tabs">
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
                          layoutId="blog-list-tab-pill"
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
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Stats
              </p>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {[
                  {
                    label: "Articles",
                    value: posts.length.toString(),
                  },
                  {
                    label: "Topics",
                    value: new Set(
                      posts.map((p) => p.category),
                    ).size.toString(),
                  },
                  {
                    label: "Avg. read",
                    value: "8 min",
                  },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-semibold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.div layout>
              <AnimatePresence mode="popLayout">
                <motion.ul
                  key={active}
                  layout
                  initial="initial"
                  animate={inView ? "animate" : "initial"}
                  variants={{
                    initial: {},
                    animate: {
                      transition: { staggerChildren: reduceMotion ? 0 : 0.05 },
                    },
                  }}
                  className="space-y-5"
                >
                  {filtered.map((post) => (
                    <motion.li
                      key={post.slug}
                      layout
                      variants={{
                        initial: { opacity: 0, y: 18 },
                        animate: { opacity: 1, y: 0 },
                      }}
                      transition={baseTransition}
                    >
                      <SpotlightCard
                        cursorLabel="READ"
                        glowColor="rgba(99, 102, 241, 0.10)"
                        tiltStrength={3}
                        className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl glow-ring"
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group flex flex-col gap-6 p-6 sm:flex-row"
                        >
                          <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:aspect-4/3 sm:w-48">
                            <div
                              role="img"
                              aria-label={post.title}
                              className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-white"
                            />
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.2),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(148,163,184,0.25),transparent_55%)]"
                            />
                            <div className="absolute left-3 top-3">
                              <span
                                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset ${categoryTone(
                                  post.category,
                                )}`}
                              >
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                              <span className="inline-flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" />
                                {formatDate(post.date)}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {post.readTime}
                              </span>
                            </div>
                            <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-slate-900 group-hover:text-indigo-700 transition-colors">
                              {post.title}
                            </h2>
                            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                              {post.excerpt}
                            </p>
                            <div className="mt-auto pt-5">
                              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700">
                                Read article
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </SpotlightCard>
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>

              {filtered.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500"
                >
                  No articles in this category yet.
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BlogList() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading posts...</div>}
    >
      <BlogListContent />
    </Suspense>
  );
}
