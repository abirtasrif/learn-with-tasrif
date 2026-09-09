"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  BookOpen,
  Briefcase,
  Home,
  Layers,
  Mail,
  User,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * FloatingDock — inspired by 21st.dev (aceternity/floating-dock, dillionverma/dock)
 * Interactive macOS-style magnifying dock with spring physics.
 */
const dockItems = [
  { title: "Home", icon: Home, href: "/#home" },
  { title: "About", icon: User, href: "/#about" },
  { title: "Skills", icon: Briefcase, href: "/#skills" },
  { title: "Designs", icon: Layers, href: "/#designs" },
  { title: "Videos", icon: Video, href: "/#videos" },
  { title: "Articles", icon: BookOpen, href: "/blog" },
  { title: "Contact", icon: Mail, href: "/#contact" },
];

function DockIcon({ mouseX, item }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [42, 60, 42]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 160,
    damping: 12,
  });

  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center rounded-2xl bg-white/90 shadow-sm ring-1 ring-slate-200/80 transition-colors hover:bg-white hover:ring-indigo-300 dark:bg-slate-900/90 dark:ring-slate-800"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white shadow-md ring-1 ring-white/10"
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>

      <Link
        href={item.href}
        className="flex h-full w-full items-center justify-center text-slate-600 transition-colors hover:text-indigo-600 focus-visible:outline-none"
        aria-label={item.title}
      >
        <Icon className="h-5 w-5" />
      </Link>
    </motion.div>
  );
}

export function FloatingDock({ className = "" }) {
  const mouseX = useMotionValue(Infinity);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal dock once user has scrolled past hero top (e.g. 180px)
      if (window.scrollY > 180) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: 24, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 24, x: "-50%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          aria-label="Floating quick navigation"
          className={`fixed bottom-6 left-1/2 z-40 hidden sm:flex items-end gap-2.5 rounded-3xl border border-slate-200/80 bg-white/70 px-3.5 py-2.5 shadow-xl backdrop-blur-xl ring-1 ring-black/5 ${className}`}
        >
          {dockItems.map((item) => (
            <DockIcon key={item.title} mouseX={mouseX} item={item} />
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default FloatingDock;
