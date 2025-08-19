// src/components/Admin.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Admin = () => {
  const [loaded, setLoaded] = useState(false);

  // Skills state (multiple images)
  const [skillImage, setSkillImage] = useState([]);

  // Projects state
  const [project, setProject] = useState({
    title: "",
    titleColor: "#000000",
    demo: "",
    docs: "",
    image: null,
    description: "",
  });

  // About me state
  const [about, setAbout] = useState({
    bio: "",
    username: "",
    contact: "",
    password: "",
  });

  // Manage section states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
// State
const [category, setCategory] = useState(""); // empty by default
  // Animate page load
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectChange = (e) => {
    const { name, value, files } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setAbout((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    if (category === "skills") {
      const newSkills = skillImage.filter((f) => f.name !== selectedItem);
      setSkillImage(newSkills);
    } else {
      if (project.title === selectedItem) {
        setProject({ ...project, title: "" });
      }
    }
    setSelectedItem("");
    alert(`${selectedItem} deleted from ${category}!`);
  };

  // Filtered items based on category and prefix search
  const filteredItems =
    category === "skills"
      ? skillImage
          .map((f) => f.name)
          .filter((name) => name.toLowerCase().startsWith(searchQuery.toLowerCase()))
      : project.title && project.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      ? [project.title]
      : [];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero / Header */}
      <div className="relative h-[250px] bg-[url('/admin-bg.png')] bg-cover bg-center flex items-center justify-end">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000B3] to-[#000000]" />
        <div
          className={`relative z-10 text-right pr-40 md:pr-48 lg:pr-56 transform transition-all duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="text-5xl font-bold">ADMIN</h1>
          <p className="text-lg text-gray-300">Add Skills and Projects</p>
        </div>
      </div>

      <div className="p-8 flex flex-col gap-12">
        {/* Skills */}
        <section
          className={`w-screen flex justify-center transform transition-all duration-1000 delay-200 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="w-[90%] bg-neutral-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">SKILLS</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Skills uploaded:", skillImage);
              }}
              className="flex flex-col md:flex-row items-center justify-center gap-4"
            >
              <label className="font-bold whitespace-nowrap">
                UPLOAD IMAGES OF SKILLS
              </label>

              <input
                type="file"
                className="flex-1 bg-white text-black rounded-lg p-2"
                onChange={(e) => setSkillImage(Array.from(e.target.files))}
                multiple
              />

              <button
                type="submit"
                className="bg-white text-black font-bold px-6 py-2 rounded-full hover:scale-105 transition"
              >
                SUBMIT
              </button>
            </form>

            {skillImage.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {skillImage.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={`Skill ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Projects */}
        <section
          className={`w-screen flex justify-center transform transition-all duration-1000 delay-400 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="w-[90%] bg-gray-200 text-black p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">PROJECTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={project.title}
                  onChange={handleProjectChange}
                  className="rounded-full p-2 px-4 border border-gray-400 outline-none"
                />

                {/* Color Picker */}
                <div className="flex items-center gap-2">
                  <label className="font-semibold">Title Color:</label>
                  <input
                    type="color"
                    name="titleColor"
                    value={project.titleColor}
                    onChange={handleProjectChange}
                    className="w-12 h-8 border border-gray-400 rounded-full cursor-pointer"
                  />
                </div>

                <input
                  type="text"
                  name="demo"
                  placeholder="Live Demo"
                  value={project.demo}
                  onChange={handleProjectChange}
                  className="rounded-full p-2 px-4 border border-gray-400 outline-none"
                />
                <input
                  type="text"
                  name="docs"
                  placeholder="Documentation"
                  value={project.docs}
                  onChange={handleProjectChange}
                  className="rounded-full p-2 px-4 border border-gray-400 outline-none"
                />

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleProjectChange}
                  className="rounded-full p-2 px-4 border border-gray-400 outline-none"
                />
              </div>

              <textarea
                name="description"
                placeholder="Description"
                value={project.description}
                onChange={handleProjectChange}
                className="w-full h-48 p-4 border border-gray-400 rounded-xl outline-none resize-none"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button className="bg-black text-white py-3 px-8 rounded-full font-bold hover:scale-105 transition">
                Submit Project
              </button>
            </div>
          </div>
        </section>

        {/* About Me */}
        <section
          className={`w-screen flex justify-center transform transition-all duration-1000 delay-600 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="w-[90%] bg-neutral-900 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">ABOUT ME</h2>
            <div className="flex flex-col gap-4">
              <textarea
                name="bio"
                placeholder="Edit About Me"
                value={about.bio}
                onChange={handleAboutChange}
                className="w-full p-4 border border-gray-400 rounded-xl outline-none resize-none"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Change Username"
                  value={about.username}
                  onChange={handleAboutChange}
                  className="rounded-full p-2 px-4 border border-gray-400 outline-none"
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Change Contact"
                  value={about.contact}
                  onChange={handleAboutChange}
                  className="rounded-full p-2 px-4 border border-gray-400 outline-none"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Change Password"
                  value={about.password}
                  onChange={handleAboutChange}
                  className="rounded-full p-2 px-4 border border-gray-400 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button className="bg-white text-black py-3 px-8 rounded-full font-bold hover:scale-105 transition">
                Update Information
              </button>
            </div>
          </div>
        </section>

{/* Manage Skills/Projects */}
<section
  className={`w-screen flex justify-center transform transition-all duration-1000 delay-800 ${
    loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
  }`}
>
  <div className="w-[90%] bg-neutral-900 p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold text-center mb-6">
      MANAGE SKILLS / PROJECTS
    </h2>

    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Category Selector */}
      <select
        className="p-3 rounded-full border border-gray-400 outline-none text-black"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="skills">Skills</option>
        <option value="projects">Projects</option>
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 p-3 rounded-full border border-gray-400 outline-none text-black"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Delete Button */}
      <button
        className="bg-white text-black py-2 px-6 rounded-full font-bold hover:scale-105 transition"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  </div>
</section>

      </div>
    </div>
  );
};

export default Admin;
