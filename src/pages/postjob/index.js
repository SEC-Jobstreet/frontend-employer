import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as CompanyLogo } from "../../assets/svg/company_logo.svg";
import CustomButton from "../../components/custombutton";
import JobPosting from "../../components/jobposting/job-posting";
import { selectUser } from "../../store/user";

import "./index.css";

function PostJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [errorJobTitle, setErrorJobTitle] = useState(false);
  const [jobType, setJobType] = useState(0);
  const [whenever, setWhenever] = useState(false);
  const [particularTime, setParticularTime] = useState([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);
  const [errorWorkShift, setErrorWorkShift] = useState(false);
  const [visa, setVisa] = useState(false);
  const [workExperience, setWorkExperience] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [errorStartDate, setErrorStartDate] = useState("");
  const [currency, setCurrency] = useState("VND");
  const [salaryLevelDisplay, setSalaryLevelDisplay] = useState(1);
  const [salary, setSalary] = useState("");
  const [salaryRange, setSalaryRange] = useState(["", ""]);
  const [paidPeriod, setPaidPeriod] = useState(4);
  const [errorSalaryRange, setErrorSalaryRange] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [errorJobDescription, setErrorJobDescription] = useState("");
  const quillRef = React.useRef();

  const user = useSelector(selectUser);

  const handleSubmit = () => {
    // Implement job posting submission logic here
  };

  return (
    <div className="job-posting-page">
      <h2 className="register-header">Đăng tin tuyển dụng miễn phí</h2>
      <div className="register-container">
        <div className="register-desc">
          Hồ sơ xin việc sẽ có sẵn trong nền tảng này và được gửi đến:
        </div>
        <div className="register-desc-email">
          {user.email}
          <Link to="/account/update-profile" className="register-desc-link">
            <div>thay đổi</div>
          </Link>
        </div>
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
        <div className="register-desc" style={{ marginTop: "24px" }}>
          Tin tuyển dụng này sẽ được đăng bởi:
        </div>
        <div className="company">
          <div className="company-logo">
            <CompanyLogo />
          </div>
          <div className="company-info">
            <div className="company-name">Công ty TNHH XYZ</div>
            <div className="company-address">Quận 5, TP. Hồ Chí Minh</div>
          </div>
          <Link to="/" className="register-desc-link">
            <div>thay đổi</div>
          </Link>
        </div>
        <CustomButton type="button" color="green" onClick={handleSubmit}>
          Đăng việc
        </CustomButton>
      </div>
    </div>
  );
}

export default PostJob;
