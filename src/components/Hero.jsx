import React from "react";

export default function Hero() {
  return (
    <section className="relative w-screen h-[429px] bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold mb-2">JACHI SANGMA</h1>
        <p className="text-lg font-medium">
          Computer Science Graduate · Developer · Designer
        </p>
      </div>
    </section>
  );
}
