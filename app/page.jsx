import About from "../components/About";
import BlogPreview from "../components/BlogPreview";
import Contact from "../components/Contact";
import DesignShowcase from "../components/DesignShowcase";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Marquee from "../components/ui/Marquee";
import VideoGrid from "../components/VideoGrid";

const marqueeTags = [
  "CLO 3D Design",
  "Textile Engineering",
  "Industrial Engineering",
  "Tech Packs",
  "Garment Simulation",
  "Quality Control",
  "Lean Managaement",
  "Production Planning",
  "Microsoft Office",
  "Google Suite",
  "Lectra Modaris",
  "5S",
  "Apparel Flat Sketch",
  "Adobe Illustrator",
  "Adobe Photoshop",
  "PC Tips",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="py-6 sm:py-8 border-y border-slate-200/70 bg-white/60 backdrop-blur-sm">
        <Marquee items={marqueeTags} speed={35} />
      </div>
      <About />
      <Skills />
      <DesignShowcase />
      <VideoGrid />
      <BlogPreview />
      <Contact />
    </>
  );
}
