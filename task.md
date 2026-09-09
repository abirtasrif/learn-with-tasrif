# Task List — Awwwards-Tier Upgrade

## Setup
- [x] Install lenis package
- [x] Update globals.css (Lenis rules, cursor utils, glow animations, shimmer borders)
- [x] Clean unused configuration in next.config.mjs

## New UI Components (components/ui/)
- [x] SmoothScroll.jsx (Lenis provider with RAF and smooth anchor navigation)
- [x] TextRevealMask.jsx (21st MCP soralabs/text-reveal-mask adapted with framer-motion)
- [x] Magnetic.jsx (21st MCP ibelick/magnetic with physics spring attraction)
- [x] SpotlightCard.jsx (3D tilt + cursor glow tracking)
- [x] CustomCursor.jsx (interactive floating cursor trailer with VIEW/PLAY states)
- [x] Marquee.jsx (infinite ribbon ticker with pause-on-hover)
- [x] ScrollProgress.jsx (top glowing progress bar)

## Layout & Page
- [x] app/layout.jsx (integrate providers + cursor)
- [x] app/page.jsx (add Marquee between Hero and About)

## Components
- [x] Hero.jsx (TextRevealMask, Magnetic CTAs, SpotlightCard focus cards)
- [x] About.jsx (masked reveals, animated timeline with SpotlightCards)
- [x] Skills.jsx (SpotlightCard for tools, animated gradient skill bars)
- [x] DesignShowcase.jsx (3D tilt, spotlight, cursor VIEW label)
- [x] VideoGrid.jsx (cursor PLAY label, pulsing play button ring)
- [x] BlogPreview.jsx (spotlight hover, masked reveals, READ cursor)
- [x] Contact.jsx (Magnetic + SpotlightCard on channels, TextRevealMask)
- [x] Navbar.jsx (Magnetic CTA & logo, smooth anchor links)
- [x] BlogList.jsx (fixed React 19 setState-in-effect warning, added SpotlightCard & TextRevealMask)
- [x] BlogArticle.jsx (TextRevealMask on article headings)
- [x] Footer.jsx (Magnetic wrappers on social icons)

## Verification
- [x] npm run lint — zero errors, zero warnings
- [x] npm run build — 100% successful compile in 644ms, all 14 routes statically generated

## 21st MCP Animation Upgrade
- [x] components/ui/BorderBeam.jsx (21st MCP dillionverma/border-beam with CSS offset-path keyframes)
- [x] components/ui/NumberTicker.jsx (21st MCP dillionverma/number-ticker with framer-motion spring physics)
- [x] components/ui/InteractiveParticles.jsx (21st MCP inspired canvas particle field with mouse attraction & off-screen IntersectionObserver)
- [x] components/ui/FloatingDock.jsx (21st MCP inspired macOS spring-magnified dock with smooth anchor jumps)
- [x] globals.css (added @keyframes border-beam and .animate-border-beam)
- [x] Hero.jsx (added InteractiveParticles canvas, BorderBeam on badge, live NumberTicker stats strip)
- [x] Skills.jsx (integrated live NumberTicker on skill level percentages)
- [x] DesignShowcase.jsx (BorderBeam traveling light sweep on featured showcase card)
- [x] Contact.jsx (BorderBeam halo sweep on main collaboration container)
- [x] app/layout.jsx (integrated FloatingDock at root layout)
- [x] Verified build & lint: 0 errors, 14/14 static pages generated

