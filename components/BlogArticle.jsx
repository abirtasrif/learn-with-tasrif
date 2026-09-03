"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
} from "lucide-react";

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

export default function BlogArticle({ post, related = [] }) {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

  return (
    <article className="relative pb-24 pt-14 sm:pb-32 sm:pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </motion.div>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.05 }}
            className="mx-auto flex flex-wrap items-center justify-center gap-2"
          >
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset ${categoryTone(
                post.category
              )}`}
            >
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
              <CalendarDays className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            className="mt-6 text-3xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600"
          >
            {post.excerpt}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.22 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
            <div
              role="img"
              aria-label={post.title}
              className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-white"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(148,163,184,0.3),transparent_55%)]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em]">
                  Cover Image
                </p>
                <p className="text-sm font-medium">{post.category}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.28 }}
          className="mx-auto mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
        >
          <aside className="lg:col-span-3">
            <div className="sticky top-28 space-y-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  In this article
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {[
                    "Overview",
                    "Key ideas",
                    "Practical examples",
                    "What to do next",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      <span className="flex-1">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Enjoyed this article?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Share it with a colleague in manufacturing or engineering —
                  it&apos;s how the writing keeps getting better.
                </p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="prose prose-slate max-w-none text-slate-800 prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-base prose-p:leading-[1.85] prose-p:text-slate-700 prose-strong:text-slate-900 prose-h2:text-2xl prose-h3:text-xl">
              {post.content.split("\n\n").map((paragraph, idx) => (
                <p
                  key={idx}
                  className="mb-6 text-base leading-[1.9] text-slate-700 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}

              <h2 className="mt-14 text-2xl font-semibold tracking-tight text-slate-900">
                Key takeaways
              </h2>
              <ul className="mt-5 space-y-3 text-slate-700">
                {[
                  "Start from the problem you are trying to solve, not the tool you want to use.",
                  "Measure the baseline first — most improvement ideas fail without one.",
                  "Close the loop: review, write down what you learned, and share it.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                    <span className="text-base leading-relaxed sm:text-lg">{t}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-14 text-2xl font-semibold tracking-tight text-slate-900">
                Thanks for reading
              </h2>
              <p className="mt-5 text-base leading-[1.9] text-slate-700 sm:text-lg">
                If you found this article useful, you&apos;ll probably enjoy
                the rest of the writing in this category — a mix of practical
                field notes and framework-agnostic engineering ideas.
              </p>
            </div>
          </div>
        </motion.div>

        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.34 }}
            aria-label="Related articles"
            className="mx-auto mt-24 max-w-5xl"
          >
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                  Keep reading
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Related articles in <span className="gradient-text">{post.category}</span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-indigo-700 sm:inline-flex sm:items-center sm:gap-1.5"
              >
                All articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                    <div
                      role="img"
                      aria-label={r.title}
                      className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-white"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(148,163,184,0.25),transparent_55%)]"
                    />
                    <div className="absolute left-3 top-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset ${categoryTone(
                          r.category
                        )}`}
                      >
                        {r.category}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-1 flex-col">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(r.date)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {r.readTime}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold leading-snug text-slate-900 group-hover:text-indigo-700">
                      {r.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {r.excerpt}
                    </p>
                    <div className="mt-auto pt-5">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700">
                        Read article
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </article>
  );
}
