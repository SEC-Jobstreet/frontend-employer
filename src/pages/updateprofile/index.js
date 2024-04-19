import React, { useEffect, useState } from "react";
import vi from "react-phone-number-input/locale/vi.json";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
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
  const [errorInputName, setErrorInputName] = useState("");

  const [inputSurName, setInputSurName] = useState("");
  const [errorInputSurName, setErrorInputSurName] = useState("");

  const [inputEmail, setInputEmail] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState("");

  const [inputConfirmEmail, setInputConfirmEmail] = useState("");
  const [errorInputConfirmEmail, setErrorInputConfirmEmail] = useState("");

  const [country, setCountry] = useState("VN");
  const [inputPhone, setInputPhone] = useState("");
  const [errorInputPhone, setErrorInputPhone] = useState("");

  const [errorLine, setErrorLine] = useState("");

  useEffect(() => {
    if (profile) {
      setInputName(profile.firstName);
      setInputSurName(profile.lastName);
      setInputEmail(profile.email);
      setInputConfirmEmail(profile.email);
      setInputPhone(profile.phone);
    }
  }, [profile]);

  useEffect(() => {
    if (!inputName) setErrorInputName("Vui lòng nhập tên của bạn");
    else setErrorInputName("");
  }, [inputName]);
  useEffect(() => {
    if (!inputSurName) setErrorInputSurName("Vui lòng nhập họ của bạn");
    else setErrorInputSurName("");
  }, [inputSurName]);
  useEffect(() => {
    if (!inputEmail) setErrorInputEmail("Hãy điền địa chỉ email của bạn");
    else setErrorInputEmail("");
  }, [inputEmail]);
  useEffect(() => {
    if (!inputConfirmEmail)
      setErrorInputConfirmEmail("Hãy điền địa chỉ email của bạn");
    else if (inputConfirmEmail !== inputEmail)
      setErrorInputConfirmEmail(
        "Vui lòng kiểm tra xem các email có khớp không"
      );
    else setErrorInputConfirmEmail("");
  }, [inputConfirmEmail]);
  useEffect(() => {
    if (!inputPhone)
      setErrorInputPhone("Xin vui lòng nhập số điện thoại của bạn");
    else setErrorInputPhone("");
  }, [inputPhone]);

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
            setInputName(e.target.value);
          }}
          type="text"
          label="Tên"
          name="input-info"
        />
        <CustomInput
          input={inputSurName}
          error={errorInputSurName}
          setInput={(e) => {
            setInputSurName(e.target.value);
          }}
          type="text"
          label="Họ"
          name="input-info"
        />
        <CustomInput
          input={inputEmail}
          error={errorInputEmail}
          setInput={(e) => {
            setInputEmail(e.target.value);
          }}
          type="text"
          label="Email"
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
            setInputConfirmEmail(e.target.value);
          }}
          type="text"
          label="Xác nhận email"
          name="input-info"
        />
        <div className="phone-number-container">Số điện thoại di động</div>
        <div className="phone-number-content">
          <CountrySelect labels={vi} value={country} onChange={setCountry} />
          <CustomInput
            input={inputPhone}
            setInput={(e) => {
              setInputPhone(e.target.value);
            }}
            type="text"
            name="input-info-phone"
            error={errorInputPhone}
            className="input-info-phone-container"
          />
        </div>
        <div className="btn-container">
          <CustomButton
            type="submit"
            className="update-profile-submit"
            color="green"
            width="190.89px"
            height="50px"
            onClick={() => {
              if (
                !errorInputName &&
                !errorInputSurName &&
                !errorInputEmail &&
                !errorInputConfirmEmail &&
                !errorInputPhone
              ) {
                console.log("UPDATE SUCCEED");
              } else {
                setErrorLine(
                  "Có lỗi trên trang này. Xin vui lòng sửa lại lỗi được đánh dấu"
                );
                console.log("UPDATE FAILED");
              }
            }}
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
        {errorLine &&
          (errorInputName ||
            errorInputSurName ||
            errorInputEmail ||
            errorInputConfirmEmail ||
            errorInputPhone) && (
            <div className="error-line invalid-feedback-input">
              <ErrorIcon />
              <span>{errorLine}</span>
            </div>
          )}
      </div>
    </div>
  );
}

export default UpdateProfile;
