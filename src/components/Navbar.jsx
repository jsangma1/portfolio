import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contactEmail, setContactEmail] = useState(""); // dynamic email from DB
  const navigate = useNavigate();
  const location = useLocation();

  // Update login state and fetch email whenever location changes
  useEffect(() => {
    setLoaded(true);
    setIsLoggedIn(localStorage.getItem("loggedIn") === "true");

    const fetchEmail = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/me");
        if (res.ok) {
          const data = await res.json();
          setContactEmail(data.email || "");
        }
      } catch (err) {
        console.error("Failed to fetch email:", err);
      }
    };

    fetchEmail();
  }, [location]);

  const sectionIds = ["about", "skills", "projects"];

  const handleClick = (index) => {
    if (index < sectionIds.length) {
      const section = document.getElementById(sectionIds[index]);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else if (index === 3) {
      // Contact Me uses dynamic email from DB
      if (contactEmail) {
        window.open(
          `https://mail.google.com/mail/?view=cm&to=${contactEmail}`,
          "_blank"
        );
      } else {
        alert("Contact email not available");
      }
    }
  };

  const handleMenuClick = (item, index) => {
    if (item === "ADMIN") {
      if (isLoggedIn) {
        navigate("/admin");
      } else {
        navigate("/login");
      }
    } else if (item === "LOGOUT") {
      localStorage.removeItem("loggedIn");
      setIsLoggedIn(false);
      navigate("/"); // back to main page
    } else {
      handleClick(index);
    }
  };

  const handleLogoClick = () => {
    navigate("/", { replace: false });
    setTimeout(() => {
      const section = document.getElementById("hero");
      if (section) {
        const yOffset = -60;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  // Build menu
  const menuItems = [
    "ABOUT ME",
    "SKILLS",
    "PROJECTS",
    "CONTACT ME",
    "ADMIN", // always show ADMIN
    ...(isLoggedIn ? ["LOGOUT"] : []), // show LOGOUT only if logged in
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-[60px] flex items-center justify-between px-10 z-20 transition-all duration-700 ${
        loaded ? "opacity-100 translate-y-0" : "-translate-y-12 opacity-0"
      }`}
      style={{ backgroundColor: "#191919" }}
    >
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        <img
          src="/JS.png"
          alt="Logo"
          className="h-8 w-auto ml-32 transition-all duration-700"
          style={{ filter: "drop-shadow(4px 4px 4px rgba(0,0,0,1))" }}
        />
      </div>

      <ul className="flex gap-8 text-sm font-medium text-white">
        {menuItems.map((item, index) => (
          <li
            key={item}
            onClick={() => handleMenuClick(item, index)}
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
