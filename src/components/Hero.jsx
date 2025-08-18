import React from "react";

export default function Hero() {
  return (
    <section className="relative w-screen h-[429px] bg-black text-white flex items-center overflow-hidden group">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black"></div>
        {/* Darken overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-left pl-[97px]">
        <h1 className="text-5xl font-bold mb-2" style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}>
          JACHI SANGMA
        </h1>
        <p className="text-lg font-medium" style={{ textShadow: "4px 4px 4px rgba(0,0,0,1)" }}>
          Computer Science Graduate · Developer · Designer
        </p>
      </div>
    </section>
  );
}
