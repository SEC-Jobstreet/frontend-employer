import { useEffect, useRef, useState } from "react";
import { getCountryCallingCode } from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import { signUp } from "aws-amplify/auth";

import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import Accountcreation from "../../components/accountcreation";
import CustomButton from "../../components/custombutton";
import Enterprisecreating from "../../components/enterprisecreating";
import JobPosting from "../../components/jobposting/job-posting";
import { createEnterprise, postJob } from "../../services/axiosAPI";
import { jobTypes } from "../../utils/postjob";

import RegisterHeader from "./header";

import "./index.css";

function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Tạo công việc, 2: Tạo doanh nghiệp, 3: Tạo tài khoản, 4: verify, 5: next
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

  // show loading page
  const [showLoading, setShowLoading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");

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

  useEffect(() => {
    setErrorSubmit("");
  }, [email, phoneCountry, inputPhone, password]);

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

  const submit = async () => {
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
      let phone = inputPhone;
      if (phone[0] === "0") {
        phone = inputPhone.slice(1);
      }
      console.log(`+${getCountryCallingCode(phoneCountry)}${phone}`);
      setShowLoading(true);
      try {
        const res = await signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              email,
              phone_number: `+${getCountryCallingCode(phoneCountry)}${phone}`,
              given_name: firstName, // E.164 number convention
              family_name: lastName,
            },
            // optional
            autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
          },
        });
        console.log(res);

        const enterprise = {
          name: enterpriseName,
          country,
          address: enterpriseAddress,
          field: enterpriseField,
          size: enterpriseSize,
          url: enterpriseURL,
          license: enterpriseLicense,
          employer_role: employerRole,
          employer_id: res.userId,
        };

        let dateString = startDate;

        const dateParts = dateString.split("/");

        dateString = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

        const job = {
          title: jobTitle,
          employer_id: res.userId,
          type: jobTypes[jobType - 1].key,
          work_whenever: whenever,
          work_shift: JSON.stringify(particularTime),
          description: jobDescription,
          visa,
          experience: workExperience,
          start_date: Math.floor(dateString.getTime() / 1000),
          currency,

          enterprise_name: enterpriseName,
          enterprise_address: enterpriseAddress,
        };

        if (salaryLevelDisplay.toString() === "1") {
          job.exact_salary = salary;
        } else {
          job.range_salary = JSON.stringify(salaryRange);
        }

        console.log(enterprise);
        await createEnterprise(enterprise).then((enterpriseResponse) => {
          console.log(enterpriseResponse);
          console.log(enterpriseResponse.data.id);
          job.enterprise_id = enterpriseResponse.data.id;
          console.log(job);
          const jobResponse = postJob(job);
          console.log(jobResponse);
        });

        localStorage.setItem("email", email);
        setErrorNextStep(false);
        navigate("/verify-email");
      } catch (error) {
        setShowLoading(false);
        if (error.message === "Invalid phone number format.")
          setErrorSubmit("Xin vui lòng nhập số điện thoại hợp lệ");
        else if (error.message === "User already exists")
          setErrorSubmit("Email đã tồn tại.");
        console.log("error signing up:", error);
      }
    } else setErrorNextStep(true);

    // post job

    // post enterprise

    // post account

    // navigate to verify email
  };

  const handleButtonStepClick = (nextStep) => {
    setStep(parseInt(nextStep, 10));
  };

  return (
    <>
      <div className="register-page">
        <h2>Đăng tin tuyển dụng miễn phí</h2>
        <div className="register-container">
          <RegisterHeader
            step={step}
            handleButtonStepClick={handleButtonStepClick}
          />
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
              {errorSubmit !== "" && (
                <div className="invalid-feedback-input">
                  <ErrorIcon />
                  {errorSubmit}
                </div>
              )}
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

export default Register;
