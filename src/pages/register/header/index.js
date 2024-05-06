import { memo } from "react";
import { NavLink } from "react-router-dom";

import Line from "../line";

import "./index.css";

const steps = {
  1: "Tạo công việc",
  2: "Tạo doanh nghiệp",
  3: "Tạo tài khoản",
};

function RegisterHeader({ step, handleButtonStepClick }) {
  console.log(step);
  return (
    <div className="register-header">
      {Object.keys(steps).map((key) => {
        const keyInt = parseInt(key, 10);
        let state = "";
        if (step > keyInt) state = "done";
        else if (step === keyInt) state = "active";
        return (
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              width: "-webkit-fill-available",
            }}
            key={`step ${keyInt}`}
          >
            <div className={`step-button-wrapper ${state}`}>
              <div>
                <button
                  onClick={() => handleButtonStepClick(keyInt)}
                  //   disabled={!(step > key)}
                  type="button"
                >
                  {keyInt}
                </button>
              </div>
              <NavLink className="step-title" to="">
                {steps[keyInt]}
              </NavLink>
            </div>
            {keyInt < 3 && state === "active" && (
              <Line type="dotted" color="green" />
            )}
            {keyInt < 3 && state === "" && <Line type="solid" color="grey" />}
            {state === "done" && <Line type="solid" color="green" />}
          </div>
        );
      })}
    </div>
  );
}

export default memo(RegisterHeader);
