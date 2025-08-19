import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Login from "./components/Login";
import Admin from "./components/Admin";  // import the Admin page

function App() {
  return (
    <Router>
      <Routes>
        {/* Main portfolio page */}
        <Route
          path="/"
          element={
            <div className="bg-black text-white">
              <Navbar />
              <Hero />
              <About />
              <Skills />
              <Projects />
            </div>
          }
        />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Admin page */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
