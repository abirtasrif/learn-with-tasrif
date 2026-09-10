"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock, Play, PlayCircle, X } from "lucide-react";
import { useRef, useState } from "react";
import videos from "../data/videos.json";
import { SpotlightCard } from "./ui/SpotlightCard";
import { TextRevealMask } from "./ui/TextRevealMask";

function VideoThumb({ video, playing, onPlay }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play video: ${video.title}`}
      data-cursor-label="PLAY"
      className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="relative aspect-video w-full bg-linear-to-br from-slate-200 via-slate-100 to-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(15,23,42,0.14),transparent_55%)]"
        />
        {/* Play button with pulse ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-md ring-1 ring-slate-200 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:ring-indigo-500 group-hover:shadow-indigo-200/60 group-hover:shadow-xl">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 pulse-ring"
            />
            <Play className="h-6 w-6 translate-x-0.5" />
          </span>
        </div>

        {/* Top badges */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700 backdrop-blur ring-1 ring-slate-200">
            {video.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            <Clock className="h-3 w-3" />
            {video.duration}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-slate-900/0 transition-all duration-500 group-hover:bg-slate-900/10" />
      </div>

      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            {playing ? "Now playing" : "Tutorial · Lesson"}
          </p>
          <h3 className="mt-1 text-base font-semibold leading-snug text-slate-900 sm:text-lg">
            {video.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {video.description}
          </p>
        </div>
        <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}

export default function VideoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const baseTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.22, 1, 0.36, 1] };
  const [active, setActive] = useState(null);

  const featured = videos.find((v) => v.featured) || videos[0];
  const rest = videos.filter((v) => v.id !== featured.id).slice(0, 4);

  return (
    <section id="videos" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 mx-auto h-64 max-w-6xl bg-linear-to-b from-indigo-50/60 to-transparent blur-3xl"
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
              Video Learning
            </p>
            <div className="mt-4">
              <TextRevealMask
                as="h2"
                splitBy="words"
                className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
                viewportMargin="0px 0px -15% 0px"
              >
                Practical tutorials on fashion tech and computer applications.
              </TextRevealMask>
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Long-form lessons that blend theory with real-world workflows —
              from Basic computer literacy to advanced complex projects.
            </p>
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-800 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
          >
            View full channel
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Featured video */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={baseTransition}
            className="lg:col-span-7"
          >
            <SpotlightCard
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm glow-ring"
              tiltStrength={3}
              glowColor="rgba(99, 102, 241, 0.10)"
            >
              {active?.id === featured.id ? (
                <div className="relative aspect-video w-full bg-black">
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm ring-1 ring-slate-200"
                    aria-label="Close player"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <iframe
                    title={featured.title}
                    src={`https://www.youtube-nocookie.com/embed/${featured.youtubeId}?autoplay=1&rel=0`}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              ) : (
                <VideoThumb
                  video={featured}
                  onPlay={() => setActive(featured)}
                  playing={false}
                />
              )}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                    <PlayCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Featured lesson
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {featured.title}
                    </p>
                  </div>
                </div>
                <a
                  href={featured.youtubeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800"
                >
                  Watch on YouTube
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Smaller videos */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5">
            {rest.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...baseTransition, delay: 0.08 + i * 0.06 }}
              >
                {active?.id === video.id ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActive(null)}
                      className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm ring-1 ring-slate-200"
                      aria-label="Close player"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <iframe
                      title={video.title}
                      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <VideoThumb
                    video={video}
                    onPlay={() => setActive(video)}
                    playing={false}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
