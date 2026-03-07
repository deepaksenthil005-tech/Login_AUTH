import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      navigate("/home");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <button className="switch-btn" onClick={() => navigate("/register")}>
        Create Account
      </button>

      <div className="message">{message}</div>
    </div>
  );
}

export default Login;