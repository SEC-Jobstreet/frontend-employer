/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";

import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import DropdownButton from "../../components/customdropdown";
import CustomInput from "../../components/custominput/input";
import SuggestionInfo from "../../components/suggestioninfo";

import countryCodes from "./countrycode";

import "./index.css";

const dropdownOptions = Object.entries(countryCodes).map(
  ([key, value], index) => ({
    label: `${key} +${value}`,
    id: index + 1,
  })
);

function UpdateProfile() {
  const [inputName, setInputName] = useState("");
  const [errorInputName, setErrorInputName] = useState(false);

  const [inputSurName, setInputSurName] = useState("");
  const [errorInputSurName, setErrorInputSurName] = useState(false);

  const [inputEmail, setInputEmail] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState(false);

  const [inputConfirmEmail, setInputConfirmEmail] = useState("");
  const [errorInputConfirmEmail, setErrorInputConfirmEmail] = useState(false);

  const [inputPhone, setInputPhone] = useState("");
  const [errorInputPhone, setErrorInputPhone] = useState(false);

  const [phoneCode, setPhoneCode] = useState("VN +84");

  const handleSelectPhoneCode = (eventKey) => {
    const selectedOption = dropdownOptions.find(
      (option) => option.id === parseInt(eventKey, 10)
    );
    if (selectedOption) {
      setPhoneCode(selectedOption.label);
    }
  };
  return (
    <div className="update-profile-page">
      <div className="update-profile-header">Cập nhật thông tin tài khoản</div>
      <div className="update-profile-container">
        <SuggestionInfo type="suggestion">
          <p
            style={{
              lineHeight: "1.6",
            }}
          >
            Thông tin tài khoản của bạn sẽ không được hiển thị trên bất kỳ quảng
            cáo việc nào của bạn.
          </p>
          <p
            style={{
              lineHeight: "1.6",
            }}
          >
            Tất cả các hồ sơ xin việc mới sẽ được gửi đến địa chỉ email này.
          </p>
        </SuggestionInfo>
        <CustomInput
          input={inputName}
          error={errorInputName}
          setInput={(e) => {
            setErrorInputName(false);
            setInputName(e.target.value);
          }}
          setBlur={() => {
            if (inputName === "") setErrorInputName(true);
          }}
          type="text"
          label="Tên"
          errorMessage="Vui lòng nhập tên của bạn."
          name="input-info"
        />
        <CustomInput
          input={inputSurName}
          error={errorInputSurName}
          setInput={(e) => {
            setErrorInputSurName(false);
            setInputSurName(e.target.value);
          }}
          setBlur={() => {
            if (inputSurName === "") setErrorInputSurName(true);
          }}
          type="text"
          label="Họ"
          errorMessage="Vui lòng nhập họ của bạn."
          name="input-info"
        />
        <CustomInput
          input={inputEmail}
          error={errorInputEmail}
          setInput={(e) => {
            setErrorInputEmail(false);
            setInputEmail(e.target.value);
          }}
          setBlur={() => {
            if (inputEmail === "") setErrorInputEmail(true);
          }}
          type="text"
          label="Email"
          errorMessage="Hãy điền địa chỉ email của bạn."
          name="input-info"
        />
        <p
          style={{
            fontSize: "14px",
          }}
        >
          Email này sẽ được dùng để đăng nhập vào tài khoản của bạn. Tất cả các
          email trong tương lai sẽ được gửi tới đó.
        </p>
        <CustomInput
          input={inputConfirmEmail}
          error={errorInputConfirmEmail}
          setInput={(e) => {
            setErrorInputConfirmEmail(false);
            setInputConfirmEmail(e.target.value);
          }}
          setBlur={() => {
            if (inputConfirmEmail === "") setErrorInputConfirmEmail(true);
          }}
          type="text"
          label="Xác nhận email"
          errorMessage="Hãy điền địa chỉ email của bạn."
          name="input-info"
        />
        <div className="phone-number-container">
          <label htmlFor="input-info-phone" className="phone-number-label">
            Số điện thoại di động
          </label>
          <div className="phone-number-input">
            <DropdownButton
              title={phoneCode}
              options={dropdownOptions}
              onSelect={handleSelectPhoneCode}
              value={phoneCode}
              className="custom-dropdown"
            />
            <CustomInput
              input={inputPhone}
              setInput={(e) => {
                setErrorInputPhone(false);
                setInputPhone(e.target.value);
              }}
              setBlur={() => {
                if (inputPhone === "") setErrorInputPhone(true);
              }}
              type="text"
              name="input-info-phone"
              className="input-info-phone"
            />
          </div>
        </div>

        {errorInputPhone && (
          <div className="invalid-feedback-input">
            <ErrorIcon />
            Xin vui lòng nhập số điện thoại của bạn.
          </div>
        )}

        <div className="btn-container">
          <button type="submit" className="rounded-button-primary btn-update">
            Cập nhật thông tin
          </button>
          <button type="submit" className="rounded-button-primary btn-cancel">
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
