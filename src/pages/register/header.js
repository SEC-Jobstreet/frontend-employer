import { memo } from "react";
import { NavLink } from "react-router-dom";

import Line from "./line";

const steps = {
  1: "Tạo công việc",
  2: "Tạo doanh nghiệp",
  3: "Tạo tài khoản",
};

function RegisterHeader({ step, handleButtonStepClick }) {
  return (
    <div className="register-header">
      {Object.keys(steps).map((key) => (
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            width: "-webkit-fill-available",
          }}
          key={`step ${key}`}
        >
          <div
            className={`step-button-wrapper ${step > key ? "done" : ""}
                  ${step === key ? "active" : ""}`}
          >
            <div>
              <button
                onClick={() => handleButtonStepClick(key)}
                //   disabled={!(step > key)}
                type="button"
              >
                {key}
              </button>
            </div>
            <NavLink className="step-title" to="">
              {steps[key]}
            </NavLink>
          </div>
          {key < 3 && <Line type="solid" />}
        </div>
      ))}
    </div>
  );
}

export default memo(RegisterHeader);
