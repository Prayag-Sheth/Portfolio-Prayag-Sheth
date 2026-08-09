import { Route, Routes } from "react-router-dom";
import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { ExperienceCaseStudy } from "./pages/ExperienceCaseStudy";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/experience/:slug"
          element={
            <>
              <Navbar />
              <ExperienceCaseStudy />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}
