import React from "react";
import { useState } from "react";
import { signInWithEmail, signUpWithEmail } from "../api/firebase";
import styles from "./Form.module.css";

export default function Form({ buttonValue, newAccount }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newAccount) {
      signUpWithEmail(email, password);
    } else {
      signInWithEmail(email, password);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email || ""}
          onChange={onChange}
          required
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password || ""}
          onChange={onChange}
          required
          className={styles.input}
        />
        <button className={styles.button}>{buttonValue}</button>
      </form>
    </div>
  );
}
