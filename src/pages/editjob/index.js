import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ReactComponent as CompanyIcon } from "../../assets/svg/company_icon.svg";
import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import CustomButton from "../../components/custombutton";
import JobPosting from "../../components/jobposting/job-posting";
import { getJob, updateJob } from "../../services/configAPI";
import { jobTypes } from "../../utils/postjob";

import "./index.css";

function EditJob() {
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

  const [enterpriseName, setEnterpriseName] = useState("");
  const [enterpriseAddress, setEnterpriseAddress] = useState("");

  const [rawData, setRawData] = useState({});

  const quillRef = useRef();
  const navigate = useNavigate();

  const { id } = useParams(); // get id job
  useEffect(() => {
    console.log(id);
    const getJobs = async () => {
      const response = await getJob(id);
      if (response.status === 200) {
        const data = response.data.job; // lấy detail job đầu tiên của list job (làm dữ liệu để test ui thôi, ai làm thì get api khác cho đúng nhé)
        console.log(data);
        setRawData(data);

        // set input
        setJobTitle(data.title);
        setJobType(jobTypes.find((job) => job.key === data.type).id);
        setWhenever(data.work_whenever);
        setParticularTime(JSON.parse(data.work_shift));
        setVisa(data.visa);
        setWorkExperience(data.experience);
        const date = new Date(parseInt(data.start_date, 10) * 1000);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        setStartDate(formattedDate);
        setCurrency(data.currency);
        if (data.range_salary === "") {
          setSalaryLevelDisplay(1);
          setSalary(parseInt(data.exact_salary, 10));
        } else {
          setSalaryLevelDisplay(2);
          setSalaryRange(data.range_salary); // check again
        }
        // setPaidPeriod

        setJobDescription(data.description);
        setEnterpriseName(data.enterprise_name);
        setEnterpriseAddress(data.enterprise_address);
      }
    };
    getJobs();
  }, []);

  const handleButtonStep1 = async () => {
    // verify
    if (errorJobTitle || jobTitle === "") {
      setErrorJobTitle("Vui lòng nhập chức danh công việc");
      return;
    }
    if (jobType === 0 || jobType === 4) {
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
        setErrorWorkShift(true);
        return;
      }
    }
    if (workExperience === 0) {
      setWorkExperience(5);
    }
    if (
      errorSalaryRange ||
      (salaryLevelDisplay.toString() === "2" &&
        parseInt(salaryRange[0], 10) > parseInt(salaryRange[1], 10))
    ) {
      setErrorSalaryRange(true);
      return;
    }
    if (quillRef.current) {
      if (quillRef.current.unprivilegedEditor.getLength() === 1) {
        setErrorJobDescription("Xin vui lòng nhập một mô tả công việc.");
        return;
      }
      if (quillRef.current.unprivilegedEditor.getLength() < 201) {
        setErrorJobDescription(
          "Xin vui lòng đảm bảo mô tả công việc của bạn có độ dài ít nhất 200 ký tự."
        );
        return;
      }
    }

    let dateString = startDate;
    const dateParts = dateString.split("/");
    dateString = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    const data = {
      ...rawData,
      title: jobTitle,
      type: jobTypes[jobType - 1].key,
      description: jobDescription,
      workWhenever: whenever,
      workShift: JSON.stringify(particularTime),
      visa,
      experience: workExperience,
      startDate: Math.floor(dateString.getTime() / 1000),
      currency,
      salaryLevelDisplay: salaryLevelDisplay.toString(),
      paidPeriod: paidPeriod.toString(),
    };
    // setPaidPeriod
    // set enterprise
    const response = await updateJob(data);
    if (response.status === 200) {
      console.log(response);
    }
  };

  return (
    <div className="register-page">
      <h2>Chỉnh sửa tin tuyển dụng của bạn</h2>
      <div className="register-container">
        <div style={{ textAlign: "left", fontWeight: "300" }}>
          Hồ sơ xin việc sẽ có sẵn trong nền tảng này và được gửi đến:{" "}
          <b>{localStorage.getItem("email")}</b>
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
        <div style={{ marginTop: "2em" }}>
          <div style={{ fontWeight: "300", textAlign: "left" }}>
            Tin tuyển dụng này được đăng bởi:{" "}
          </div>
          <div style={{ display: "flex", height: "50px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                border: "solid .5px #dedede",
              }}
            >
              <CompanyIcon />
            </div>
            <div
              style={{
                textAlign: "left",
                fontWeight: "300",
                marginLeft: "1em",
              }}
            >
              <b>{enterpriseName}</b>
              <div>{enterpriseAddress}</div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "left", marginTop: "1em" }}>
          <CustomButton type="button" color="green" onClick={handleButtonStep1}>
            Cập nhật việc
          </CustomButton>{" "}
          <CustomButton
            type="button"
            color="white"
            onClick={() => {
              navigate("/");
            }}
          >
            Hủy
          </CustomButton>
        </div>

        {errorNextStep && (
          <div className="invalid-feedback-input">
            <ErrorIcon />
            Có lỗi trên trang này. Xin vui lòng sửa lại lỗi được đánh dấu.
          </div>
        )}
      </div>
    </div>
  );
}

export default EditJob;
