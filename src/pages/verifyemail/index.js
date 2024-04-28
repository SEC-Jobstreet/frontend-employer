import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { autoSignIn, confirmSignUp, signIn } from "aws-amplify/auth";

import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import { ReactComponent as VerifyEmailDoneIcon } from "../../assets/svg/verify_email_done_icon.svg";
import { ReactComponent as VerifyEmailIcon } from "../../assets/svg/verify_email_icon.svg";
import CustomButton from "../../components/custombutton";
import CustomInput from "../../components/custominput/input";
import { loginAccount } from "../../store/user";
import RegisterHeader from "../register/header";

import "./index.css";

function VerifyEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: verify email, 2: done
  // verify email
  const [verificationCode, setVerificationCode] = useState("");
  const [errorVerificationCode, setErrorVerificationCode] = useState("");

  const [errorSubmit, setErrorSubmit] = useState(false);

  // show loading page
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setErrorSubmit(false);
  }, [verificationCode]);

  const email = localStorage.getItem("email");

  const submitVerificationCode = async () => {
    if (verificationCode.length !== 6) return;
    setShowLoading(true);
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: verificationCode,
      });
      setStep(2);

      const signInOutput = await autoSignIn();
      if (signInOutput.isSignedIn) {
        dispatch(loginAccount({ email, email_verified: true }));
        setShowLoading(false);
      }
    } catch (error) {
      if (
        error.message ===
        "The autoSignIn flow has not started, or has been cancelled/completed."
      ) {
        const pass = localStorage.getItem("pass");
        const res = await signIn({
          username: email,
          password: pass,
        });
        if (res.isSignedIn === true) {
          localStorage.removeItem("pass");
          dispatch(loginAccount({ email }));
        }
      }
      setShowLoading(false);
      setErrorSubmit(true);
      console.log("error confirming sign up", error);
    }
  };

  return (
    <>
      <div className="register-page">
        <h2>Đăng tin tuyển dụng miễn phí</h2>
        <div className="register-container">
          <RegisterHeader step={4} handleButtonStepClick={() => {}} />
          {step === 1 ? (
            <>
              <div className="verify-email-header">
                <div style={{ width: "130px" }}>
                  <VerifyEmailIcon />
                </div>
                <b
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "500",
                    marginTop: "2rem",
                    marginBotton: "1.5rem",
                  }}
                >
                  Xác nhận địa chỉ email để xác minh tài khoản của bạn
                </b>
                <span
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: "300",
                    color: "#1c1c1c",
                  }}
                >
                  Chúng tôi đã gửi mã xác nhận đến: <b>{email}</b>
                </span>
              </div>
              <CustomInput
                input={verificationCode}
                error={errorVerificationCode}
                setInput={(e) => {
                  if (e.target.value.length !== 6) {
                    setErrorVerificationCode("Vui lòng nhập mã hợp lệ.");
                  } else {
                    setErrorVerificationCode("");
                  }
                  setVerificationCode(e.target.value);
                }}
                setBlur={() => {
                  if (verificationCode === "")
                    setErrorVerificationCode(
                      "Vui lòng nhập mã trong email của bạn."
                    );
                }}
                type="number"
                label="Nhập mã"
                name="input-info employer-firstname"
              />
              <div style={{ textAlign: "left", margin: "1rem 0" }}>
                <CustomButton
                  type="button"
                  color="green"
                  onClick={submitVerificationCode}
                >
                  Gửi đi
                </CustomButton>
                <button
                  className="resend-email"
                  type="button"
                  onClick={() => {}}
                >
                  Gửi lại email
                </button>
              </div>
              {errorSubmit && (
                <div className="invalid-feedback-input">
                  <ErrorIcon />
                  <span>Vui lòng nhập mã hợp lệ</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="verify-email-header">
                <div style={{ width: "200px" }}>
                  <VerifyEmailDoneIcon />
                </div>
                <b
                  style={{
                    fontSize: "2rem",
                    fontWeight: "500",
                    marginTop: "2rem",
                    marginBottom: "1rem",
                  }}
                >
                  Email của bạn đã được xác minh.
                </b>
                <span
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: "300",
                    color: "#1c1c1c",
                  }}
                >
                  Bây giờ bạn có thể tiếp tục đăng tin tuyển dụng.
                </span>
              </div>
              <div style={{ textAlign: "left", margin: "2rem 0" }}>
                <CustomButton
                  type="button"
                  color="green"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  Tiếp tục
                </CustomButton>
              </div>
            </>
          )}
        </div>
      </div>
      {showLoading && (
        <div className="submit-loading">
          <div className="lds-ring">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      )}
    </>
  );
}

export default VerifyEmail;
