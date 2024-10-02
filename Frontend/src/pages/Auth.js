import React, { useState,useRef } from "react";
import "../components/auth/auth.css";
import SignInForm from "../components/auth/SignIn";
import SignUpForm from "../components/auth/SignUp";

export default function Auth() {
  const [type, setType] = useState("signIn");
  const SignUpFormRef = useRef();
  const SignInFormRef = useRef();

  //swap signin and sign up vice versa
  const handleOnClick = text => {
    if (text !== type) {
      if(text === "signIn") SignUpFormRef.current.resetFormChanges();
      else SignInFormRef.current.resetFormChanges();
      setType(text);
      return;
    }
  };
  const containerClass =
    "Auth_Sub " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="Auth_Main">
      <div className={containerClass} id="container">
        <SignUpForm ref={SignUpFormRef} changeState={handleOnClick}/>
        <SignInForm ref={SignInFormRef}/>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p className="auth_p">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost auth_btn"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p className="auth_p">Enter your personal details and start journey with us</p>
              <button
                className="ghost auth_btn"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
