import React from "react";

import { ReactComponent as BulbIcon } from "../../assets/svg/bulb_icon.svg";

import "./index.css";

// Reusable Job Title Component
function JobTitleComponent({ description }) {
  return (
    <div className="job-title-content">
      <div className="job-title-icon">
        <BulbIcon />
      </div>
      <div className="job-title-texts">
        <div className="job-title-desc">{description}</div>
      </div>
    </div>
  );
}

export default JobTitleComponent;
