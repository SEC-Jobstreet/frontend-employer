/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from "react";

import CandidateLogin from "../../components/login/candidate-login";

import "../../components/login/login-style.css";

function Login({ onClose = () => {}, show = false }) {
  const loginRef = useRef();

  const [shouldAddListener, setShouldAddListener] = useState(
    window.innerWidth >= 768
  );

  const handleRoleSelection = (role) => {
    sessionStorage.setItem("role", role);
    if (role === "candidate") {
      document.querySelector(".role-selection-container").style.display =
        "none";
    }
  };

  const handleClickOutside = (event) => {
    if (loginRef.current && !loginRef.current.contains(event.target)) {
      onClose(); // Close the login form
    }
  };

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role === "candidate") {
      document.querySelector(".role-selection-container").style.display =
        "none";
    }

    const updateListener = () => {
      setShouldAddListener(window.innerWidth >= 768);
    };
    window.addEventListener("resize", updateListener);

    if (shouldAddListener) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("resize", updateListener);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shouldAddListener, onClose]);

  return (
    <div className={`login-widget ${show ? "active" : ""}`} ref={loginRef}>
      <div
        className="role-selection-container"
        style={{ position: "absolute", display: "block" }}
      >
        <h3 className="login-title">Đăng nhập</h3>
        <p className="mb-24">Bạn là ứng viên tìm việc hay nhà tuyển dụng?</p>
        <button
          className="rounded-button-primary btn-sign-up mb-24"
          onClick={() => handleRoleSelection("candidate")}
        >
          Ứng Viên
        </button>
        <button
          className="rounded-button-primary btn-forgot-pw"
          onClick={() => handleRoleSelection("employer")}
        >
          Nhà Tuyển Dụng
        </button>
      </div>
      <CandidateLogin onClose={onClose} />
    </div>
  );
}

export default Login;
