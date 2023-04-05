import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Navigation() {
  const { user } = useAuthContext();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{user.displayName}'s Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
