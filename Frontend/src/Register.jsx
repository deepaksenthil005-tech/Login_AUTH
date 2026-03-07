import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const API = "http://localhost:5000/api/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();

    if (res.ok) {
      navigate("/"); 
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

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

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>

      <button onClick={handleRegister}>Register</button>

      <button className="switch-btn" onClick={() => navigate("/")}>
        Already have account? Login
      </button>

      <div className="message">{message}</div>
    </div>
  );
}

export default Register;