/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import DropdownButton from "../customdropdown";
import JobTitleComponent from "../jobtitle";
import WorkTime from "../worktime";

import "./job-posting-style.css";

function JobPosting({ jobDetails, setJobDetails }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const description =
    "Chọn một tiêu đề mô tả đúng nhất công việc để xuất hiện trong các tìm kiếm có liên quan\n Ví dụ Tư vấn bán hàng qua điện thoại";
  const [isChecked, setIsChecked] = useState(false);
  const [jobDescription, setJobDescription] = useState(
    'Nếu bạn không chọn, "Cần visa làm việc cho vị trí này" sẽ được hiển thị trong mẫu tin tuyển dụng.'
  );
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setJobDescription(
      e.target.checked
        ? '"Có thể cấp thị thực làm việc cho vị trí này" sẽ được hiển thị trong mẩu tin tuyển dụng.'
        : 'Nếu bạn không chọn, "Cần visa làm việc cho vị trí này" sẽ được hiển thị trong mẫu tin tuyển dụng.'
    );
  };
  // Here jobDetails is an object containing all the state information
  // and setJobDetails is the function to update that state

  // You can have a handler function to handle changes in input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategorySelect = (option) => {
    setSelectedCategory(option);
  };

  const dropdownOptions = [
    "Toàn thời gian",
    "Bán thời gian",
    "Tạm thời/thời vụ",
  ];

  // Implement more handlers as needed for specific input types

  return (
    <div className="register-widget">
      <div className="job-title">
        <div className="job-title-form">Chức danh công việc</div>
        <input
          autoCorrect="on"
          autoCapitalize="words"
          autoComplete="on"
          dir="auto"
          spellCheck="true"
          type="text"
          className="job-title-input"
        />
        <JobTitleComponent description={description} />
      </div>
      <div className="job-category">
        <div className="job-category-title">Thể loại việc</div>
        <DropdownButton
          options={dropdownOptions}
          onSelect={handleCategorySelect}
        />
      </div>
      <WorkTime />
      <div className="job-visa">
        <div className="job-visa-header">Quyền làm việc</div>
        <label className="job-visa-content">
          <input
            className="job-visa-input"
            type="checkbox"
            id="visaCheckbox"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              handleCheckboxChange(e);
            }}
          />
          <div className="job-visa-desc">
            Visa làm việc có thể được cấp, nếu cần
          </div>
        </label>
        <JobTitleComponent description={jobDescription} />
      </div>
    </div>
  );
}

export default JobPosting;
