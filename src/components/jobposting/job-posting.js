import React, { Fragment, memo } from "react";
import ReactQuill from "react-quill";

import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import {
  dropdownOptions,
  experienceOptions,
  experienceSuggestions,
} from "../../utils/postjob";
import DropdownButton from "../customdropdown";
import CustomInput from "../custominput/input";
import CustomRadio from "../customradio";
import SuggestionInfo from "../suggestioninfo";

import DateInput from "./dateinput";
import EstimatedSalary from "./estimatedsalary";
import Workshift from "./workshift";

import "./job-posting-style.css";
import "react-quill/dist/quill.snow.css";

function JobPosting({
  jobTitle,
  setJobTitle,
  errorJobTitle,
  setErrorJobTitle,
  // job type
  jobType, // 0: chưa chọn, 1: toàn thời gian, 2: bán thời gian, 3: tạm thời, 4: chưa chọn sau khi submit
  setJobType,
  // working time
  whenever,
  setWhenever,
  particularTime,
  setParticularTime,
  errorWorkShift,
  setErrorWorkShift,
  // visa
  visa,
  setVisa,
  // work experience
  workExperience,
  setWorkExperience,
  // start Date
  startDate,
  setStartDate,
  errorStartDate,
  setErrorStartDate,
  // estimated salary
  currency,
  setCurrency,
  salaryLevelDisplay,
  setSalaryLevelDisplay,
  salary,
  setSalary,
  salaryRange,
  setSalaryRange,
  paidPeriod,
  setPaidPeriod,
  errorSalaryRange,
  setErrorSalaryRange,
  // editor textarea
  jobDescription,
  setJobDescription,
  errorJobDescription,
  setErrorJobDescription,
  quillRef,
  setErrorNextStep,
}) {
  console.log("312312321");
  return (
    <>
      <CustomInput
        input={jobTitle}
        error={errorJobTitle}
        setInput={(e) => {
          setErrorJobTitle("");
          setJobTitle(e.target.value);
        }}
        setBlur={() => {
          if (jobTitle === "")
            setErrorJobTitle("Vui lòng nhập chức danh công việc");
        }}
        type="text"
        label="Chức danh công việc"
        name="job-title"
      />
      <SuggestionInfo type="suggestion">
        <p>
          Chọn một tiêu đề mô tả đúng nhất công việc để xuất hiện trong các tìm
          kiếm có liên quan
        </p>
        <p>Ví dụ Tư vấn bán hàng qua điện thoại</p>
      </SuggestionInfo>
      <DropdownButton
        name="Thể loại việc"
        title={
          jobType === 0 || jobType === 4
            ? "Chọn một thể loại việc"
            : dropdownOptions[jobType - 1].label
        }
        options={dropdownOptions}
        onSelect={setJobType}
        value={jobType}
      />
      {jobType === 4 && (
        <div className="invalid-feedback-input">
          <ErrorIcon />
          Xin vui lòng chọn thể loại công việc.
        </div>
      )}
      {jobType > 0 && jobType < 4 && (
        <Workshift
          whenever={whenever}
          setWhenever={setWhenever}
          particularTime={particularTime}
          setParticularTime={setParticularTime}
          errorWorkShift={errorWorkShift}
          setErrorWorkShift={setErrorWorkShift}
        />
      )}
      <h3 className="visa">Quyền làm việc</h3>
      <label htmlFor="checkbox-visa" style={{ paddingLeft: "10px" }}>
        <input
          type="checkbox"
          id="checkbox-visa"
          name="checkbox-visa"
          onChange={() => setVisa(!visa)}
          checked={visa}
          value={visa}
          style={{ height: "auto", marginRight: "1rem" }}
        />
        Visa làm việc có thể được cấp nếu cần
      </label>
      <SuggestionInfo type="suggestion">
        {visa ? (
          <p>
            &quot;Có thể cấp thị thực làm việc cho vị trí này&quot; sẽ được hiển
            thị trong mẩu tin tuyển dụng.
          </p>
        ) : (
          <p>
            Nếu bạn không chọn, &quot;Cần visa làm việc cho vị trí này&quot; sẽ
            được hiển thị trong mẩu tin tuyển dụng.
          </p>
        )}
      </SuggestionInfo>

      <div className="work-experience">
        <h3>Yêu cầu kinh nghiệm làm việc</h3>
        {experienceOptions.map((e) => (
          <Fragment key={e.id}>
            <CustomRadio
              value={workExperience}
              checkedValue={e.id}
              setValue={(ele) => {
                setErrorNextStep(false);
                setWorkExperience(ele);
              }}
              id={`workexperience${e.id}`}
            >
              <div>{e.label}</div>
            </CustomRadio>
          </Fragment>
        ))}

        {workExperience > 0 && workExperience < 5 && (
          <SuggestionInfo type="suggestion">
            <p>{experienceSuggestions[workExperience]}</p>
          </SuggestionInfo>
        )}

        {workExperience === 5 && (
          <div className="invalid-feedback-input">
            <ErrorIcon />
            Vui lòng chọn một lựa chọn.
          </div>
        )}
      </div>
      <DateInput
        startDate={startDate}
        setStartDate={setStartDate}
        errorStartDate={errorStartDate}
        setErrorStartDate={setErrorStartDate}
      />

      <EstimatedSalary
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
      />
      <div>Mô tả công việc</div>
      <div>
        <ReactQuill
          ref={quillRef}
          className="job-description"
          onChange={(html) => {
            setErrorJobDescription("");
            setJobDescription(html);
          }}
          onBlur={() => {
            if (jobDescription.toString().trim() === "<p><br></p>") {
              setErrorJobDescription("Xin vui lòng nhập một mô tả công việc.");
            } else if (quillRef.current.unprivilegedEditor.getLength() < 201) {
              setErrorJobDescription(
                "Xin vui lòng đảm bảo mô tả công việc của bạn có độ dài ít nhất 200 ký tự."
              );
            }
          }}
          value={jobDescription}
          modules={{
            toolbar: [["bold"], [{ list: "ordered" }, { list: "bullet" }]],
            clipboard: {
              matchVisual: false,
            },
          }}
        />
        <div>
          Số ký tự:{" "}
          {quillRef.current
            ? quillRef.current.unprivilegedEditor.getLength() - 1
            : 0}
        </div>
      </div>
      {errorJobDescription !== "" && (
        <div className="invalid-feedback-input">
          <ErrorIcon />
          {errorJobDescription}
        </div>
      )}
      <SuggestionInfo type="info">
        Tin tuyển dụng không được bao gồm nội dung liên quan đến giới tính cụ
        thể, dân tộc, tôn giáo, chủng tộc, quyền công dân, tình trạng hôn nhân,
        mô tả ngoại hình hoặc các yếu tố phân biệt đối xử khác. Những tin tuyển
        dụng này có thể bị cấm và không được đăng.
      </SuggestionInfo>
      <SuggestionInfo type="suggestion">
        <p>Quảng cáo việc làm tốt thu hút được ứng viên thường bao gồm: </p>
        <p>• Mô tả về doanh nghiệp của bạn </p>
        <p>• Yêu cầu công việc </p>
        <p>• Trình độ và kinh nghiệm yêu cầu ở ứng viên</p>
        <p>
          • Các quyền lợi được hưởng Mô tả công việc không nên bao gồm số điện
          thoại hoặc địa chỉ email.
        </p>
      </SuggestionInfo>
    </>
  );
}

export default memo(JobPosting);
