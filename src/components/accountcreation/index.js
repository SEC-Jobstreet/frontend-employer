import { memo, useEffect, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import vi from "react-phone-number-input/locale/vi.json";

import hidePasswordIcon from "../../assets/svg/hide_password.svg";
import showPasswordIcon from "../../assets/svg/show_password.svg";
import CountrySelect from "../countryselectforphone";
import CustomInput from "../custominput/input";

import "./index.css";

function AccountCreation({
  firstName,
  setFirstName,
  errorFirstName,
  setErrorFirstName,
  lastName,
  setLastName,
  errorLastName,
  setErrorLastName,
  email,
  setEmail,
  errorEmail,
  setErrorEmail,
  emailConfirmation,
  setEmailConfirmation,
  errorEmailConfirmation,
  setErrorEmailConfirmation,
  phoneCountry,
  setPhoneCountry,
  inputPhone,
  setInputPhone,
  errorInputPhone,
  setErrorInputPhone,
  password,
  setPassword,
  errorPassword,
  setErrorPassword,
  passwordConfirmation,
  setPasswordConfirmation,
  errorpasswordConfirmation,
  setErrorPasswordConfirmation,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (emailCheck) => {
    const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
    return emailPattern.test(emailCheck);
  };

  const validatePassword = (passwordCheck) => {
    const passwordPattern =
      /^(?=(.*[a-z]){0,})(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\-__+.]){0,})(?=\S+$).{8,}$/;
    return passwordPattern.test(passwordCheck);
  };

  useEffect(() => {
    if (!firstName) setErrorFirstName("Vui lòng nhập tên của bạn.");
    else setErrorFirstName("");
  }, [firstName]);

  useEffect(() => {
    if (!lastName) setErrorLastName("Vui lòng nhập họ của bạn.");
    else setErrorLastName("");
  }, [lastName]);

  useEffect(() => {
    if (!email) setErrorEmail("Hãy điền địa chỉ email của bạn.");
    else if (!validateEmail(email))
      setErrorEmail("Xin vui lòng nhập một địa chỉ email hợp lệ.");
    else setErrorEmail("");
    if (emailConfirmation && email !== emailConfirmation)
      setErrorEmailConfirmation(
        "Vui lòng kiểm tra xem các email có khớp không."
      );
    if (emailConfirmation && email === emailConfirmation)
      setErrorEmailConfirmation("");
    if (!emailConfirmation && email)
      setErrorEmailConfirmation(
        "Vui lòng kiểm tra xem các email có khớp không."
      );
    if (emailConfirmation && !email) setErrorEmailConfirmation("");
  }, [email]);

  useEffect(() => {
    if (email && emailConfirmation !== email)
      setErrorEmailConfirmation(
        "Vui lòng kiểm tra xem các email có khớp không."
      );
    else setErrorEmailConfirmation("");
  }, [emailConfirmation]);

  useEffect(() => {
    if (!inputPhone) setErrorInputPhone("Vui lòng số điện thoại của bạn");
    else if (!isValidPhoneNumber(inputPhone, phoneCountry))
      setErrorInputPhone("Xin vui lòng nhập số điện thoại hợp lệ");
    else setErrorInputPhone("");
  }, [inputPhone]);

  useEffect(() => {
    if (!password) setErrorPassword("Hãy điền mật khẩu");
    else if (!validatePassword(password))
      setErrorPassword(
        "Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái viết hoa, một con số và không có dấu cách."
      );
    else setErrorPassword("");
    if (passwordConfirmation && password !== passwordConfirmation)
      setErrorPasswordConfirmation("Mật khẩu không trùng khớp.");
    if (passwordConfirmation && password === passwordConfirmation)
      setErrorPasswordConfirmation("");
    if (passwordConfirmation && !password) setErrorPasswordConfirmation("");
  }, [password]);

  useEffect(() => {
    if (!passwordConfirmation)
      setErrorPasswordConfirmation("Hãy điền mật khẩu");
    else if (password && passwordConfirmation !== password)
      setErrorPasswordConfirmation("Mật khẩu không trùng khớp.");
    else setErrorPasswordConfirmation("");
  }, [passwordConfirmation]);

  useEffect(() => {
    setErrorFirstName("");
    setErrorLastName("");
    setErrorEmail("");
    setErrorEmailConfirmation("");
    setErrorInputPhone("");
    setErrorPassword("");
    setErrorPasswordConfirmation("");
  }, []);

  return (
    <div className="account-creation-container">
      <CustomInput
        input={firstName}
        error={errorFirstName}
        setInput={(e) => {
          setFirstName(e.target.value);
        }}
        setBlur={() => {
          if (firstName === "") setErrorFirstName("Vui lòng nhập tên của bạn.");
        }}
        type="text"
        label="Tên"
        name="input-info employer-firstname"
      />
      <CustomInput
        input={lastName}
        error={errorLastName}
        setInput={(e) => {
          setLastName(e.target.value);
        }}
        setBlur={() => {
          if (lastName === "") setErrorLastName("Vui lòng nhập họ của bạn.");
        }}
        type="text"
        label="Họ"
        name="input-info employer-lastname"
      />
      <CustomInput
        input={email}
        error={errorEmail}
        setInput={(e) => {
          setEmail(e.target.value);
        }}
        setBlur={() => {
          if (email === "") setErrorEmail("Hãy điền địa chỉ email của bạn.");
        }}
        type="text"
        label="Email"
        name="input-info employer-email"
      />
      <CustomInput
        input={emailConfirmation}
        error={errorEmailConfirmation}
        setInput={(e) => {
          setEmailConfirmation(e.target.value);
        }}
        type="text"
        label="Xác nhận email"
        name="input-info employer-email-confirmation"
      />
      <div className="phone-number-container">Số điện thoại di động</div>
      <div className="phone-number-content">
        <CountrySelect
          labels={vi}
          value={phoneCountry}
          onChange={setPhoneCountry}
        />
        <CustomInput
          input={inputPhone}
          setInput={(e) => {
            setInputPhone(e.target.value);
          }}
          setBlur={() => {
            if (inputPhone === "") {
              setErrorInputPhone("Xin vui lòng nhập số điện thoại của bạn.");
            }
          }}
          type="text"
          name="input-info input-info-phone"
          error={errorInputPhone}
          className="input-info-phone-container"
        />
      </div>
      <p>Thông tin này sẽ không hiển thị trên quảng cáo của bạn</p>

      <CustomInput
        input={password}
        error={errorPassword}
        setInput={(e) => {
          setPassword(e.target.value);
        }}
        setBlur={() => {
          if (password === "") setErrorPassword("Hãy điền mật khẩu");
        }}
        type={showPassword ? "text" : "password"}
        label="Mật khẩu"
        name="input-info employer-password"
        className="input-password-field"
      >
        <div className="password-icon">
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            <img
              src={showPassword ? hidePasswordIcon : showPasswordIcon}
              alt=""
            />{" "}
          </button>
        </div>
      </CustomInput>
      <p>
        Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái viết hoa,
        một con số và không có dấu cách.
      </p>
      <CustomInput
        input={passwordConfirmation}
        error={errorpasswordConfirmation}
        setInput={(e) => {
          setPasswordConfirmation(e.target.value);
        }}
        setBlur={() => {
          if (passwordConfirmation === "")
            setErrorPasswordConfirmation("Hãy điền mật khẩu");
        }}
        type={showPassword ? "text" : "password"}
        label="Xác nhận mật khẩu"
        name="input-info employer-password-confirmation"
      />
    </div>
  );
}

export default memo(AccountCreation);
