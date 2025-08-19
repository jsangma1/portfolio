// src/components/Login.jsx
import React from "react";
import Navbar from "./Navbar"; // include navbar

const Login = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/login-bg.png')" }}
    >
      <Navbar /> {/* same navbar as main page */}

      <div className="flex justify-center items-center flex-1">
        <div
          className="flex border border-white p-10 shadow-lg bg-black/70"
          style={{ width: "800px" }}
        >
          {/* Left side: login form */}
          <div className="flex-1 flex flex-col gap-4 pr-10">
            <h2 className="text-white text-2xl font-bold text-center mb-4">
              LOGIN
            </h2>

            <label className="text-white">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="rounded-full p-2 px-4 border border-gray-400 outline-none"
            />

            <label className="text-white">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="rounded-full p-2 px-4 border border-gray-400 outline-none"
            />

            <button className="mt-4 bg-gray-300 text-black py-2 rounded-full">
              Login
            </button>
          </div>

          {/* Right side: logo + recover */}
          <div className="flex-1 flex flex-col items-center justify-center border-l border-white pl-10">
            <img
              src="/JS-bg.png"
              alt="JS logo"
              className="mb-4 w-32 h-auto"
            />
            <p className="text-white mb-2">FORGOT PASSWORD?</p>
            <button className="bg-gray-300 text-black py-2 px-6 rounded-full">
              Recover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
