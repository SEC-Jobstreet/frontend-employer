import React, { useEffect, useRef } from "react";

import CandidateEmployer from "./candidate-employer";
import CandidateLogin from "./candidate-login";

import "./login-style.css";

function Login() {
  const loginRef = useRef();

  const handleClickOutside = (event) => {
    if (loginRef.current && !loginRef.current.contains(event.target)) {
      const temp = document.querySelector(".login-widget-from-nav");
      if (temp) temp.style.display = "none";
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="login-widget login-widget-from-nav" ref={loginRef}>
      <CandidateEmployer />
      <CandidateLogin />
    </div>
  );
}

export default Login;
