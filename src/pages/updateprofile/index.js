import React, { useEffect, useState } from "react";
import vi from "react-phone-number-input/locale/vi.json";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CountrySelect from "../../components/countryselect";
import CustomButton from "../../components/custombutton";
import CustomInput from "../../components/custominput/input";
import SuggestionInfo from "../../components/suggestioninfo";
import { selectUser } from "../../store/user";

import "./index.css";

function UpdateProfile() {
  const navigate = useNavigate();
  const profile = useSelector(selectUser);

  const [inputName, setInputName] = useState("");
  const [errorInputName, setErrorInputName] = useState(false);

  const [inputSurName, setInputSurName] = useState("");
  const [errorInputSurName, setErrorInputSurName] = useState(false);

  const [inputEmail, setInputEmail] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState(false);

  const [inputConfirmEmail, setInputConfirmEmail] = useState("");
  const [errorInputConfirmEmail, setErrorInputConfirmEmail] = useState(false);

  const [country, setCountry] = useState("VN");
  const [inputPhone, setInputPhone] = useState("");
  const [errorInputPhone, setErrorInputPhone] = useState(false);

  useEffect(() => {
    if (profile) {
      setInputName(profile.firstName);
      setInputSurName(profile.lastName);
      setInputEmail(profile.email);
      setInputConfirmEmail(profile.email);
    }
  }, [profile]);

  return (
    <div className="update-profile-page">
      <div className="update-profile-header">Cập nhật thông tin tài khoản</div>
      <div className="update-profile-container">
        <SuggestionInfo type="suggestion">
          <p>
            Thông tin tài khoản của bạn sẽ không được hiển thị trên bất kỳ quảng
            cáo việc nào của bạn.
          </p>
          <p>
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
        <div className="phone-number-container">Số điện thoại di động</div>
        <CountrySelect labels={vi} value={country} onChange={setCountry} />
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
          error={errorInputPhone}
          className="input-info-phone"
        />

        <div className="btn-container">
          <CustomButton
            type="submit"
            className="update-profile-submit"
            color="green"
            width="190.89px"
            height="50px"
            onClick={() => {}}
          >
            Cập nhật thông tin
          </CustomButton>
          <CustomButton
            type="submit"
            color="white"
            width="111.35px"
            height="50px"
            onClick={() => navigate("/account")}
          >
            Hủy bỏ
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
