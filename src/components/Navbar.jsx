import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = ["ABOUT ME", "SKILLS", "PROJECTS", "CONTACT ME", "ADMIN"];
  const sectionIds = ["about", "skills", "projects"];

  const handleClick = (index) => {
    if (index < sectionIds.length) {
      // Scroll to section
      const section = document.getElementById(sectionIds[index]);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else if (index === 3) {
      // Open email client
window.open("https://mail.google.com/mail/?view=cm&to=jsangma2002@gmail.com&su=Hello&body=Hi%20Jachi,", "_blank");
    }
    // index 4 ("ADMIN") can be handled separately later
  };

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
          className="h-8 w-auto ml-32 transition-all duration-700"
          style={{ filter: "drop-shadow(4px 4px 4px rgba(0,0,0,1))" }}
        />
      </div>

      {/* Menu */}
      <ul className="flex gap-8 text-sm font-medium">
        {menuItems.map((item, index) => (
          <li
            key={item}
            onClick={() => handleClick(index)}
            className={`hover:text-gray-400 cursor-pointer transition-colors duration-300 transform transition-all ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
            style={{
              textShadow: "4px 4px 4px rgba(0,0,0,1)",
              transitionDelay: `${index * 150}ms`,
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
