import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  // Password validation function
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const noSpaces = !/\s/.test(password);
    const minLength = password.length >= 8;

    return hasUpperCase && hasNumber && noSpaces && minLength;
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/account");
  };

  return (
    <div className="update-container">
      <div className="update-header">Cập nhật mật khẩu</div>
      <div className="update-info">
        <CustomInput
          input={inputPassword}
          error={errorInputPassword}
          setInput={(e) => {
            setErrorInputPassword(false);
            setInputPassword(e.target.value);
          }}
          setBlur={() => {
            if (inputPassword === "") setErrorInputPassword(true);
          }}
          type="password"
          label="Mật khẩu hiện tại"
          errorMessage="Hãy điền mật khẩu."
          name="input-info"
        />
        <CustomInput
          input={inputNewPassword}
          error={errorInputNewPassword}
          setInput={(e) => {
            const newPassword = e.target.value;
            setErrorInputNewPassword(false);
            setInputNewPassword(newPassword);
            if (!validatePassword(newPassword)) {
              setErrorInputNewPassword(true);
            }
          }}
          setBlur={() => {
            if (
              inputNewPassword === "" ||
              !validatePassword(inputNewPassword)
            ) {
              setErrorInputNewPassword(true);
            }
          }}
          type="password"
          label="Mật khẩu mới"
          errorMessage="Hãy điền mật khẩu."
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
            setErrorInputConfirmNewPassword(false);
            setInputConfirmNewPassword(e.target.value);
          }}
          setBlur={() => {
            if (
              inputConfirmNewPassword === "" ||
              inputConfirmNewPassword !== inputNewPassword
            ) {
              setErrorInputConfirmNewPassword(true);
            }
          }}
          type="password"
          label="Xác nhận mật khẩu mới"
          errorMessage="Mật khẩu không khớp."
          name="input-info"
        />
        <div className="btn-container">
          <button type="submit" className="rounded-button-primary btn-update">
            Cập nhật lại mật khẩu
          </button>
          <button
            type="submit"
            className="rounded-button-primary btn-cancel"
            onClick={handleCancel}
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
