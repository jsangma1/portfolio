import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-[60px] bg-black flex items-center justify-between px-10 z-20">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/JS.png" alt="Logo" className="h-8 w-auto" />
      </div>

      {/* Menu */}
      <ul className="flex gap-8 text-sm font-medium">
        <li className="hover:text-gray-400 cursor-pointer">ABOUT ME</li>
        <li className="hover:text-gray-400 cursor-pointer">SKILLS</li>
        <li className="hover:text-gray-400 cursor-pointer">PROJECTS</li>
        <li className="hover:text-gray-400 cursor-pointer">CONTACT ME</li>
                <li className="hover:text-gray-400 cursor-pointer">ADMIN</li>

      </ul>
    </nav>
  );
}
