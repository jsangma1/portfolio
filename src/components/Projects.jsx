 import React, { useState } from "react";

const Projects = () => {
  const projects = [
    {
      name: "Estate Ease",
      description:
        "EstateEase is a full-stack Property Management System designed for remote landlords to manage properties, tenants, payments, and maintenance efficiently.",
      tech: "Laravel • MySQL • PHP • Blade • HTML/CSS",
      img: "/images/estateease.png",
      liveDemo: "https://example.com",
      documentation: "https://example.com/docs",
    },
    {
      name: "Tales of Worlds",
      description:
        "Designed the homepage and menu interface for a story-driven game concept featuring three unique storylines.",
      tech: "FIGMA",
      img: "/images/talesofworlds.png",
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

  return (
    <div className="bg-[#1e1e1e] w-full max-w-[1200px] mx-auto rounded-2xl p-6 h-[1432px] flex flex-col items-center mt-8 mb-8">
      <h2 className="text-white text-2xl font-bold mb-2">PROJECTS</h2>
      <p className="text-gray-400 mb-4">Some of my project previews</p>

      {/* Up Button */}
      <button
        onClick={handleUp}
        className="mb-4 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden p-0 border-0 focus:outline-none"
        style={{
          background: gradient,
        }}
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
      </button>

   {/* Projects */}
<div className="flex flex-col gap-8">
  {projects.slice(startIndex, startIndex + 2).map((project, index) => (
    <div
      key={index}
      className="w-[950px] h-[459px] rounded-xl p-6 flex gap-6 shadow-lg"
      style={{
        background: "linear-gradient(to right, #ffffff 0%, #666666 100%)",
      }}
    >
      {/* Left Side Image */}
      <div className="w-[341px] h-[417px] overflow-hidden flex justify-center items-center bg-black rounded-lg">
        <img
          src={project.img}
          alt={project.name}
          className="w-full h-full object-cover"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            minHeight: "100%",
            minWidth: "100%",
          }}
        />
      </div>

     {/* Right Side Content */}
<div className="flex flex-col justify-center flex-1">
  <h3
    className="text-[32px] font-extrabold text-black mb-4"
    style={{ fontFamily: "'Poppins', sans-serif", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
  >
    {project.name}
  </h3>
  <p className="text-white font-medium text-[16px] mb-6">
    {project.description}
  </p>
  <p className="text-white font-medium text-[14px]">
    <span className="font-bold">Tech Stack:</span> {project.tech}
  </p>
  {/* Buttons */}
  <div className="flex gap-4 mt-6">
    {project.liveDemo && (
      <a
        href={project.liveDemo}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-black text-white font-semibold rounded-full hover:bg-gray-800"
      >
        Live Demo
      </a>
    )}
    {project.documentation && (
      <a
        href={project.documentation}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-white text-black border border-black font-semibold rounded-full hover:bg-gray-200"
      >
        Documentation
      </a>
    )}
  </div>
</div>

    </div>
  ))}
</div>


      {/* Down Button */}
      <button
        onClick={handleDown}
        className="mt-4 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden p-0 border-0 focus:outline-none"
        style={{
          background: gradient,
        }}
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
      </button>
    </div>
  );
};

export default Projects;
