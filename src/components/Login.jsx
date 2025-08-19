// src/components/Login.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Login = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true); // trigger animations after component mounts
  }, []);

  return (
    <>
      {/* Fullscreen background */}
      <div className="fixed inset-0 z-0 bg-[url('/login-bg.png')] bg-cover bg-center pointer-events-none" />

      {/* Top→bottom overlay */}
      <div className="fixed inset-0 z-10 bg-gradient-to-b from-black/70 to-black pointer-events-none" />

      {/* Navbar */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Centered login box */}
      <div className="fixed inset-0 z-20 grid place-items-center pointer-events-none">
        <div
          className={`pointer-events-auto flex w-[800px] max-w-[92vw] border border-white/80 p-10 rounded-xl bg-black/60 backdrop-blur-sm transition-all duration-700 ease-out transform ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{ boxShadow: "0 0 4px rgba(255,255,255,0.8)" }}
        >
          {/* Left: form */}
          <div
            className={`flex-1 flex flex-col gap-2 pr-10 font-bold transition-transform duration-700 ${
              loaded ? "translate-x-0" : "-translate-x-10"
            }`}
          >
            <h2 className="text-white text-4xl text-center mb-2 mt-4 transition-transform duration-700">
              LOGIN
            </h2>

            <label className="text-white">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="rounded-full p-2 px-4 border border-gray-400 outline-none font-normal"
            />

            <label className="text-white">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="rounded-full p-2 px-4 border border-gray-400 outline-none font-normal"
            />

            <button
              className="mt-4 bg-gray-300 text-black py-2 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{ boxShadow: "0 0 4px rgba(255,255,255,0.8)" }}
            >
              Login
            </button>
          </div>

          {/* Right: logo + recover */}
          <div
            className={`flex-1 flex flex-col items-center justify-center border-l border-white/60 pl-10 font-bold transition-transform duration-700 ${
              loaded ? "translate-x-0" : "translate-x-10"
            }`}
          >
            <img
              src="/JS-bg.png"
              alt="JS logo"
              className="mb-4 w-32 h-auto transition-transform duration-700"
            />
            <p className="text-white mb-4">FORGOT PASSWORD?</p>
            <button
              className="bg-gray-300 text-black py-2 px-6 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{ boxShadow: "0 0 4px rgba(255,255,255,0.8)" }}
            >
              Recover
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
