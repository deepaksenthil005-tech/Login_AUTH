import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const photo = localStorage.getItem("photo");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Welcome to Home Page 🎉</h2>
      {photo ? (
        <div className="avatar-wrap">
          <img className="avatar" src={photo} alt="Profile" />
        </div>
      ) :
        <div className="avatar-wrap">
          <img className="avatar" src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg" alt="Profile" />
        </div>}
      {username ? <h3>Hi, {username}</h3> : null}
      <h3>Your Role: {role}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;