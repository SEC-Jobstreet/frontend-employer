import React, { useState } from "react";

import "./register-style.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  const validateEmail = (email1) =>
    String(email1)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.trim().length >= 6;

    setEmailError(!isEmailValid);
    setPasswordError(password.trim() === "");
    setPasswordLengthError(!isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      // Handle the form submission
    }
  };

  return (
    <div className="register-widget">
      <div className="register-container">
        <h3 className="register-title">Tạo tài khoản</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <input
                type="email"
                className={`form-control email ${emailError ? "is-invalid" : ""}`}
                placeholder="Nhập email của bạn"
                name="user[email]"
                id="register_widget_user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && (
                <div className="invalid-feedback">
                  Địa chỉ email không hợp lệ
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <input
                type="password"
                className={`form-control password ${passwordError || passwordLengthError ? "is-invalid" : ""}`}
                id="register_widget_user_password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && (
                <div className="invalid-feedback">
                  Mật khẩu không thể để trắng
                </div>
              )}
              {passwordLengthError && (
                <div className="invalid-feedback">
                  Mật khẩu quá ngắn (tối thiểu 6 ký tự)
                </div>
              )}
            </div>
          </div>
          <button className="rounded-button-primary btn-sign-in" type="submit">
            Tạo tài khoản mới
          </button>
          <div className="privacy-statement">
            <span className="branded-links">
              Bằng cách tạo tài khoản, bạn đồng ý với{" "}
              <a href="/">Các điều khoản và điều kiện sử dụng</a> và{" "}
              <a href="/">Chính Sách Bảo Mật</a> của JobStreet.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
