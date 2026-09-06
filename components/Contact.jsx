"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Link2, Mail } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef } from "react";
import profile from "../data/profile.json";
import { Magnetic } from "./ui/Magnetic";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextRevealMask } from "./ui/TextRevealMask";

// Safe SVG Brand Icons to avoid Lucide import issues
function LinkedInIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function YouTubeIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const baseTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

  const userEmail = profile?.email || "abirtasrif@engineer.com";
  const userLinkedin =
    profile?.socials?.linkedin || "https://www.linkedin.com/in/abirtasrif";
  const userGithub =
    profile?.socials?.github || "https://github.com/abirtasrif";
  const userYoutube =
    profile?.socials?.youtube || "https://www.youtube.com/@learn_with_tasrif";

  const channels = useMemo(
    () => [
      {
        label: "Email Me",
        detail: userEmail,
        href: `mailto:${userEmail}`,
        IconComponent: Mail,
        tone: "indigo",
      },
      {
        label: "Connect on LinkedIn",
        detail: "Let's keep in touch professionally",
        href: userLinkedin,
        IconComponent: LinkedInIcon,
        tone: "sky",
      },
      {
        label: "View GitHub",
        detail: "Code, projects, and experiments",
        href: userGithub,
        IconComponent: GitHubIcon,
        tone: "slate",
      },
      {
        label: "Subscribe on YouTube",
        detail: "Learn with Tasrif",
        href: userYoutube,
        IconComponent: YouTubeIcon,
        tone: "rose",
      },
    ],
    [userEmail, userLinkedin, userGithub, userYoutube],
  );

  const toneStyles = {
    indigo: {
      card: "from-indigo-50/80 via-white to-white border-indigo-100",
      icon: "bg-indigo-50 text-indigo-600 ring-indigo-100",
      arrow: "text-indigo-700",
      glow: "rgba(99, 102, 241, 0.12)",
    },
    sky: {
      card: "from-sky-50/80 via-white to-white border-sky-100",
      icon: "bg-sky-50 text-sky-600 ring-sky-100",
      arrow: "text-sky-700",
      glow: "rgba(14, 165, 233, 0.12)",
    },
    slate: {
      card: "from-slate-50/80 via-white to-white border-slate-200",
      icon: "bg-slate-100 text-slate-700 ring-slate-200",
      arrow: "text-slate-800",
      glow: "rgba(100, 116, 139, 0.10)",
    },
    rose: {
      card: "from-rose-50/80 via-white to-white border-rose-100",
      icon: "bg-rose-50 text-rose-600 ring-rose-100",
      arrow: "text-rose-700",
      glow: "rgba(244, 63, 94, 0.12)",
    },
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_400px_at_50%_-20%,rgba(99,102,241,0.12),transparent_60%)]"
      />
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-4xl border border-slate-200 bg-linear-to-br from-white via-white to-slate-50 shadow-sm">
          <div className="grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:gap-16 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={baseTransition}
              className="lg:col-span-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                Contact
              </p>
              <div className="mt-4">
                <TextRevealMask
                  as="h2"
                  splitBy="words"
                  className="text-3xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
                  viewportMargin="0px 0px -15% 0px"
                >
                  Have a project, collaboration, or idea?
                </TextRevealMask>
              </div>
              <p className="mt-4 text-balance text-2xl font-medium leading-tight text-slate-700 sm:text-3xl">
                Let&apos;s build something useful.
              </p>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                I&apos;m selectively open to product development, consulting,
                and content collaborations — especially where textile domain
                knowledge meets thoughtful software.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic intensity={0.4} range={75}>
                  <Link
                    href={`mailto:${userEmail}`}
                    className="group inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-lg"
                  >
                    Start a conversation
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </Magnetic>
                <Magnetic intensity={0.4} range={75}>
                  <a
                    href={userLinkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 transition-all hover:border-slate-300 hover:bg-white hover:shadow-md"
                  >
                    <Link2 size={16} />
                    LinkedIn
                  </a>
                </Magnetic>
              </div>
            </motion.div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {channels.map((ch, i) => {
                  const Icon = ch.IconComponent;
                  const tone = toneStyles[ch.tone];
                  const external = ch.href.startsWith("http");
                  return (
                    <motion.div
                      key={ch.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        ...baseTransition,
                        delay: 0.08 + i * 0.06,
                      }}
                    >
                      <a
                        href={ch.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer noopener" : undefined}
                        className="block h-full"
                      >
                        <SpotlightCard
                          glowColor={tone.glow}
                          tiltStrength={5}
                          className={`group relative h-full overflow-hidden rounded-2xl border bg-linear-to-br p-6 shadow-sm transition-all hover:shadow-xl glow-ring ${tone.card}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <span
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ring-inset ${tone.icon}`}
                            >
                              <Icon className="h-6 w-6" />
                            </span>
                            <span
                              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/70 bg-white/80 transition-transform duration-300 group-hover:scale-110 ${tone.arrow}`}
                            >
                              <ArrowRight
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-x-0.5"
                              />
                            </span>
                          </div>
                          <div className="mt-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                              {ch.label}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">
                              {ch.detail}
                            </p>
                          </div>
                        </SpotlightCard>
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...baseTransition, delay: 0.32 }}
                className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Availability
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Currently working full-time at{" "}
                  <span className="font-semibold text-slate-900">
                    Jarvan IT
                  </span>
                  , and taking on a small number of freelance and content
                  projects each quarter. Typical response time: within 2 working
                  days.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
