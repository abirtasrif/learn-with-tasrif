// Sourced and adapted from 21st MCP: soralabs/text-reveal-mask
// A scroll-triggered text reveal that masks and slides words/lines up.

"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  isValidElement,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SPLIT_DEFAULTS = {
  lines: { duration: 0.8, stagger: 0.1 },
  words: { duration: 0.6, stagger: 0.07 },
  chars: { duration: 0.4, stagger: 0.015 },
};

const EXPO_OUT = [0.19, 1, 0.22, 1];
const WHITESPACE_RE = /\s+/;

function collectWords(node, emphasized = false) {
  if (typeof node === "string") {
    return node
      .split(WHITESPACE_RE)
      .filter(Boolean)
      .map((text) => ({ text, emphasized }));
  }
  if (Array.isArray(node)) {
    return node.flatMap((child) => collectWords(child, emphasized));
  }
  if (isValidElement(node)) {
    const nextEmphasis =
      emphasized || node.type === "strong" || node.type === "b";
    return collectWords(node.props.children, nextEmphasis);
  }
  return [];
}

function groupWordsByLine(measureNode) {
  const measureWords = measureNode.querySelectorAll("[data-measure-word]");
  if (measureWords.length === 0) return [[0]];
  const groups = [];
  let currentGroup = [];
  let lastTop = -1;
  for (const [index, node] of measureWords.entries()) {
    const top = node.offsetTop;
    if (lastTop !== -1 && top > lastTop + 1) {
      groups.push(currentGroup);
      currentGroup = [];
    }
    currentGroup.push(index);
    lastTop = top;
  }
  if (currentGroup.length > 0) groups.push(currentGroup);
  return groups.length > 0 ? groups : [[0]];
}

function SplitLine({ children }) {
  return (
    <span className="block overflow-hidden [backface-visibility:hidden]">
      {children}
    </span>
  );
}

function RevealTarget({ animate, children, delay, display = "inline-block", duration, yPercent }) {
  return (
    <motion.span
      animate={animate ? { y: "0%" } : { y: `${yPercent}%` }}
      className={`will-change-transform [backface-visibility:hidden] ${display === "block" ? "block" : "inline-block"}`}
      initial={{ y: `${yPercent}%` }}
      transition={{ duration, delay, ease: EXPO_OUT }}
    >
      {children}
    </motion.span>
  );
}

export function TextRevealMask({
  text,
  children,
  as: Tag = "p",
  splitBy = "lines",
  duration,
  stagger,
  yPercent = 110,
  delay = 0,
  once = true,
  viewportMargin = "0px 0px -20% 0px",
  className = "",
}) {
  const rootRef = useRef(null);
  const measureRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(rootRef, { once, margin: viewportMargin });
  const [lineGroups, setLineGroups] = useState(null);

  const content = text ?? children;
  const words = useMemo(() => collectWords(content), [content]);
  const wordsKey = useMemo(() => words.map((w) => w.text).join(""), [words]);

  const defaults = SPLIT_DEFAULTS[splitBy];
  const resolvedDuration = duration ?? defaults.duration;
  const resolvedStagger = stagger ?? defaults.stagger;

  useLayoutEffect(() => {
    const container = rootRef.current;
    const measureNode = measureRef.current;
    if (!container || !measureNode) return;
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      const w = container.clientWidth;
      if (w > 0) measureNode.style.width = `${w}px`;
      setLineGroups(groupWordsByLine(measureNode));
    };
    measure();
    document.fonts?.ready?.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => { cancelled = true; ro.disconnect(); };
  }, [wordsKey]);

  const wordStaggerMap = useMemo(() => {
    const map = new Map();
    let idx = 0;
    (lineGroups ?? []).forEach((group) => {
      group.forEach((wi) => { map.set(wi, idx++); });
    });
    return map;
  }, [lineGroups]);

  const shouldAnimate = isInView && lineGroups !== null && !prefersReducedMotion;
  const isReady = lineGroups !== null && lineGroups.length > 0;
  const Component = Tag;

  if (prefersReducedMotion) {
    return (
      <div className="w-full" ref={rootRef}>
        <Component className={className}>{content}</Component>
      </div>
    );
  }

  // Measure layer (invisible, for line detection)
  const measureLayer = (
    <div
      aria-hidden
      className="pointer-events-none invisible fixed top-0 left-[-9999px] block"
      ref={measureRef}
    >
      {words.map((word, i) => (
        <span
          className="inline-block"
          data-measure-word
          key={i}
        >
          {word.text}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </div>
  );

  let splitContent = null;

  if (isReady && splitBy === "lines") {
    splitContent = lineGroups.map((group, li) => (
      <SplitLine key={li}>
        <RevealTarget
          animate={shouldAnimate}
          delay={delay + li * resolvedStagger}
          display="block"
          duration={resolvedDuration}
          yPercent={yPercent}
        >
          {group.map((wi) => {
            const word = words[wi];
            if (!word) return null;
            return (
              <span
                key={wi}
                className={`inline-block${wi < words.length - 1 ? " me-[0.25em]" : ""}${word.emphasized ? " font-semibold" : ""}`}
              >
                {word.text}
              </span>
            );
          })}
        </RevealTarget>
      </SplitLine>
    ));
  } else if (isReady && splitBy === "words") {
    splitContent = lineGroups.map((group, li) => (
      <SplitLine key={li}>
        {group.map((wi) => {
          const word = words[wi];
          if (!word) return null;
          return (
            <RevealTarget
              animate={shouldAnimate}
              className={`split-word${wi < words.length - 1 ? " me-[0.25em]" : ""}`}
              delay={delay + (wordStaggerMap.get(wi) ?? 0) * resolvedStagger}
              duration={resolvedDuration}
              key={wi}
              yPercent={yPercent}
            >
              {word.emphasized ? <strong>{word.text}</strong> : word.text}
            </RevealTarget>
          );
        })}
      </SplitLine>
    ));
  }

  return (
    <div className="relative w-full" ref={rootRef}>
      {measureLayer}
      <Component
        aria-label={words.map((w) => w.text).join(" ")}
        className={`block [overflow-wrap:break-word] [transform:translateZ(0)] ${!isReady ? "invisible" : ""} ${className}`}
      >
        {splitContent}
      </Component>
    </div>
  );
}

export default TextRevealMask;
