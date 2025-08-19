import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      name: "Estate Ease",
      description:
        "EstateEase is a full-stack Property Management System designed for remote landlords to manage properties, tenants, payments, and maintenance efficiently.",
      tech: "Laravel • MySQL • PHP • Blade • HTML/CSS",
      img: "/estateease.png",
      liveDemo: "https://example.com",
      documentation: "https://example.com/docs",
    },
    {
      name: "Tales of Worlds",
      description:
        "Designed the homepage and menu interface for a story-driven game concept featuring three unique storylines.",
      tech: "FIGMA",
      img: "/talesofworlds.png",
    },
    {
      name: "Another Project",
      description: "A short description for another project goes here.",
      tech: "React • Tailwind • Node.js",
      img: "/images/project3.png",
      liveDemo: "https://example.com",
    },
    {
      name: "Fourth Project",
      description: "Another one just to test scrolling.",
      tech: "Vue • Firebase",
      img: "/images/project4.png",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleUp = () => {
    setStartIndex((prev) => (prev === 0 ? projects.length - 2 : prev - 2));
  };

  const handleDown = () => {
    setStartIndex((prev) => (prev + 2 >= projects.length ? 0 : prev + 2));
  };

  const gradient = "linear-gradient(135deg, #ffffff 0%, #696969 65%, #000000 100%)";

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      id="projects"
      className="w-full bg-black pb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="w-[90%] mx-auto rounded-2xl p-10 min-h-[1100px] flex flex-col items-center mt-8 mb-8 bg-[#111] shadow-2xl">
        <h2
          className="text-white text-3xl font-bold mb-2"
          style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
        >
          PROJECTS
        </h2>
        <p className="text-gray-400 mb-8" style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}>
          Some of my project previews
        </p>

        {/* Up Button */}
        <motion.button
          onClick={handleUp}
          whileHover={{ scale: 1.1 }}
          className="mb-4 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden p-0 border-0 focus:outline-none"
          style={{ background: gradient }}
          aria-label="Previous projects"
          title="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>

        {/* Projects */}
        <AnimatePresence initial={false}>
          {projects.slice(startIndex, startIndex + 2).map((project, index) => (
            <motion.div
              key={project.name}
              className="w-[950px] h-[459px] rounded-xl p-6 flex gap-6 shadow-lg mb-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(200,200,200,0.3) 30%, rgba(102,102,102,0.6) 60%, rgba(0,0,0,0.8) 100%)",
              }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              {/* Left Side Image */}
              <div className="w-[341px] h-[417px] overflow-hidden flex justify-center items-center bg-black rounded-lg">
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side Content */}
              <div className="flex flex-col justify-center flex-1">
                <h3
                  className="text-[32px] font-extrabold mb-4"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    textShadow: "4px 4px 4px rgba(0,0,0,1)",
                  }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-white font-medium text-[16px] mb-6"
                  style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
                >
                  {project.description}
                </p>
                <p
                  className="text-white font-medium text-[14px]"
                  style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
                >
                  <span className="font-bold">Tech Stack:</span> {project.tech}
                </p>

                {/* Buttons */}
                <div className="flex gap-[20px] mt-6">
                  {project.liveDemo && (
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full flex items-center justify-center transition"
                      style={{
                        width: "175px",
                        height: "38px",
                        backgroundColor: "white",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "14px",
                        border: "4px solid black",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Live Demo
                    </motion.a>
                  )}
                  {project.documentation && (
                    <motion.a
                      href={project.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full flex items-center justify-center transition"
                      style={{
                        width: "175px",
                        height: "38px",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "14px",
                        border: "4px solid white",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Documentation
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Down Button */}
        <motion.button
          onClick={handleDown}
          whileHover={{ scale: 1.1 }}
          className="mt-4 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden p-0 border-0 focus:outline-none"
          style={{ background: gradient }}
          aria-label="Next projects"
          title="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Projects;
