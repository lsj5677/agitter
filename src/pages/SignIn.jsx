import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import { signInWithEmail, signInWithGoogle } from "../api/firebase";

export default function SignIn() {
  const handleGoogle = () => signInWithGoogle();
  return (
    <div>
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
