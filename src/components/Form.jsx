import React from "react";
import { useState } from "react";
import { signInWithEmail, signUpWithEmail } from "../api/firebase";

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
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email || ""}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password || ""}
          onChange={onChange}
          required
        />
        <button>{buttonValue}</button>
      </form>
    </div>
  );
}
