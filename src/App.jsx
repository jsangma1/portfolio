import React from "react";
import Navbar from "./components/Navbar";  // <-- missing import
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";

function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Hero />
      <About />
            <Skills />

    </div>
  );
}

export default App;
