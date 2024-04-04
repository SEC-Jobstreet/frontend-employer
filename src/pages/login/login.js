import React, { useEffect, useRef } from "react";

import CandidateLogin from "../../components/login/candidate-login";

import "../../components/login/login-style.css";

function Login() {
  const loginRef = useRef();

  const handleClickOutside = (event) => {
    if (loginRef.current && !loginRef.current.contains(event.target)) {
      document.querySelector(".login-widget-from-nav").style.display = "none";
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
      <CandidateLogin />
    </div>
  );
}

export default Login;
