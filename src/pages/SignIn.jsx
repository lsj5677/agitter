import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import { signInWithGoogle } from "../api/firebase";
import styles from "./SignIn.module.css";
import { AiOutlineGoogle } from "react-icons/ai";
import LogoBox from "../components/LogoBox";

export default function SignIn() {
  const handleGoogle = () => signInWithGoogle();
  return (
    <div className="signInandUP">
      <LogoBox />
      <Form buttonValue="Sign In" newAccount={false} />
      <div>
        <button onClick={handleGoogle} className={styles.button}>
          Continue with Google <AiOutlineGoogle />
        </button>
        <div className={styles.signUpText}>
          <span>If you don't have accout</span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
