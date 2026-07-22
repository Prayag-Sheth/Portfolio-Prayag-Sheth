import { About } from "./components/About";
import { Blog } from "./components/Blog";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Partners } from "./components/Partners";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { Video } from "./components/Video";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <About />
        <Services />
        <Process />
        <Video />
        <Blog />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
