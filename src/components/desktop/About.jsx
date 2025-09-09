import React, { useEffect, useState } from "react";

export default function About() {
  const [loaded, setLoaded] = useState(false);
  const [bio, setBio] = useState(""); // store bio from backend

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100); // slight delay
    return () => clearTimeout(timer);
  }, []);

  // Fetch bio from backend
  useEffect(() => {
    const fetchBio = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/me");
        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();
        setBio(data.bio || ""); // fallback if bio is missing
      } catch (err) {
        console.error(err);
      }
    };
    fetchBio();
  }, []);

  return (
    <section
      id="about"
      className="py-5 bg-black w-screen flex justify-center overflow-x-hidden"
    >
      <div
        className={`w-[90%] bg-[#191919] p-4 sm:p-8 rounded-[20px] flex flex-col justify-center items-center transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ height: "253px" }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{
            color: "#F9E4DD",
            textShadow: "4px 4px 4px rgba(0,0,0,1)",
          }}
        >
          ABOUT ME
        </h2>
        <p
          className="text-center w-[60%]"
          style={{
            textShadow: "4px 4px 4px rgba(0,0,0,1)",
          }}
        >
          {bio || "Loading..."}
        </p>
      </div>
    </section>
  );
}
