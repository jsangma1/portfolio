import React, { useEffect, useState } from "react";

export default function About() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100); // slight delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-black w-screen flex justify-center overflow-x-hidden">
      <div
        className={`w-[90%] max-w-[1500px] bg-[#191919] p-4 sm:p-8 rounded-[20px] flex flex-col justify-center items-center transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ height: "253px" }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "#F9E4DD" }}
        >
          ABOUT ME
        </h2>
        <p className="text-center w-[60%]">
          Hi! I’m Jachi Sangma, a CSE graduate from UIU with a passion for web
          development and UI/UX design. I enjoy building clean, functional
          websites — from backend logic to frontend layouts.
        </p>
      </div>
    </section>
  );
}
