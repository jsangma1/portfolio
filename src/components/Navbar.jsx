import React from "react";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 w-full h-[60px] flex items-center justify-between px-10 z-20"
      style={{ backgroundColor: "#191919" }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/JS.png"
          alt="Logo"
          className="h-8 w-auto ml-16"
          style={{ filter: "drop-shadow(4px 4px 4px rgba(0,0,0,1))" }}
        />
      </div>

      {/* Menu */}
      <ul className="flex gap-8 text-sm font-medium">
        <li
          className="hover:text-gray-400 cursor-pointer"
          style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
        >
          ABOUT ME
        </li>
        <li
          className="hover:text-gray-400 cursor-pointer"
          style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
        >
          SKILLS
        </li>
        <li
          className="hover:text-gray-400 cursor-pointer"
          style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
        >
          PROJECTS
        </li>
        <li
          className="hover:text-gray-400 cursor-pointer"
          style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
        >
          CONTACT ME
        </li>
        <li
          className="hover:text-gray-400 cursor-pointer"
          style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
        >
          ADMIN
        </li>
      </ul>
    </nav>
  );
}
