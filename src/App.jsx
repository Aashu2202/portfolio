import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Cursor from "./components/Cursor";
import Particles from "./components/Particles";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative bg-[#0a0907] min-h-screen" style={{ cursor: "none" }}>
      <Cursor />
      <Particles />

      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Services />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
