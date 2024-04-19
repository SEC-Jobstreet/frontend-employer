import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import hidePasswordIcon from "../../assets/svg/hide_password.svg";
import showPasswordIcon from "../../assets/svg/show_password.svg";
import CustomButton from "../../components/custombutton";
import CustomInput from "../../components/custominput/input";

import "./index.css";

function UpdatePassword() {
  const [inputPassword, setInputPassword] = useState("");
  const [errorInputPassword, setErrorInputPassword] = useState(false);

  const [inputNewPassword, setInputNewPassword] = useState("");
  const [errorInputNewPassword, setErrorInputNewPassword] = useState(false);

  const [inputConfirmNewPassword, setInputConfirmNewPassword] = useState("");
  const [errorInputConfirmNewPassword, setErrorInputConfirmNewPassword] =
    useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [errorLine, setErrorLine] = useState("");

  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const noSpaces = !/\s/.test(password);
    const minLength = password.length >= 8;

    return hasUpperCase && hasNumber && noSpaces && minLength;
  };

  const validateForm = () => {
    if (
      !inputPassword ||
      !inputNewPassword ||
      !inputConfirmNewPassword ||
      errorInputPassword ||
      errorInputNewPassword ||
      errorInputConfirmNewPassword
    )
      return false;
    return true;
  };

  useEffect(() => {
    if (!inputPassword) setErrorInputPassword("Hãy điền mật khẩu");
    else if (!validatePassword(inputPassword))
      setErrorInputPassword(
        "Mật khẩu phải có ít nhất 8 ký tự, chứa ít nhất một chữ cái viết hoa, một con số và không có dấu cách"
      );
    else setErrorInputPassword("");
  }, [inputPassword]);

  useEffect(() => {
    if (!inputNewPassword) setErrorInputNewPassword("Hãy điền mật khẩu");
    else if (!validatePassword(inputNewPassword))
      setErrorInputNewPassword(
        "Mật khẩu phải có ít nhất 8 ký tự, chứa ít nhất một chữ cái viết hoa, một con số và không có dấu cách"
      );
    else setErrorInputNewPassword("");
  }, [inputNewPassword]);

  useEffect(() => {
    if (!inputConfirmNewPassword)
      setErrorInputConfirmNewPassword("Hãy điền mật khẩu");
    else if (inputConfirmNewPassword !== inputNewPassword)
      setErrorInputConfirmNewPassword("Mật khẩu không trùng khớp");
    else setErrorInputConfirmNewPassword("");
  }, [inputConfirmNewPassword]);

  useEffect(() => {
    setErrorInputPassword("");
    setErrorInputNewPassword("");
    setErrorInputConfirmNewPassword("");
  }, []);

  return (
    <div className="update-container">
      <div className="update-header">Cập nhật mật khẩu</div>
      <div className="update-info">
        <CustomInput
          input={inputPassword}
          error={errorInputPassword}
          setInput={(e) => {
            setInputPassword(e.target.value);
          }}
          setBlur={() => {
            if (!inputPassword) setErrorInputPassword("Hãy điền mật khẩu");
          }}
          type={showPassword ? "text" : "password"}
          label="Mật khẩu hiện tại"
          name="input-info"
          className="input-password-field"
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
        </CustomInput>
        <CustomInput
          input={inputNewPassword}
          error={errorInputNewPassword}
          setInput={(e) => {
            setInputNewPassword(e.target.value);
          }}
          setBlur={() => {
            if (!inputNewPassword)
              setErrorInputNewPassword("Hãy điền mật khẩu");
          }}
          type={showPassword ? "text" : "password"}
          label="Mật khẩu mới"
          name="input-info"
        />
        <div style={{ fontSize: "1.3rem" }}>
          Mật khẩu phải có ít nhất 8 ký tự, chứa ít nhất một chữ cái viết hoa,
          một con số và không có dấu cách.
        </div>
        <CustomInput
          input={inputConfirmNewPassword}
          error={errorInputConfirmNewPassword}
          setInput={(e) => {
            setInputConfirmNewPassword(e.target.value);
          }}
          setBlur={() => {
            if (!inputConfirmNewPassword)
              setErrorInputConfirmNewPassword("Hãy điền mật khẩu");
          }}
          type={showPassword ? "text" : "password"}
          label="Xác nhận mật khẩu mới"
          name="input-info"
        />
        <div className="btns-contaniner">
          <CustomButton
            color="green"
            onClick={() => {
              if (!errorInputPassword && !inputPassword)
                setErrorInputPassword("Hãy điền mật khẩu");
              if (!errorInputNewPassword && !inputNewPassword)
                setErrorInputNewPassword("Hãy điền mật khẩu");
              if (!errorInputConfirmNewPassword && !inputConfirmNewPassword)
                setErrorInputConfirmNewPassword("Hãy điền mật khẩu");

              if (!validateForm()) {
                setErrorLine(
                  "Có lỗi trên trang này. Xin vui lòng sửa lại lỗi được đánh dấu"
                );
                console.log("LOGIN FAILED");
              } else console.log("LOGIN SUCCEED");
            }}
          >
            Cập nhật lại mật khẩu
          </CustomButton>
          <CustomButton
            onClick={() => {
              navigate("/account");
            }}
          >
            Hủy bỏ
          </CustomButton>
        </div>
        {errorLine &&
          (errorInputPassword ||
            errorInputNewPassword ||
            errorInputConfirmNewPassword) && (
            <div className="error-line invalid-feedback-input">
              <ErrorIcon />
              <span>{errorLine}</span>
            </div>
          )}
      </div>
    </div>
  );
}

export default UpdatePassword;
