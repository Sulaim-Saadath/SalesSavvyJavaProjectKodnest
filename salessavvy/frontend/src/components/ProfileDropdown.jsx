import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useravatar from "../assets/useravatar.png";
import "../App.css";

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    console.log("User logged out");
  };
  return (
    <div className="profile-dropdown">
      <button onClick={toggleDropdown}>
        <img src={useravatar} alt="User Avatar" />
        {username || "Guest"}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <button>Profile</button>
          <button
            onClick={() => {
              navigate("/orders");
              setIsOpen(false);
            }}
          >
            Orders
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
