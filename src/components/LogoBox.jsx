import React from "react";
import { VscPulse } from "react-icons/vsc";
import styles from "./LogoBox.module.css";

export default function LogoBox() {
  return (
    <div className={styles.logo}>
      <h2>Agieet</h2>
      <VscPulse />
    </div>
  );
}
