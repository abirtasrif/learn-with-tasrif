"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
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

export default function BlogPreview() {
  const [active, setActive] = useState("All");
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

  const [featured, ...rest] = filtered;

  return (
    <section id="blog-preview" className="relative py-24 sm:py-32">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-slate-50/60 via-white to-white"
        aria-hidden="true"
      />

      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={baseTransition}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Writing & Articles
            </p>
            <div className="mt-4">
              <TextRevealMask
                as="h2"
                splitBy="words"
                className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
                viewportMargin="0px 0px -15% 0px"
              >
                Field notes from the factory floor and the editor.
              </TextRevealMask>
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Practical guides, deep dives, and honest lessons learned about
              manufacturing, quality, and building modern web products.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filter blog posts by category"
          >
            <LayoutGroup id="blog-tabs">
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
                        layoutId="blog-tab-pill"
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
        </motion.div>

        <motion.div layout className="mt-14">
          <AnimatePresence mode="popLayout">
            {featured ? (
              <motion.div
                key={`grid-${active}`}
                layout
                initial="initial"
                animate={inView ? "animate" : "initial"}
                variants={{
                  initial: {},
                  animate: {
                    transition: { staggerChildren: reduceMotion ? 0 : 0.06 },
                  },
                }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-12"
              >
                {/* Featured article */}
                <motion.article
                  variants={{
                    initial: { opacity: 0, y: 28, scale: 0.97 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={baseTransition}
                  className="lg:col-span-7"
                >
                  <SpotlightCard
                    cursorLabel="READ"
                    glowColor="rgba(99, 102, 241, 0.12)"
                    tiltStrength={5}
                    className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-2xl glow-ring"
                  >
                    <Link href={`/blog/${featured.slug}`} className="block">
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 lg:aspect-16/10">
                        <div
                          role="img"
                          aria-label={featured.title}
                          className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-white"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.2),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(148,163,184,0.25),transparent_55%)]"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-slate-900/0 transition-all duration-500 group-hover:bg-slate-900/10" />

                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset ${categoryTone(
                                featured.category,
                              )}`}
                            >
                              {featured.category}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-slate-600 backdrop-blur ring-1 ring-slate-200">
                              <CalendarDays className="h-3 w-3" />
                              {formatDate(featured.date)}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-slate-600 backdrop-blur ring-1 ring-slate-200">
                              <Clock className="h-3 w-3" />
                              {featured.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 sm:p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Featured Article
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
                          {featured.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-slate-600">
                          {featured.excerpt}
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700">
                          Read the article
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </SpotlightCard>
                </motion.article>

                {/* Secondary articles */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5">
                  {rest.slice(0, 4).map((post) => (
                    <motion.article
                      key={post.slug}
                      variants={{
                        initial: { opacity: 0, y: 22 },
                        animate: { opacity: 1, y: 0 },
                      }}
                      transition={baseTransition}
                    >
                      <SpotlightCard
                        cursorLabel="READ"
                        glowColor="rgba(99, 102, 241, 0.10)"
                        tiltStrength={4}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg glow-ring"
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex flex-1 flex-col"
                        >
                          <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                            <div
                              role="img"
                              aria-label={post.title}
                              className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-white"
                            />
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(148,163,184,0.25),transparent_55%)]"
                            />
                            {/* Hover tint */}
                            <div className="absolute inset-0 bg-slate-900/0 transition-all duration-500 group-hover:bg-slate-900/10" />
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
                          <div className="flex flex-1 flex-col p-5">
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
                            <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight text-slate-900">
                              {post.title}
                            </h3>
                            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                              {post.excerpt}
                            </p>
                            <div className="mt-auto pt-4">
                              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors group-hover:text-indigo-700">
                                Read article
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </SpotlightCard>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500"
              >
                No articles in this category yet.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...baseTransition, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
