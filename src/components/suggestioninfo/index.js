import React from "react";

import { ReactComponent as BulbIcon } from "../../assets/svg/bulb_icon.svg";
import { ReactComponent as InfoIcon } from "../../assets/svg/info_icon.svg";

import "./index.css";

function SuggestionInfo({ type, children }) {
  return (
    <div
      className={`job-title-content ${type === "suggestion" ? type : "info"}`}
    >
      <div className="job-title-icon">
        {type === "suggestion" ? <BulbIcon /> : <InfoIcon />}
      </div>
      <div className="job-title-texts">{children}</div>
    </div>
  );
}

export default SuggestionInfo;
