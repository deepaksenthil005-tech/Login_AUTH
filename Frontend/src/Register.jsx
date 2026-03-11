import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("User");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setMessage("");
    if (!username.trim()) return setMessage("Username is required");
    if (!email.trim()) return setMessage("Email is required");
    if (!password) return setMessage("Password is required");

    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, role, photo }),
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
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setPhoto(URL.createObjectURL(file));
          }
        }}
      />

      {photo ? (
        <div className="avatar-wrap">
          <img className="avatar" src={photo} alt="Profile preview" />
        </div>
      ) : null}

      <select value={role} onChange={(e) => setRole(e.target.value)}>
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
