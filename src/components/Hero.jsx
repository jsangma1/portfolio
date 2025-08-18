import React, { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative w-screen h-[429px] bg-black text-white flex items-center overflow-hidden group">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Hero Background"
          className={`w-full h-full object-cover transition-transform duration-1000 ${
            loaded ? "scale-100" : "scale-105"
          }`}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black"></div>
        {/* Darken overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-70"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-left pl-[97px] transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1
          className="text-5xl font-bold mb-2"
          style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}
        >
          JACHI SANGMA
        </h1>
        <p
          className="text-lg font-medium"
          style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)", color: "#F9E4DD" }}
        >
          Computer Science Graduate · Developer · Designer
        </p>
      </div>
    </section>
  );
}
