import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import Accountcreation from "../../components/accountcreation";
import CustomButton from "../../components/custombutton";
import Enterprisecreating from "../../components/enterprisecreating";
import JobPosting from "../../components/jobposting/job-posting";

import "./index.css";

function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(3); // 1: Tạo công việc, 2: Tạo doanh nghiệp, 3: Tạo tài khoản, 4: verify
  const [errorNextStep, setErrorNextStep] = useState(false); // 1: Tạo công việc, 2: Tạo doanh nghiệp, 3: Tạo tài khoản, 4: verify

  const [jobTitle, setJobTitle] = useState("");
  const [errorJobTitle, setErrorJobTitle] = useState(false);

  const [jobType, setJobType] = useState(0); // 0: chưa chọn, 1: toàn thời gian, 2: bán thời gian, 3: tạm thời, 4: chưa chọn sau khi submit

  const [whenever, setWhenever] = useState(false);
  const [particularTime, setParticularTime] = useState([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);
  const [errorWorkShift, setErrorWorkShift] = useState(false);

  const [visa, setVisa] = useState(false);

  const [workExperience, setWorkExperience] = useState(0); // 0: chưa chọn, 1: 0 kn, 2: 1kn, 3: 23kn, 4: 4kn, 5: chưa chọn sau khi submit

  const [startDate, setStartDate] = useState("");
  const [errorStartDate, setErrorStartDate] = useState("");

  const [currency, setCurrency] = useState("VND");
  const [salaryLevelDisplay, setSalaryLevelDisplay] = useState(1); // 1: chính xác, 2: khoảng lương
  const [salary, setSalary] = useState("");
  const [salaryRange, setSalaryRange] = useState(["", ""]);
  const [paidPeriod, setPaidPeriod] = useState(4); //  1: giờ, 2: ngày, 3: tuần, 4: tháng, 5: năm
  const [errorSalaryRange, setErrorSalaryRange] = useState(false); //  1: giờ, 2: ngày, 3: tuần, 4: tháng, 5: năm

  const [jobDescription, setJobDescription] = useState("");
  const [errorJobDescription, setErrorJobDescription] = useState("");
  const quillRef = useRef();

  // Enterprise Creation
  const [enterpriseName, setEnterpriseName] = useState("");
  const [errorEnterpriseName, setErrorEnterpriseName] = useState("");

  const [country, setCountry] = useState("VN");

  const [enterpriseAddress, setEnterpriseAddress] = useState("");
  const [errorEnterpriseAddress, setErrorEnterpriseAddress] = useState("");

  const [enterpriseField, setEnterpriseField] = useState(0);
  const [errorEnterpriseField, setErrorEnterpriseField] = useState(false);

  const [enterpriseSize, setEnterpriseSize] = useState(0);
  const [errorEnterpriseSize, setErrorEnterpriseSize] = useState(false);

  const [employerRole, setEmployerRole] = useState(0);
  const [errorEmployerRole, setErrorEmployerRole] = useState(false);

  const [enterpriseURL, setEnterpriseURL] = useState("");
  const [enterpriseLicense, setEnterpriseLicense] = useState("");

  // account creation
  const [firstName, setFirstName] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");

  const [lastName, setLastName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [errorEmailConfirmation, setErrorEmailConfirmation] = useState("");

  const [phoneCountry, setPhoneCountry] = useState("VN");
  const [inputPhone, setInputPhone] = useState("");
  const [errorInputPhone, setErrorInputPhone] = useState("");

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorpasswordConfirmation, setErrorPasswordConfirmation] =
    useState("");

  useEffect(() => {
    if (errorNextStep) setErrorNextStep(false);
  }, [
    jobTitle,
    particularTime,
    whenever,
    startDate,
    salaryRange,
    jobDescription,
  ]);

  useEffect(() => {
    if (
      errorNextStep &&
      errorEnterpriseName === "" &&
      errorEnterpriseAddress === "" &&
      errorEnterpriseField === false &&
      errorEnterpriseSize === false &&
      errorEmployerRole === false
    )
      setErrorNextStep(false);
  }, [
    errorEnterpriseName,
    errorEnterpriseAddress,
    errorEnterpriseField,
    errorEnterpriseSize,
    errorEmployerRole,
  ]);

  useEffect(() => {
    if (
      errorNextStep &&
      !errorFirstName &&
      !errorLastName &&
      !errorEmail &&
      !errorEmailConfirmation &&
      !errorInputPhone &&
      !errorPassword &&
      !errorpasswordConfirmation
    )
      setErrorNextStep(false);
  }, [
    errorFirstName,
    errorLastName,
    errorEmail,
    errorEmailConfirmation,
    errorInputPhone,
    errorPassword,
    errorpasswordConfirmation,
  ]);

  const handleButtonStep1 = () => {
    // verify
    let next = true;
    if (errorJobTitle || jobTitle === "") {
      next = false;
      setErrorJobTitle("Vui lòng nhập chức danh công việc");
    }
    if (jobType === 0 || jobType === 4) {
      next = false;
      setJobType(4);
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
      if (!check) {
        next = false;
        setErrorWorkShift(true);
      }
    }
    if (workExperience === 0) {
      next = false;
      setWorkExperience(5);
    }
    if (
      errorSalaryRange ||
      (salaryLevelDisplay.toString() === "2" &&
        parseInt(salaryRange[0], 10) > parseInt(salaryRange[1], 10))
    ) {
      next = false;
      setErrorSalaryRange(true);
    }
    if (quillRef.current) {
      if (quillRef.current.unprivilegedEditor.getLength() === 1) {
        next = false;
        setErrorJobDescription("Xin vui lòng nhập một mô tả công việc.");
      } else if (quillRef.current.unprivilegedEditor.getLength() < 201) {
        next = false;
        setErrorJobDescription(
          "Xin vui lòng đảm bảo mô tả công việc của bạn có độ dài ít nhất 200 ký tự."
        );
      }
    }
    if (next) {
      setErrorNextStep(false);
      setStep(2);
    } else setErrorNextStep(true);
  };

  const handleButtonStep2 = () => {
    let next = true;
    if (enterpriseName.length < 2) {
      next = false;
      if (enterpriseName === "")
        setErrorEnterpriseName("Vui lòng nhập tên doanh nghiệp.");
      else setErrorEnterpriseName("Vui lòng nhập tên doanh nghiệp hợp lệ.");
    }
    if (enterpriseAddress === "") {
      next = false;
      setErrorEnterpriseAddress("Vui lòng nhập tên địa chỉ của doanh nghiệp");
    }
    if (enterpriseField.toString() === "0") {
      next = false;
      setErrorEnterpriseField(true);
    }
    if (enterpriseSize.toString() === "0") {
      next = false;
      setErrorEnterpriseSize(true);
    }
    if (employerRole.toString() === "0") {
      next = false;
      setErrorEmployerRole(true);
    }
    if (next) {
      setErrorNextStep(false);
      setStep(3);
    } else {
      setErrorNextStep(true);
    }
  };

  const submit = () => {
    // verify account
    // -> check fields
    let next = true;
    if (!firstName) {
      next = false;
      setErrorFirstName("Vui lòng nhập tên của bạn.");
    }
    if (!lastName) {
      next = false;
      setErrorLastName("Vui lòng nhập họ của bạn.");
    }
    if (!email) {
      next = false;
      setErrorEmail("Hãy điền địa chỉ email của bạn.");
    }
    if (!inputPhone) {
      next = false;
      setErrorInputPhone("Xin vui lòng nhập số điện thoại của bạn.");
    }
    if (!password) {
      next = false;
      setErrorPassword("Hãy điền mật khẩu");
    }
    if (!passwordConfirmation) {
      next = false;
      setErrorPasswordConfirmation("Hãy điền mật khẩu");
    }
    // -> set err "Có lỗi trên trang này. Xin vui lòng sửa lại lỗi được đánh dấu."
    if (
      errorFirstName ||
      errorLastName ||
      errorEmail ||
      errorEmailConfirmation ||
      errorInputPhone ||
      errorPassword ||
      errorpasswordConfirmation
    )
      next = false;
    if (next) {
      console.log({
        firstName,
        lastName,
        email,
        emailConfirmation,
        inputPhone,
        password,
        passwordConfirmation,
      });
      setErrorNextStep(false);
      navigate("/verify-email");
    } else setErrorNextStep(true);

    // post job

    // post enterprise

    // post account

    // navigate to verify email
  };

  return (
    <div className="register-page">
      <h2>Đăng tin tuyển dụng miễn phí</h2>
      <div className="register-container">
        <div className="register-header" style={{ display: "flex" }}>
          <div className={`header-step1 ${step === 1 && "active"}`}>
            Tạo công việc
          </div>
          <div className={`header-step2 ${step === 2 && "active"}`}>
            Tạo doanh nghiệp
          </div>
          <div className={`header-step3 ${step === 3 && "active"}`}>
            Tạo tài khoản
          </div>
        </div>
        {step === 1 && (
          <>
            <JobPosting
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              errorJobTitle={errorJobTitle}
              setErrorJobTitle={setErrorJobTitle}
              jobType={jobType}
              setJobType={setJobType}
              whenever={whenever}
              setWhenever={setWhenever}
              particularTime={particularTime}
              setParticularTime={setParticularTime}
              errorWorkShift={errorWorkShift}
              setErrorWorkShift={setErrorWorkShift}
              visa={visa}
              setVisa={setVisa}
              workExperience={workExperience}
              setWorkExperience={setWorkExperience}
              startDate={startDate}
              setStartDate={setStartDate}
              errorStartDate={errorStartDate}
              setErrorStartDate={setErrorStartDate}
              currency={currency}
              setCurrency={setCurrency}
              salaryLevelDisplay={salaryLevelDisplay}
              setSalaryLevelDisplay={setSalaryLevelDisplay}
              salary={salary}
              setSalary={setSalary}
              salaryRange={salaryRange}
              setSalaryRange={setSalaryRange}
              paidPeriod={paidPeriod}
              setPaidPeriod={setPaidPeriod}
              errorSalaryRange={errorSalaryRange}
              setErrorSalaryRange={setErrorSalaryRange}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              errorJobDescription={errorJobDescription}
              setErrorJobDescription={setErrorJobDescription}
              quillRef={quillRef}
              setErrorNextStep={setErrorNextStep}
            />
            <CustomButton
              type="button"
              color="green"
              onClick={handleButtonStep1}
            >
              Tiếp
            </CustomButton>
            {errorNextStep && (
              <div className="invalid-feedback-input">
                <ErrorIcon />
                Có lỗi trên trang này. Xin vui lòng sửa lại lỗi được đánh dấu.
              </div>
            )}
          </>
        )}
        {step === 2 && (
          <>
            <Enterprisecreating
              enterpriseName={enterpriseName}
              setEnterpriseName={setEnterpriseName}
              errorEnterpriseName={errorEnterpriseName}
              setErrorEnterpriseName={setErrorEnterpriseName}
              country={country}
              setCountry={setCountry}
              enterpriseAddress={enterpriseAddress}
              setEnterpriseAddress={setEnterpriseAddress}
              errorEnterpriseAddress={errorEnterpriseAddress}
              setErrorEnterpriseAddress={setErrorEnterpriseAddress}
              enterpriseField={enterpriseField}
              setEnterpriseField={setEnterpriseField}
              errorEnterpriseField={errorEnterpriseField}
              setErrorEnterpriseField={setErrorEnterpriseField}
              enterpriseSize={enterpriseSize}
              setEnterpriseSize={setEnterpriseSize}
              errorEnterpriseSize={errorEnterpriseSize}
              setErrorEnterpriseSize={setErrorEnterpriseSize}
              employerRole={employerRole}
              setEmployerRole={setEmployerRole}
              errorEmployerRole={errorEmployerRole}
              setErrorEmployerRole={setErrorEmployerRole}
              enterpriseURL={enterpriseURL}
              setEnterpriseURL={setEnterpriseURL}
              enterpriseLicense={enterpriseLicense}
              setEnterpriseLicense={setEnterpriseLicense}
            />
            <CustomButton
              type="button"
              color="green"
              onClick={handleButtonStep2}
            >
              Tiếp
            </CustomButton>
            {errorNextStep && (
              <div className="invalid-feedback-input">
                <ErrorIcon />
                Có lỗi trên trang này. Xin vui lòng sửa lại lỗi được đánh dấu.
              </div>
            )}
          </>
        )}
        {step === 3 && (
          <>
            <Accountcreation
              firstName={firstName}
              setFirstName={setFirstName}
              errorFirstName={errorFirstName}
              setErrorFirstName={setErrorFirstName}
              lastName={lastName}
              setLastName={setLastName}
              errorLastName={errorLastName}
              setErrorLastName={setErrorLastName}
              email={email}
              setEmail={setEmail}
              errorEmail={errorEmail}
              setErrorEmail={setErrorEmail}
              emailConfirmation={emailConfirmation}
              setEmailConfirmation={setEmailConfirmation}
              errorEmailConfirmation={errorEmailConfirmation}
              setErrorEmailConfirmation={setErrorEmailConfirmation}
              phoneCountry={phoneCountry}
              setPhoneCountry={setPhoneCountry}
              inputPhone={inputPhone}
              setInputPhone={setInputPhone}
              errorInputPhone={errorInputPhone}
              setErrorInputPhone={setErrorInputPhone}
              password={password}
              setPassword={setPassword}
              errorPassword={errorPassword}
              setErrorPassword={setErrorPassword}
              passwordConfirmation={passwordConfirmation}
              setPasswordConfirmation={setPasswordConfirmation}
              errorpasswordConfirmation={errorpasswordConfirmation}
              setErrorPasswordConfirmation={setErrorPasswordConfirmation}
            />

            <CustomButton type="button" color="green" onClick={submit}>
              Tiếp
            </CustomButton>
            {errorNextStep && (
              <div className="invalid-feedback-input">
                <ErrorIcon />
                Có lỗi trên trang này. Xin vui lòng sửa lại lỗi được đánh dấu.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
