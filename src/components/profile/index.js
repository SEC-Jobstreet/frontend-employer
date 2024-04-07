import { useState } from "react";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";

import Input from "./input/input";
import Radio from "./radio";
import WorkShift from "./workshift";

import "./index.css";
import "react-phone-number-input/style.css";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(false);

  const [lastName, setLastName] = useState("");
  const [errorLastName, setErrorLastName] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("+84");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

  const [address, setAddress] = useState("");
  const [errorAddress, setErrorAddress] = useState(false);

  const [workEligibility, setWorkEligibility] = useState(0); // 0: dont choose yet, 1: option 1, 2: option 2, 3: invalid (submit but didnt choose)
  const [secureSetting, setSecureSetting] = useState(0); // 0: dont choose yet, 1: option 1, 2: option 2, 3: invalid (submit but didnt choose)

  const [position, setPosition] = useState("");
  const [startingDate, setStartingDate] = useState("");

  const [whenever, setWhenever] = useState(false);
  const [particularTime, setParticularTime] = useState([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);
  const [errorWorkShift, setErrorWorkShift] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === "") {
      setErrorFirstName(true);
    }
    if (lastName === "") {
      setErrorLastName(true);
    }
    if (
      phoneNumber === "" ||
      phoneNumber === undefined ||
      !isPossiblePhoneNumber(phoneNumber)
    ) {
      setErrorPhoneNumber(true);
    }
    if (address === "") {
      setErrorAddress(true);
    }
    if (workEligibility === 0) {
      setWorkEligibility(3);
    }
    if (secureSetting === 0) {
      setSecureSetting(3);
    }
    if (!whenever) {
      let check = false;
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 7; j += 1) {
          if (particularTime[i][j]) {
            check = true;
            break;
          }
        }
        if (check) break;
      }
      if (!check) setErrorWorkShift(true);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
  };
  return (
    <div className="my-profile">
      <h3 className="my-profile-tilte fw-bold fs-2">Tạo hồ sơ</h3>
      <form id="myProfile" onSubmit={handleSubmit}>
        <Input
          setInput={setFirstName}
          input={firstName}
          error={errorFirstName}
          type="text"
          label="Tên"
          errorMessage="Mục này bắt buộc"
          name="firstName"
          required
        />
        <Input
          setInput={setLastName}
          input={lastName}
          error={errorLastName}
          type="text"
          label="Họ"
          errorMessage="Mục này bắt buộc"
          name="lastName"
          required
        />
        <div className="phone-number-title">Số điện thoại</div>
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="VN"
          value={phoneNumber}
          onChange={(e) => {
            if (e === undefined) {
              setPhoneNumber("+84");
            } else setPhoneNumber(e);
          }}
        />
        {errorPhoneNumber &&
          (phoneNumber === undefined ||
          phoneNumber === "" ||
          phoneNumber === "+84" ? (
            <div className="invalid-feedback-input">Mục này bắt buộc</div>
          ) : (
            !isPossiblePhoneNumber(phoneNumber || "") && (
              <div className="invalid-feedback-input">
                Vui lòng nhập số điện thoại hợp lệ
              </div>
            )
          ))}
        {/* create google api key and add react google autocomplete when needed */}
        <Input
          setInput={setAddress}
          input={address}
          error={errorAddress}
          type="text"
          label="Địa chỉ"
          errorMessage="Vui lòng nhập địa chỉ của bạn"
          name="address"
          required
        >
          <span className="address-description">
            Chia sẻ địa chỉ của bạn để xem được nhiều hơn các vị trị gần đó. Chỉ
            tên huyện/tỉnh sẽ hiển thị trên hồ sơ của bạn.
          </span>
        </Input>
        <div className="work-eligibility">
          <div className="work-eligibility-title">
            Điều nào sau đây miêu tả đúng nhất thị thực làm việc của bạn ở Việt
            Nam?
          </div>

          <Radio
            value={workEligibility}
            checkedValue={1}
            setValue={setWorkEligibility}
            id="workEligibility1"
          >
            <p>
              Tôi <b>không phải</b> là Công dân hay Thường trú nhân của Việt Nam
              và tôi cần Nhà tuyển dụng nộp đơn xin giấy phép lao động/giấy
              phép/visa cho tôi.
            </p>
          </Radio>

          <Radio
            value={workEligibility}
            checkedValue={2}
            setValue={setWorkEligibility}
            id="workEligibility2"
          >
            <p>
              Tôi là Công dân, Thường trú nhân hoặc có tư cách tương tự ở Việt
              Nam và sẽ không cần Nhà tuyển dụng nộp đơn xin giấy phép lao
              động/giấy phép/visa cho tôi.
            </p>
          </Radio>

          {workEligibility === 3 && (
            <div className="invalid-feedback-input">Mục này bắt buộc</div>
          )}
        </div>

        <Input
          setInput={setPosition}
          input={position}
          type="text"
          label="Chức danh hiện tại (tùy chọn)"
          name="position"
        />

        {position !== "" && (
          <Input
            setInput={setStartingDate}
            input={startingDate}
            type="date"
            label="Ngày bắt đầu vị trí hiện tại (tùy chọn)"
            name="currentRoleStartDate"
            max="2024-04-07"
          />
        )}

        <WorkShift
          whenever={whenever}
          setWhenever={setWhenever}
          particularTime={particularTime}
          setParticularTime={setParticularTime}
          errorWorkShift={errorWorkShift}
        />

        <div className="work-eligibility">
          <h3>Cài đặt Bảo Mật</h3>

          <Radio
            value={secureSetting}
            checkedValue={1}
            setValue={setSecureSetting}
            id="secureSetting1"
          >
            <div>
              <p>
                Chia sẻ hồ sơ<span>Gợi ý</span>
              </p>
              <p>
                Nhà tuyển dụng có thể xem hồ sơ của tôi và liên hệ với tôi về
                các cơ hội việc làm tiềm năng.
              </p>
            </div>
          </Radio>

          <Radio
            value={secureSetting}
            checkedValue={2}
            setValue={setSecureSetting}
            id="secureSetting2"
          >
            <div>
              <p>
                Chia sẻ hồ sơ<span>Gợi ý</span>
              </p>
              <p>
                Nhà tuyển dụng có thể xem hồ sơ của tôi và liên hệ với tôi về
                các cơ hội việc làm tiềm năng.
              </p>
            </div>
          </Radio>

          {secureSetting === 3 && (
            <div className="invalid-feedback-input">Mục này bắt buộc</div>
          )}
        </div>
        <div>
          <hr className="my-8 h-px border-t-grey-100" />
        </div>
        <div className="button-cancel-submit row">
          <button
            type="button"
            className="cancel-create-profile col"
            onClick={handleCancel}
          >
            Huỷ bỏ
          </button>
          <button
            type="submit"
            className="submit-create-profile col"
            onClick={handleSubmit}
          >
            Tạo hồ sơ
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
