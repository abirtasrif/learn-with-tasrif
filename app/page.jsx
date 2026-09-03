import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import DesignShowcase from "../components/DesignShowcase";
import VideoGrid from "../components/VideoGrid";
import BlogPreview from "../components/BlogPreview";
import Contact from "../components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <DesignShowcase />
      <VideoGrid />
      <BlogPreview />
      <Contact />
    </>
  );
}
