import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setLoaded(true), 100); // slight delay
    return () => clearTimeout(timer);
  }, []);

  const menuItems = ["ABOUT ME", "SKILLS", "PROJECTS", "CONTACT ME", "ADMIN"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-[60px] flex items-center justify-between px-10 z-20 transition-all duration-700 ${
        loaded ? "opacity-100 translate-y-0" : "-translate-y-12 opacity-0"
      }`}
      style={{ backgroundColor: "#191919" }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/JS.png"
          alt="Logo"
          className="h-8 w-auto ml-16 transition-all duration-700"
          style={{ filter: "drop-shadow(4px 4px 4px rgba(0,0,0,1))" }}
        />
      </div>

      {/* Menu */}
      <ul className="flex gap-8 text-sm font-medium">
        {menuItems.map((item, index) => (
          <li
            key={item}
            className={`hover:text-gray-400 cursor-pointer transition-colors duration-300 transform transition-all ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
            style={{
              textShadow: "4px 4px 4px rgba(0,0,0,1)",
              transitionDelay: `${index * 150}ms`, // stagger effect
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
