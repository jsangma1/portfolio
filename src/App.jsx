import React from "react";
import Navbar from "./components/Navbar";  // <-- missing import
import Hero from "./components/Hero";
import About from "./components/About";

function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Hero />
      <About />
    </div>
  );
}

export default App;
