// src/components/Admin.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";


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
  techStack: "", // <-- added
});

const [allSkills, setAllSkills] = useState([]);
const [allProjects, setAllProjects] = useState([]);

useEffect(() => {
  const fetchItems = async () => {
    try {
      const skillsRes = await fetch("http://localhost:8080/api/admin/skills");
      const skillsData = await skillsRes.json();
      setAllSkills(skillsData);

      const projectsRes = await fetch("http://localhost:8080/api/admin/projects");
      const projectsData = await projectsRes.json();
      setAllProjects(projectsData);
    } catch (err) {
      console.error("Failed to fetch skills/projects:", err);
    }
  };

  fetchItems();
}, []);

  // About me state
  const [about, setAbout] = useState({
    bio: "",
    username: "",
    contact: "",
    password: "",
  });

  // Manage section states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [category, setCategory] = useState("");

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

const [showPassword, setShowPassword] = useState(false);



const handleUpdate = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: about.username,
        password: about.password,
        email: about.contact,
        bio: about.bio
      })
    });

    if (res.ok) {
      alert("Information updated successfully!");
    } else {
      const errorData = await res.json();
      alert("Update failed: " + errorData.message);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
};
useEffect(() => {
  const timer = setTimeout(() => setLoaded(true), 200);

  // Fetch current admin info on component mount
  const fetchAdminData = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users/me");
      if (res.ok) {
        const data = await res.json();
        setAbout({
          bio: data.bio || "",
          username: data.username || "",
          contact: data.email || "",
          password: "", // leave empty
        });
      } else {
        console.error("Failed to fetch admin data");
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchAdminData();
  return () => clearTimeout(timer);
}, []);


  const handleDelete = () => {
    if (selectedItem === null) return;
    if (category === "skills") {
      const newSkills = skillImage.filter((_, idx) => idx !== selectedItem);
      setSkillImage(newSkills);
    } else if (category === "projects") {
      if (project.title === selectedItem) {
        setProject({ ...project, title: "" });
      }
    }
    setSelectedItem(null);
    alert(`Deleted item from ${category}!`);
  };

  const handleSkillUpload = (e) => {
    const files = Array.from(e.target.files);

    // Check for duplicates based on file name
    const existingFileNames = skillImage.map((f) => f.name);

    const newFiles = [];
    const duplicates = [];

    files.forEach((file) => {
      if (existingFileNames.includes(file.name)) {
        duplicates.push(file.name);
      } else {
        newFiles.push(file);
      }
    });

    if (duplicates.length > 0) {
      alert(
        `These files were skipped because they already exist: ${duplicates.join(
          ", "
        )}`
      );
    }

    // Append only unique files
    setSkillImage((prev) => [...prev, ...newFiles]);
  };

const handleSkillSubmit = async (e) => {
  e.preventDefault();
  if (skillImage.length === 0) {
    alert("No skills selected for upload!");
    return;
  }

  const formData = new FormData();
  skillImage.forEach((file) => formData.append("files", file));

  try {
    const response = await fetch("http://localhost:8080/api/admin/skills", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload skills");
    }

    const savedSkills = await response.json(); // this is the array of skills now in DB
    const savedNames = savedSkills.map((s) => s.name);

    const attemptedNames = skillImage.map((f) => f.name);
    const actuallySaved = attemptedNames.filter((n) => savedNames.includes(n));
    const skipped = attemptedNames.filter((n) => !savedNames.includes(n));

    if (actuallySaved.length > 0 && skipped.length === 0) {
      alert(`Skills uploaded successfully: ${actuallySaved.join(", ")}`);
    } else if (actuallySaved.length > 0 && skipped.length > 0) {
      alert(
        `Some skills uploaded: ${actuallySaved.join(
          ", "
        )}. Skipped (already exist): ${skipped.join(", ")}`
      );
    } else {
      alert(`All skills skipped (already exist): ${skipped.join(", ")}`);
    }

    setSkillImage([]); // reset after submit
  } catch (err) {
    console.error(err);
    alert("Error uploading skills: " + err.message);
  }
};



const handleProjectSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("titleColor", project.titleColor);
  formData.append("demo", project.demo);
  formData.append("docs", project.docs);
  formData.append("description", project.description);
  formData.append("techStack", project.techStack); // <-- added
  if (project.image) formData.append("image", project.image);

  try {
    const response = await fetch("http://localhost:8080/api/admin/projects", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to submit project");

    const savedProject = await response.json();
    alert(`Project "${savedProject.title}" added successfully!`);

    // Reset form
    setProject({
      title: "",
      titleColor: "#000000",
      demo: "",
      docs: "",
      image: null,
      description: "",
      techStack: "", // <-- reset
    });
  } catch (err) {
    console.error(err);
    alert("Error submitting project: " + err.message);
  }
};




  const filteredItems =
  category === "skills"
    ? allSkills
        .map((s) => s.name)
        .filter((name) =>
          name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : category === "projects"
    ? allProjects
        .map((p) => p.title)
        .filter((title) =>
          title.toLowerCase().includes(searchQuery.toLowerCase())
        )
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
              onSubmit={handleSkillSubmit}
              className="flex flex-col md:flex-row items-center justify-center gap-4"
            >
              <label className="font-bold whitespace-nowrap">
                UPLOAD IMAGES OF SKILLS
              </label>

              <input
                type="file"
                className="flex-1 bg-white text-black rounded-lg p-2"
                onChange={handleSkillUpload}
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
                  <div
                    key={idx}
                    onClick={() => setSelectedItem(idx)}
                    className={`w-24 h-24 rounded-lg shadow-md overflow-hidden cursor-pointer border-4 ${
                      selectedItem === idx ? "border-red-500" : "border-transparent"
                    }`}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Skill ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
      {/* Left column */}
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

      {/* Right column */}
      <div className="flex flex-col gap-3">
        <textarea
          name="description"
          placeholder="Description"
          value={project.description}
          onChange={handleProjectChange}
          className="w-full h-48 p-4 border border-gray-400 rounded-xl outline-none resize-none"
        />

        {/* Tech Stack input under description */}
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (e.g. React • Tailwind • Node.js)"
          value={project.techStack}
          onChange={handleProjectChange}
          className="rounded-full p-2 px-4 border border-gray-400 outline-none"
        />
      </div>
    </div>

    <div className="flex justify-center mt-6">
      <button
        onClick={handleProjectSubmit}
        className="bg-black text-white py-3 px-8 rounded-full font-bold hover:scale-105 transition"
      >
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
    <h2 className="text-2xl font-bold text-center mb-6 text-white">ABOUT ME</h2>

    <div className="flex flex-col gap-4">
      {/* Bio textarea */}
      <textarea
        name="bio"
        placeholder="Edit About Me"
        value={about.bio}
        onChange={handleAboutChange}
        className="w-full p-4 border border-gray-400 rounded-xl outline-none resize-none text-gray-900 bg-white placeholder-gray-500"
      />

      {/* Username, Contact, Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="username"
          placeholder="Change Username"
          value={about.username}
          onChange={handleAboutChange}
          className="rounded-full p-2 px-4 border border-gray-400 outline-none text-gray-900 bg-white placeholder-gray-500"
        />
        <input
          type="text"
          name="contact"
          placeholder="Change Contact / Email"
          value={about.contact}
          onChange={handleAboutChange}
          className="rounded-full p-2 px-4 border border-gray-400 outline-none text-gray-900 bg-white placeholder-gray-500"
        />
      <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Change Password"
    value={about.password}
    onChange={handleAboutChange}
    className="rounded-full p-2 px-4 border border-gray-400 outline-none text-gray-900 bg-white placeholder-gray-500 w-full"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

      </div>
    </div>

    {/* Update Button */}
    <div className="flex justify-center mt-6">
      <button
        className="bg-white text-black py-3 px-8 rounded-full font-bold hover:scale-105 transition"
        onClick={handleUpdate}
      >
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

    <div className="flex flex-col md:flex-row gap-4 items-center justify-between relative">
      {/* Category Selector */}
      <select
        className="p-3 rounded-full border border-gray-400 outline-none text-black"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSearchQuery("");
          setSelectedItem(null);
        }}
      >
        <option value="">Select Category</option>
        <option value="skills">Skills</option>
        <option value="projects">Projects</option>
      </select>

      {/* Search Input with hints */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 rounded-full border border-gray-400 outline-none text-black"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedItem(null); // reset selected item
          }}
        />

       {filteredItems.length > 0 && (
  <ul className="absolute top-full left-0 w-full bg-white text-black rounded-b-lg border border-t-0 border-gray-400 max-h-40 overflow-y-auto z-10">
    {filteredItems.map((name) => (
      <li
        key={name}
        onClick={() => {
          setSearchQuery(name);
          setSelectedItem(name);
        }}
        className="px-4 py-2 cursor-pointer hover:bg-gray-300"
      >
        {name}
      </li>
    ))}
  </ul>
)}

      </div>

      {/* Delete Button */}
      <button
        className="bg-white text-black py-2 px-6 rounded-full font-bold hover:scale-105 transition"
       onClick={async () => {
  if (!selectedItem) {
    alert("Please select an item to delete!");
    return;
  }
  const confirmDelete = window.confirm(
    `Are you sure you want to delete "${selectedItem}" from ${category}?`
  );
  if (!confirmDelete) return;

  try {
    if (category === "skills") {
      await axios.delete(
        `http://localhost:8080/api/admin/skills/deleteByName/${selectedItem}`
      );
      setSkillImage(prev => prev.filter(f => f.name !== selectedItem));
    } else if (category === "projects") {
      await axios.delete(
        `http://localhost:8080/api/admin/projects/deleteByTitle/${selectedItem}`
      );
      if (project.title === selectedItem) {
        setProject({
          ...project,
          title: "",
          demo: "",
          docs: "",
          image: null,
          description: "",
          techStack: "",
        });
      }
    }

    alert(`"${selectedItem}" deleted from ${category}!`);
    setSelectedItem(null);
    setSearchQuery("");
  } catch (error) {
    console.error(error);
    alert("Failed to delete. Check console for details.");
  }
}}

          
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
