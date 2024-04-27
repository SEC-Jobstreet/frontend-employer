import React, { useState } from "react";

import { ReactComponent as ProgressStep } from "../../assets/svg/progress_step.svg";
import { ReactComponent as Image } from "../../assets/svg/verify_email.svg";
import CustomInput from "../../components/custominput/input";

import "./index.css";

function VerifyEmail() {
  const [inputCode, setInputCode] = useState("");
  const [errorInputCode, setErrorInputCode] = useState(false);
  const email = "abc@gmail.com";

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const resendEmail = () => {
    // Handle resend email
  };

  return (
    <div className="verify-page">
      <h1 className="verify-header">Tạo tài khoản để đăng tin tuyển dụng</h1>
      <div className="card">
        <div className="progress-indicator">
          <div className="progress-step">
            <ProgressStep />
            <div className="step-label">Tạo công việc</div>
          </div>
          <div className="progress-line" />
          <div className="progress-step">
            <ProgressStep />
            <div className="step-label">Tạo doanh nghiệp</div>
          </div>
          <div className="progress-line" />
          <div className="progress-step">
            <div className="circle">3</div>
            <div className="step-label">Tạo tài khoản</div>
          </div>
        </div>
        <div className="email-verification">
          <Image className="verify-img" />
          <div className="title">
            Xác nhận địa chỉ email để xác minh tài khoản của bạn
          </div>
          <div className="sub-title">
            Chúng tôi đã gửi mã xác nhận đến: <strong>{email}</strong>
          </div>
          <form onSubmit={handleSubmit}>
            <CustomInput
              input={inputCode}
              error={errorInputCode}
              setInput={(e) => {
                setErrorInputCode(false);
                setInputCode(e.target.value);
              }}
              setBlur={() => {
                if (inputCode === "") setErrorInputCode(true);
              }}
              type="text"
              label="Nhập mã"
              errorMessage="Vui lòng nhập mã trong email của bạn."
              name="input-info"
            />
          </form>
        </div>
        <div className="btn-action">
          <button type="submit" className="submit-button">
            Gửi đi
          </button>
          <button type="button" onClick={resendEmail} className="resend-button">
            Gửi lại email
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
