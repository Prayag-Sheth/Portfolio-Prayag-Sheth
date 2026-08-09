import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { About } from "../components/About";
import { Blog } from "../components/Blog";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Partners } from "../components/Partners";
import { Process } from "../components/Process";
import { Services } from "../components/Services";
import { Testimonials } from "../components/Testimonials";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash, location.pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <About />
        <Services />
        <Process />
        <Blog />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
