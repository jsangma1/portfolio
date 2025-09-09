import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- added
  const navigate = useNavigate();

  useEffect(() => {
  setLoaded(false);       // reset
  const timer = setTimeout(() => setLoaded(true), 50); // trigger animation
  return () => clearTimeout(timer);
}, []);



  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const msg = await res.text();
      if (msg === "Login successful") {
        localStorage.setItem("loggedIn", "true");
        navigate("/admin");
      } else alert(msg);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleRecover = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/recover", { method: "POST" });
      const msg = await res.text();
      alert(msg);
      if (msg === "Reset code sent!") navigate("/reset");
    } catch (err) {
      console.error(err);
      alert("Failed to send reset code");
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <>
      <div className="fixed inset-0 z-0 bg-[url('/login-bg.png')] bg-cover bg-center pointer-events-none" />
      <div className="fixed inset-0 z-10 bg-gradient-to-b from-black/70 to-black pointer-events-none" />
      <div className="fixed inset-0 z-20 grid place-items-center pointer-events-none">
        <div
          className={`pointer-events-auto flex w-[800px] max-w-[92vw] border border-white/80 p-10 rounded-xl bg-black/60 backdrop-blur-sm transition-all duration-700 ease-out transform ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          style={{ boxShadow: "0 0 4px rgba(255,255,255,0.8)" }}
          onKeyDown={handleKeyDown}
        >
          <div className={`flex-1 flex flex-col gap-2 pr-10 font-bold transition-transform duration-700 ${loaded ? "translate-x-0" : "-translate-x-10"}`}>
            <h2 className="text-white text-4xl text-center mb-2 mt-4">LOGIN</h2>

            <label className="text-white">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="rounded-full p-2 px-4 border border-gray-400 outline-none font-normal text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="rounded-full p-2 px-4 border border-gray-400 outline-none font-normal text-black w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 font-bold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="mt-4 bg-gray-300 text-black py-2 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            >
              Login
            </button>
          </div>

          <div className={`flex-1 flex flex-col items-center justify-center border-l border-white/60 pl-10 font-bold transition-transform duration-700 ${loaded ? "translate-x-0" : "translate-x-10"}`}>
            <img src="/JS-bg.png" alt="JS logo" className="mb-4 w-32 h-auto" />
            <p className="text-white mb-4">FORGOT PASSWORD?</p>
            <button
              onClick={handleRecover}
              className="bg-gray-300 text-black py-2 px-6 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(255,255,255,0.8)]"
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
