import { memo } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import vi from "react-phone-number-input/locale/vi.json";

import CountrySelect from "../countryselectforphone";
import CustomInput from "../custominput/input";

function AccountCreation({
  firstName,
  setFirstName,
  errorFirstName,
  setErrorFirstName,
  lastName,
  setLastName,
  errorLastName,
  setErrorLastName,
  //   email,
  //   setEmail,
  //   errorEmail,
  //   setErrorEmail,
  //   emailConfirmation,
  //   setEmailConfirmation,
  //   errorEmailConfirmation,
  //   setErrorEmailConfirmation,
  phoneCountry,
  setPhoneCountry,
  inputPhone,
  setInputPhone,
  errorInputPhone,
  setErrorInputPhone,

  //   password,
  //   setPassword,
  //   errorPassword,
  //   setErrorPassword,
  //   passwordConfirmation,
  //   setPasswordConfirmation,
  //   errorpasswordConfirmation,
  //   setErrorPasswordConfirmation,
}) {
  return (
    <>
      <CustomInput
        input={firstName}
        error={errorFirstName}
        setInput={(e) => {
          setErrorFirstName("");
          setFirstName(e.target.value);
        }}
        setBlur={() => {
          if (firstName === "") setErrorFirstName("Vui lòng nhập tên của bạn.");
        }}
        type="text"
        label="Tên"
        name="employer-firstname"
      />
      <CustomInput
        input={lastName}
        error={errorLastName}
        setInput={(e) => {
          setErrorLastName("");
          setLastName(e.target.value);
        }}
        setBlur={() => {
          if (lastName === "") setErrorLastName("Vui lòng nhập họ của bạn.");
        }}
        type="text"
        label="Họ"
        name="employer-lastname"
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
            if (!isValidPhoneNumber(e.target.value, phoneCountry))
              setErrorInputPhone("Vui lòng nhập số điện thoại hợp lệ");
            else setErrorInputPhone("");
            setInputPhone(e.target.value);
          }}
          setBlur={() => {
            if (inputPhone === "") {
              setErrorInputPhone("Xin vui lòng nhập số điện thoại của bạn.");
            }
          }}
          type="text"
          name="input-info-phone"
          error={errorInputPhone}
          className="input-info-phone-container"
        />
      </div>
    </>
  );
}

export default memo(AccountCreation);
