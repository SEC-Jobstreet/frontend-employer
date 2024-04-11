import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import hidePasswordIcon from "../../assets/svg/hide_password.svg";
import showPasswordIcon from "../../assets/svg/show_password.svg";
import CustomButton from "../../components/custombutton";
import Input from "../../components/custominput";
import { loginAccount } from "../../store/user";

import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  const passwordPattern =
    /^(?=(.*[a-z]){0,})(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\-__+.]){0,})(?=\S+$).{8,}$/;

  const handleLogin = () => {
    // Handle the form submission
    // After verify
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRoYW5oIFF1eSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJlbWFpbCI6ImNhbmRpZGF0ZWpvYnN0cmVldEBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZyZWVwaWsuY29tLzI1Ni8xMDc3LzEwNzcxMTQucG5nIiwiZXhwIjoxNzI2Mjk5OTIyfQ.bspjeO6l3cKFvmzbozZCMutaT-shlVmDuKCKE3ql68w";
    localStorage.setItem("access-token", accessToken);
    const data = jwtDecode(accessToken);
    dispatch(loginAccount(data));
    navigate("/home");
  };

  return (
    <div className="login-page-container">
      <div className="login-page-header">Nhà tuyển dụng đăng nhập</div>
      <div className="login-form">
        <Input
          className="input-email-field"
          label="Email"
          type="text"
          input={email}
          setInput={setEmail}
          errorMessage={
            !email
              ? "Hãy điền địa chỉ email của bạn"
              : !emailPattern.test(email) &&
                "Xin vui lòng nhập một địa chỉ email hợp lệ"
          }
        />
        <Input
          className="input-password-field"
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          input={password}
          setInput={setPassword}
          errorMessage={
            !password
              ? "Hãy điền mật khẩu"
              : !passwordPattern.test(password) &&
                "Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái viết hoa, một con số và không có dấu cách"
          }
        >
          <div className="password-icon">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                alt=""
              />{" "}
            </button>
          </div>
        </Input>
        <Link to="/" className="forgot-password link-to-orther-page">
          Quên mật khẩu
        </Link>
        <CustomButton
          type="submit"
          color="green"
          className="login-page-loginBtn"
          onClick={handleLogin}
        >
          Nhà tuyển dụng đăng nhập
        </CustomButton>
        <div className="sign-up-section">
          <span>
            Bạn chưa có tài khoản nhà tuyển dụng?{" "}
            <Link to="/post_job" className="sign-up-link link-to-orther-page">
              Đăng ký
            </Link>
          </span>
        </div>
      </div>
      <div className="candidate-section">
        <span>Bạn đang tìm việc làm</span>
        <span>
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="link-to-orther-page"
          >
            Đăng nhập
          </a>{" "}
          hoặc{" "}
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="link-to-orther-page"
          >
            đăng ký
          </a>{" "}
          với tư cách là người tìm việc
        </span>
      </div>
    </div>
  );
}

export default Login;
