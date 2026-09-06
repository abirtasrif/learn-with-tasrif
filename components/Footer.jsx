"use client";

import Link from "next/link";
import profile from "../data/profile.json";
import { Magnetic } from "./ui/Magnetic";

function GitHubIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
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

const columns = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Designs", href: "#designs" },
      { label: "Videos", href: "#videos" },
    ],
  },
  {
    title: "Content",
    links: [
      { label: "Blog", href: "/blog" },
      {
        label: "Industrial Engineering",
        href: "/blog?cat=Industrial+Engineering",
      },
      { label: "Textile Quality", href: "/blog?cat=Textile+Quality" },
      { label: "Web Development", href: "/blog?cat=Web+Development" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: `mailto:${profile.email}` },
      { label: "LinkedIn", href: profile.socials.linkedin, external: true },
      { label: "GitHub", href: profile.socials.github, external: true },
      { label: "YouTube", href: profile.socials.youtube, external: true },
    ],
  },
];

const socials = [
  { label: "GitHub", href: profile.socials.github, icon: GitHubIcon },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedInIcon },
  { label: "YouTube", href: profile.socials.youtube, icon: YouTubeIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-indigo-500 text-sm font-semibold text-white shadow-sm shadow-indigo-200">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold tracking-tight text-slate-900">
                  {profile.name}
                </span>
                <span className="text-xs text-slate-500">
                  {profile.headline}
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600">
              Working at the intersection of textile engineering, industrial
              engineering, garment technology, and modern web development.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <Magnetic key={label} intensity={0.4} range={60}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-sm"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noreferrer noopener" : undefined}
                        className="text-sm text-slate-700 transition-colors hover:text-indigo-700"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Designed & built with Next.js, Tailwind CSS, and a lot of strong
            coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}
