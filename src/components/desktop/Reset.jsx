import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    if (code.some(c => c === "") || !newPassword) return alert("Enter code & new password");

    try {
      const res = await fetch("http://localhost:8080/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.join(""), newPassword }),
      });
      const msg = await res.text();
      alert(msg);
      if (msg === "Password reset successful!") navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to reset password");
    }
  };

  const handleResend = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/recover", { method: "POST" });
      const msg = await res.text();
      alert(msg);
    } catch (err) {
      console.error(err);
      alert("Failed to resend code");
    }
  };

  const handleCodeChange = (e, index) => {
    const val = e.target.value.replace(/\D/, "");
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
    if (val && index < code.length - 1) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-2xl p-12 bg-black/90 rounded-xl backdrop-blur-md flex flex-col items-center text-center">
        <h2 className="text-5xl font-bold text-white mb-6">Reset Password</h2>
        <p className="text-white text-lg mb-8">
          Type the 6-digit code sent to your email
        </p>

        {/* Code Inputs */}
        <div className="flex justify-center gap-4 mb-6">
          {code.map((c, i) => (
            <input
              key={i}
              id={`code-${i}`}
              type="text"
              value={c}
              onChange={(e) => handleCodeChange(e, i)}
              maxLength="1"
              className="w-16 h-16 text-center text-black rounded-lg border border-gray-400 outline-none text-3xl"
            />
          ))}
        </div>

        <button
          onClick={handleResend}
          className="mb-6 text-sm text-gray-300 hover:text-white underline"
        >
          Resend Code
        </button>

        {/* Password Input */}
        <div className="relative w-full mb-8">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full rounded-lg p-5 border border-gray-400 outline-none text-black text-lg"
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
          onClick={handleReset}
          className="w-full bg-gray-300 text-black py-4 rounded-lg font-bold hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all text-lg"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default Reset;
