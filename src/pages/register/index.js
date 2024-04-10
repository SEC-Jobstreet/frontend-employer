import { useEffect, useRef, useState } from "react";

import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import CustomButton from "../../components/custombutton";
import JobPosting from "../../components/jobposting/job-posting";

function Register() {
  const [step, setStep] = useState(1); // 1: Tạo công việc, 2: Tạo doanh nghiệp, 3: Tạo tài khoản, 4: verify
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

  const handleButtonStep1 = () => {
    // verify
    let next = true;
    if (errorJobTitle || jobTitle === "") {
      next = false;
      setErrorJobTitle(true);
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
  return (
    <div className="register-page">
      <h2>Đăng tin tuyển dụng miễn phí</h2>
      <div className="register-container">
        <div className="register-header" style={{ display: "flex" }}>
          <div className="header-step1">Tạo công việc</div>
          <div className="header-step2">Tạo doanh nghiệp</div>
          <div className="header-step3">Tạo tài khoản</div>
        </div>
        {step === 1 && (
          <div className="step1">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
