import React from "react";
import Navbar from "./components/Navbar";  // <-- missing import
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Hero />
      <About />
            <Skills />
             <Projects />

    </div>
  );
}

export default App;
