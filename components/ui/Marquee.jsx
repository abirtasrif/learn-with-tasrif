"use client";

/**
 * Marquee — infinite ticker with pause on hover and edge fade masks.
 * Pure CSS animation, respects prefers-reduced-motion.
 */
export default function Marquee({
  items = [],
  speed = 40, // seconds for one loop
  direction = "left",
  pauseOnHover = true,
  className = "",
}) {
  const animStyle = {
    "--duration": `${speed}s`,
    animationPlayState: "var(--play-state, running)",
  };

  const containerClass = pauseOnHover ? "group" : "";

  return (
    <div
      className={`relative overflow-hidden ${containerClass} ${className}`}
      aria-hidden="true"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        className={`flex w-max gap-0 ${pauseOnHover ? "group-hover:[--play-state:paused]" : ""}`}
        style={{
          ...animStyle,
          animation: `marquee-${direction} var(--duration) linear infinite`,
        }}
      >
        {/* Two copies for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center gap-2 px-6 text-sm font-medium uppercase tracking-[0.2em] text-slate-400"
          >
            <span className="h-1 w-1 rounded-full bg-indigo-400" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
