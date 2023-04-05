import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { VscPulse } from "react-icons/vsc";
import { AiOutlineUser } from "react-icons/ai";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const { user } = useAuthContext();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">
            <VscPulse />
            <span>Agieet</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <AiOutlineUser />
            <span>{user.displayName}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
