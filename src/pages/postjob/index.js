/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { decodeJWT, getCurrentUser } from "aws-amplify/auth";

import { ReactComponent as CompanyLogo } from "../../assets/svg/company_logo.svg";
import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import CustomButton from "../../components/custombutton";
import JobPosting from "../../components/jobposting/job-posting";
import { getEnterprises, postJob } from "../../services/configAPI";
import { selectUser } from "../../store/user";

import "./index.css";

function PostJob() {
  const [formHasErrors, setFormHasErrors] = useState(false);
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
  const [errorNextStep, setErrorNextStep] = useState(false);

  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [enterprises, setEnterprises] = useState([]);
  const [enterprise, setEnterprise] = useState("");
  const [newEnterprise, setNewEnterprise] = useState("");

  const validateForm = () => {
    let isValid = true;
    // Validate job title
    if (!jobTitle) {
      setErrorJobTitle("Vui lòng nhập chức danh công việc");
      isValid = false;
    } else {
      setErrorJobTitle(""); // Clear any previous error if the input is now valid
    }

    // Validate job type
    if (jobType === 0 || jobType === 4) {
      setJobType(4); // To trigger error state for job type
      isValid = false;
    }

    // Validate work shift, only if jobType requires it
    if (jobType > 0 && jobType < 4) {
      const hasValidTime = particularTime.some((day) => day.includes(true));
      if (!whenever && !hasValidTime) {
        setErrorWorkShift("Vui lòng chọn ít nhất một khung giờ làm việc");
        isValid = false;
      } else {
        setErrorWorkShift("");
      }
    }

    // Validate start date
    if (!startDate) {
      setErrorStartDate("Vui lòng nhập ngày bắt đầu công việc");
      isValid = false;
    } else {
      setErrorStartDate("");
    }

    // Validate salary range
    if (
      salaryLevelDisplay === 3 &&
      (salaryRange[0] === "" || salaryRange[1] === "")
    ) {
      setErrorSalaryRange("Vui lòng nhập khoảng lương mong muốn");
      isValid = false;
    } else {
      setErrorSalaryRange("");
    }

    // Validate job description
    if (
      quillRef.current &&
      quillRef.current.unprivilegedEditor.getLength() < 201
    ) {
      setErrorJobDescription(
        "Xin vui lòng đảm bảo mô tả công việc của bạn có độ dài ít nhất 200 ký tự."
      );
      isValid = false;
    } else {
      setErrorJobDescription("");
    }

    setFormHasErrors(!isValid);
    return isValid;
  };

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (validateForm()) {
      const respone = await getCurrentUser();
      if (respone.userId) {
        const accessToken = localStorage.getItem(
          `CognitoIdentityServiceProvider.${process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID}.${respone.username}.accessToken`
        );
        const data = decodeJWT(accessToken);
        const res = await postJob({
          title: jobTitle,
          type: jobType.toString(),
          workWhenever: whenever,
          workShift: particularTime.toString(),
          description: jobDescription,
          visa,
          experience: workExperience,
          startDate,
          currency,
          salaryLevelDisplay: salaryLevelDisplay.toString(),
          exactSalary: salary,
          rangeSalary: JSON.stringify(salaryRange),
          paidPeriod: paidPeriod.toString(),
          enterpriseId: enterprise.id,
          enterpriseName: enterprise.name,
          enterpriseAddress: enterprise.address,
          crawl: false,
          employerId: data.payload.username,
        });
        if (res.status === 200) {
          console.log(res);
          navigate("/post-job-success");
        }
        // if failed?
      }
    }
  };

  const handleClickCompanyOption = (companyId) => {
    setNewEnterprise(companyId);
  };

  const handleModalSubmit = () => {
    setEnterprise(enterprises.find((item) => item.id === newEnterprise));
    setShowCompanyModal(false);
  };

  useEffect(() => {
    const getListEnterprise = async () => {
      const res = await getEnterprises();
      if (res.status === 200) {
        console.log(res);
        setEnterprises(res.data);
        setEnterprise(res.data[0]);
      }
    };
    getListEnterprise();
  }, []);

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
          setErrorNextStep={setErrorNextStep}
        />
        <div className="register-desc" style={{ marginTop: "24px" }}>
          Tin tuyển dụng này sẽ được đăng bởi:
        </div>
        <div className="company">
          <div className="company-logo">
            <CompanyLogo />
          </div>
          <div className="company-info">
            <div className="company-name">{enterprise.name}</div>
            <div className="company-address">{enterprise.address}</div>
          </div>
          <Button
            to="/"
            className="register-desc-link"
            onClick={() => setShowCompanyModal(true)}
          >
            <div>thay đổi</div>
          </Button>
        </div>
        <CustomButton type="button" color="green" onClick={handleSubmit}>
          Đăng việc
        </CustomButton>
        {formHasErrors && (
          <div className="invalid-feedback-input">
            <ErrorIcon />
            Có lỗi trên trang này. Xin vui lòng sửa lại lỗi được đánh dấu.
          </div>
        )}
      </div>
      <Modal
        show={showCompanyModal}
        onHide={() => setShowCompanyModal(false)}
        backdrop="static"
        keyboard={false}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Công ty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup
            defaultActiveKey={`#${enterprise.id}`}
            activeKey={`#${newEnterprise}`}
            className="list-company"
          >
            {enterprises.map((item) => (
              <ListGroup.Item
                action
                href={`#${item.id}`}
                variant="light"
                onClick={() => handleClickCompanyOption(`${item.id}`)}
                key={item.id}
              >
                <div className="company" style={{ marginBlock: "10px" }}>
                  <div className="company-logo">
                    <CompanyLogo />
                  </div>
                  <div className="company-info">
                    <div className="company-name" style={{ color: "unset" }}>
                      {item.name}
                    </div>
                    <div className="company-address" style={{ color: "unset" }}>
                      {item.address}
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setShowCompanyModal(false)}
          >
            Hủy bỏ
          </Button>
          <Button size="lg" variant="success" onClick={handleModalSubmit}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostJob;
