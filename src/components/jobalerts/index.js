import { useState } from "react";
import { useNavigate } from "react-router-dom";

import JobAlertData from "../../temp/samplejobalertdata";

import JobAlert from "./components/JobAlert";
import JobAlertEmpty from "./components/JobAlertEmpty";
import UnComfirmAlert from "./components/UnComfirmAlert";

import "./index.css";

function JobsAlerts() {
  const [jobData, setJobData] = useState(JobAlertData || []);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);
  const navigate = useNavigate();
  const uncomfirmHandler = (value) => {
    setIsConfirmEmail(value);
  };

  const onChangeJobAlertHandler = (id, identifier) => {
    if (identifier === "discard") {
      setJobData((preState) => preState.filter((item) => item.id !== id));
    }
    if (identifier === "status") {
      setJobData((preState) => {
        const currentArray = [...preState];
        const currentIndex = preState.findIndex((item) => item.id === id);
        const currentItem = preState[currentIndex];
        const updatedItem = { ...currentItem, status: !currentItem.status };
        currentArray[currentIndex] = updatedItem;
        return currentArray;
      });
    }
  };
  return (
    <div className="my-account-content grid-content">
      <h3 className="heading-large account-page-heading">Thông báo việc</h3>
      {/* show when email is unconfirm */}
      {!isConfirmEmail && (
        <UnComfirmAlert uncomfirmHandler={uncomfirmHandler} />
      )}
      {/* show job alert when email is confirmed */}
      {isConfirmEmail && jobData.length === 0 && <JobAlertEmpty />}
      {isConfirmEmail && jobData.length !== 0 && (
        <div id="email-alerts">
          {jobData.map((item) => (
            <JobAlert
              key={item.id}
              id={item.id}
              title={item.title}
              status={item.status}
              onChangeJobAlertHandler={onChangeJobAlertHandler}
            />
          ))}
        </div>
      )}
      {isConfirmEmail && (
        <button
          type="button"
          className="create-alert-button -primary"
          onClick={() => navigate("new")}
        >
          Tạo thông báo việc làm ngay
        </button>
      )}
    </div>
  );
}

export default JobsAlerts;
