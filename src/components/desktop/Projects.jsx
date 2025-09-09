import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };
    fetchProjects();
  }, []);

  // Looping navigation
  const handleUp = () => {
    if (projects.length === 0) return;
    setStartIndex((prev) => (prev - 2 + projects.length) % projects.length);
  };

  const handleDown = () => {
    if (projects.length === 0) return;
    setStartIndex((prev) => (prev + 2) % projects.length);
  };

  // Always return 2 visible projects, wrapping around if necessary
  const getVisibleProjects = () => {
    if (projects.length === 0) return [];
    const first = projects[startIndex % projects.length];
    const second = projects[(startIndex + 1) % projects.length];
    return [first, second];
  };

  const gradient = "linear-gradient(135deg, #ffffff 0%, #696969 65%, #000000 100%)";

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
      className="w-full bg-black pb-16 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="w-[90%] mx-auto rounded-2xl p-10 min-h-[900px] flex flex-col items-center mt-8 mb-8 bg-[#111] shadow-2xl relative">
        <h2
          className="text-white text-3xl font-bold mb-2"
          style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
        >
          PROJECTS
        </h2>
        <p
          className="text-gray-400 mb-4"
          style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
        >
          Some of my project previews
        </p>

        {/* Up Button */}
        <motion.button
          onClick={handleUp}
          whileHover={{ scale: 1.05 }}
          className="mb-6 w-12 h-12 rounded-full flex items-center justify-center p-0 border-0 focus:outline-none"
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
          {getVisibleProjects().map((project) => (
            <motion.div
              key={project.id}
              className="w-full md:w-[950px] h-[350px] rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-lg mb-6"
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
              {/* Image */}
              <div
                className="flex justify-center items-center rounded-lg overflow-hidden flex-shrink-0"
                style={{ width: "341px", height: "270px" }}
              >
                <img
                  src={`http://localhost:8080${project.imagePath}`}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Right Side Content */}
              <div className="flex flex-col justify-center flex-1">
                <h3
                  className="text-[28px] font-extrabold mb-3"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    textShadow: "4px 4px 4px rgba(0,0,0,1)",
                    color: project.titleColor,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-white font-medium text-[14px] mb-4"
                  style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
                >
                  {project.description}
                </p>
                <p
                  className="text-white font-medium text-[12px]"
                  style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
                >
                  <span className="font-bold">Tech Stack:</span> {project.techStack}
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mt-4 flex-wrap">
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full flex items-center justify-center transition"
                      style={{
                        width: "150px",
                        height: "32px",
                        backgroundColor: "white",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "13px",
                        border: "3px solid black",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Live Demo
                    </motion.a>
                  )}
                  {project.docs && (
                    <motion.a
                      href={project.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full flex items-center justify-center transition"
                      style={{
                        width: "150px",
                        height: "32px",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "13px",
                        border: "3px solid white",
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
          whileHover={{ scale: 1.05 }}
          className="mt-2 w-12 h-12 rounded-full flex items-center justify-center p-0 border-0 focus:outline-none"
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
