import React from "react";
import Form from "../components/Form";
import LogoBox from "../components/LogoBox";

export default function SignUp() {
  return (
    <div className="signInandUP">
      <LogoBox />
      <Form buttonValue="Sign Up" newAccount={true} />
    </div>
  );
}
