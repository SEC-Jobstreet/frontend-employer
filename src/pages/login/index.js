import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "aws-amplify/auth";

import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import hidePasswordIcon from "../../assets/svg/hide_password.svg";
import showPasswordIcon from "../../assets/svg/show_password.svg";
import CustomButton from "../../components/custombutton";
import Input from "../../components/custominputlogin";
import { loginAccount } from "../../store/user";

import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const passwordPattern =
    /^(?=(.*[a-z]){0,})(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\-__+.]){0,})(?=\S+$).{8,}$/;

  const handleLogin = async () => {
    // Handle the form submission
    // After verify

    if (!emailPattern.test(email) || !passwordPattern.test(password)) {
      return;
    }
    setDisabledButton(true);

    try {
      const res = await signIn({
        username: email,
        password,
      });
      if (
        res.isSignedIn === false &&
        res.nextStep?.signInStep === "CONFIRM_SIGN_UP"
      ) {
        localStorage.setItem("email", email);
        localStorage.setItem("pass", password);
        navigate("/verify-email");
      } else if (res.isSignedIn === true) {
        dispatch(loginAccount({ email }));
        navigate("/home");
      }
    } catch (error) {
      setLoginError(true);
      setDisabledButton(false);
      console.log("error signing in", error);
    }
  };

  useEffect(() => {
    setLoginError(false);
  }, [email, password]);

  return (
    <div className="login-page-container">
      <div className="login-page-header">Nhà tuyển dụng đăng nhập</div>
      <div className="login-form">
        <Input
          className="input-email-field"
          label="Email"
          type="email"
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
        {loginError && (
          <div className="invalid-feedback-input">
            <ErrorIcon />
            <span>Email hoặc mật khẩu không đúng.</span>
          </div>
        )}

        <Link to="/" className="forgot-password link-to-orther-page">
          Quên mật khẩu
        </Link>

        <CustomButton
          type="submit"
          color="green"
          className="login-page-loginBtn"
          onClick={handleLogin}
          disabled={disabledButton}
        >
          Nhà tuyển dụng đăng nhập
        </CustomButton>
        <div className="sign-up-section">
          <span>
            Bạn chưa có tài khoản nhà tuyển dụng?{" "}
            <Link to="/register" className="sign-up-link link-to-orther-page">
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
