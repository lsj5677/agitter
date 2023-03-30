import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutForUser } from "../api/firebase";

export default function Navigation() {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOutForUser();
    navigate("/");
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
