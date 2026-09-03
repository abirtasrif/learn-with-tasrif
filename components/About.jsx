"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowDown,
  Building2,
  GraduationCap,
} from "lucide-react";
import profile from "../data/profile.json";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={transition}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                About
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                A professional journey from{" "}
                <span className="gradient-text">fabric</span> to{" "}
                <span className="gradient-text">frontend</span>.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                {profile.bio}
              </p>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Education
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {profile.education}
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {profile.experience.map((role) => (
                    <div
                      key={role.company}
                      className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                    >
                      <div className="flex items-center gap-2 text-slate-500">
                        <Building2 className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-[0.16em]">
                          {role.era}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        {role.role} · {role.company}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.1 }}
              className="relative"
            >
              <div className="sticky top-24">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Professional Journey
                  </p>
                </div>

                <ol className="relative mt-6 border-l border-slate-200 pl-8">
                  {profile.journey.map((item, i) => (
                    <motion.li
                      key={item.step}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        ...transition,
                        delay: 0.16 + i * 0.08,
                      }}
                      className="relative pb-10 last:pb-0"
                    >
                      <span className="absolute -left-[42px] top-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-slate-200">
                        {item.step}
                      </span>
                      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur transition-all hover:border-slate-300 hover:bg-white">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                            {item.title}
                          </h3>
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                            {item.era}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {item.description}
                        </p>
                      </div>
                      {i < profile.journey.length - 1 && (
                        <span className="absolute -left-[30px] top-12 text-slate-300">
                          <ArrowDown className="h-4 w-4" />
                        </span>
                      )}
                    </motion.li>
                  ))}
                </ol>

                <div className="mt-8 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
                    Specialties
                  </p>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {profile.specialties.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
