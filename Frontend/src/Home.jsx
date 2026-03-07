import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Welcome to Home Page 🎉</h2>
      {username ? <h3>Hi, {username}</h3> : null}
      <h3>Your Role: {role}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;