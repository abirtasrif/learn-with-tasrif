"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDown,
  Award,
  Briefcase,
  Building2,
  GraduationCap,
} from "lucide-react";
import { useRef } from "react";
import profile from "../data/profile.json";
import { ScrollReveal, StaggerReveal, TRANSITIONS, VARIANTS } from "./ui/ScrollReveal";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextRevealMask } from "./ui/TextRevealMask";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const transition = reduceMotion
    ? { duration: 0 }
    : TRANSITIONS.default;

  // Handle education data safely (supports array or legacy single string, capped at 3 items)
  const educationItems = Array.isArray(profile.education)
    ? profile.education.slice(0, 3)
    : Array.isArray(profile.educationList)
      ? profile.educationList.slice(0, 3)
      : profile.education
        ? [{ degree: profile.education }]
        : [];

  // Handle certifications / training data safely
  const certifications = profile.certifications || profile.trainings || [];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* Background blobs — with float animations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-indigo-100/30 blur-3xl animate-float-b" />
        <div className="absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-violet-100/20 blur-3xl animate-float-c" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16"
        >
          {/* Left col — slides in from left */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="slideLeft" viewOptions={{ margin: "-80px" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                About
              </p>
              <div className="mt-4">
                <TextRevealMask
                  as="h2"
                  splitBy="words"
                  className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
                  viewportMargin="0px 0px -15% 0px"
                >
                  A professional journey from technology to textile.
                </TextRevealMask>
              </div>
              <ScrollReveal variant="fadeUp" delay={0.3} viewOptions={{ margin: "-80px" }}>
                <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {profile.bio}
                </p>
              </ScrollReveal>

              {/* Education & Roles Spotlight Card */}
              <ScrollReveal variant="scaleUp" delay={0.45} viewOptions={{ margin: "-80px" }}>
                <SpotlightCard
                  className="group mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm glow-ring"
                  tiltStrength={4}
                  glowColor="rgba(99, 102, 241, 0.10)"
                >
                  {/* Education Header */}
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Education
                      </p>
                    </div>
                  </div>

                  {/* Education Items List — staggered */}
                  <StaggerReveal stagger={0.08} delay={0.55} className="mt-4 space-y-3" viewOptions={{ margin: "-40px" }}>
                    {educationItems.map((edu, idx) => (
                      <motion.div
                        key={idx}
                        variants={VARIANTS.fadeUp}
                        transition={TRANSITIONS.default}
                        className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors hover:bg-slate-50"
                      >
                        <p className="text-sm font-semibold text-slate-800">
                          {typeof edu === "string" ? edu : edu.degree}
                        </p>
                        {edu.institution && (
                          <p className="mt-1 text-xs text-slate-500">
                            {edu.institution} {edu.year ? `· ${edu.year}` : ""}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </StaggerReveal>

                  {/* Current Roles Header */}
                  <div className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                      <Briefcase className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Current Roles
                      </p>
                    </div>
                  </div>

                  {/* Experience Roles List — staggered */}
                  <StaggerReveal stagger={0.09} delay={0.7} className="mt-4 flex flex-col gap-3" viewOptions={{ margin: "-40px" }}>
                    {profile.experience.map((role) => (
                      <motion.div
                        key={role.company}
                        variants={VARIANTS.scaleUp}
                        transition={TRANSITIONS.default}
                        className="w-full rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:bg-slate-50"
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
                      </motion.div>
                    ))}
                  </StaggerReveal>
                </SpotlightCard>
              </ScrollReveal>

              {/* Training & Certifications */}
              <ScrollReveal variant="scaleUp" delay={0.6} viewOptions={{ margin: "-80px" }}>
                <SpotlightCard
                  className="group mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm glow-ring"
                  tiltStrength={4}
                  glowColor="rgba(99, 102, 241, 0.10)"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                      <Award className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Training & Certifications
                      </p>
                    </div>
                  </div>

                  <StaggerReveal stagger={0.07} delay={0.7} className="mt-4 flex flex-col gap-3" viewOptions={{ margin: "-40px" }}>
                    {certifications.map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={VARIANTS.fadeUp}
                        transition={TRANSITIONS.default}
                        className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors hover:bg-slate-50"
                      >
                        <p className="text-sm font-semibold text-slate-800">
                          {typeof item === "string" ? item : item.title}
                        </p>
                        {item.issuer && (
                          <p className="mt-1 text-xs text-slate-500">
                            {item.issuer} {item.year ? `· ${item.year}` : ""}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </StaggerReveal>
                </SpotlightCard>
              </ScrollReveal>
            </ScrollReveal>
          </div>

          {/* Right col — timeline & specialties, slides from right */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="slideRight" delay={0.1} viewOptions={{ margin: "-80px" }}>
              <div className="sticky top-24 space-y-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Professional Journey
                    </p>
                  </div>

                  {/* Timeline with draw-in border */}
                  <ol className="relative mt-6 pl-8">
                    {/* Animated vertical line */}
                    {inView && !reduceMotion && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 animate-line-draw"
                      />
                    )}
                    {!inView && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 bottom-0 w-px bg-slate-200"
                      />
                    )}

                    {profile.journey.map((item, i) => (
                      <motion.li
                        key={item.step}
                        initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                        animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                        transition={{
                          ...TRANSITIONS.default,
                          delay: 0.25 + i * 0.12,
                        }}
                        className="relative pb-10 last:pb-0"
                      >
                        {/* Step number — spring pop */}
                        <motion.span
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            ...TRANSITIONS.spring,
                            delay: 0.2 + i * 0.12,
                          }}
                          className="absolute -left-10.5 top-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-slate-200"
                        >
                          {item.step}
                        </motion.span>

                        <SpotlightCard
                          className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur transition-all hover:border-slate-300 hover:bg-white glow-ring"
                          tiltStrength={3}
                          glowColor="rgba(99, 102, 241, 0.08)"
                        >
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
                        </SpotlightCard>

                        {i < profile.journey.length - 1 && (
                          <span className="absolute -left-7.5 top-12 text-slate-300">
                            <ArrowDown className="h-4 w-4" />
                          </span>
                        )}
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* Specialties Section */}
                <ScrollReveal
                  variant="scaleUp"
                  delay={0.2 + profile.journey.length * 0.12}
                  viewOptions={{ margin: "-80px" }}
                  className="rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50/80 via-white to-white p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
                    Specialties
                  </p>
                  <StaggerReveal
                    stagger={0.05}
                    delay={0.1}
                    as="ul"
                    className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2"
                    viewOptions={{ margin: "-40px" }}
                  >
                    {profile.specialties.map((s) => (
                      <motion.li
                        key={s}
                        variants={VARIANTS.fadeUp}
                        transition={TRANSITIONS.default}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        {s}
                      </motion.li>
                    ))}
                  </StaggerReveal>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
