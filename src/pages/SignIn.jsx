import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import { signInWithGoogle } from "../api/firebase";
import styles from "./SignIn.module.css";
// import { IconName } from "react-icons/vsc";

export default function SignIn() {
  const handleGoogle = () => signInWithGoogle();
  return (
    <div className={styles.signInWrap}>
      <h2>Agieet</h2>
      <Form buttonValue="Sign In" newAccount={false} />
      <div>
        <button onClick={handleGoogle}>Start with Google</button>
        <div>
          <span>If you don't have accout</span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
