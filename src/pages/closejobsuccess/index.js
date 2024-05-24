import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as SuccessIcon } from "../../assets/svg/success_icon.svg";
import CustomButton from "../../components/custombutton";

import "./index.css";

function CloseJobSuccess() {
  const navigate = useNavigate();
  return (
    <div className="close-job-container">
      <div className="close-job-content">
        <div style={{ textAlign: "center" }}>
          <SuccessIcon />
        </div>
        <div
          style={{ textAlign: "center", fontSize: "20px", marginTop: "1em" }}
        >
          Cảm ơn bạn! Chúng tôi đang gỡ bỏ tin tuyển dụng của bạn.
        </div>
      </div>

      <div className="close-job-content-second">
        <div>Việc gì sẽ xảy ra bây giờ</div>
        <div style={{ fontWeight: "300", margin: "1em 0" }}>
          Có thể mất vài giờ để công việc của bạn được gỡ bỏ.
        </div>
        <div>
          <CustomButton color="green" onClick={() => {}}>
            Đăng một việc mới
          </CustomButton>{" "}
          <CustomButton
            color="white"
            onClick={() => {
              navigate("/home");
            }}
          >
            Trở về trang chủ
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default CloseJobSuccess;
