import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as PostJobSuccessImg } from "../../assets/svg/post_job_success.svg";

import "./index.css";

function PostJobSuccess() {
  const navigate = useNavigate();
  const handleCreateJob = () => {
    navigate("/post-job");
  };
  const handleBackHome = () => {
    navigate("/home");
  };
  return (
    <div className="success-container">
      <div className="success-info">
        <PostJobSuccessImg />
        <div className="success-desc">
          Chúng tôi đang kiểm tra công việc của bạn.
        </div>
      </div>
      <div className="success-actions">
        <div className="actions-header">Quy trình bây giờ là gì</div>
        <ul className="actions-desc">
          <li>
            Chúng tôi đang xem xét thông tin của bạn và quá trình này có thể mất
            1 đến 2 ngày làm việc
          </li>
          <li>
            Nếu tài khoản của bạn đã được xác minh và bạn đang đăng tin tuyển
            dụng, quá trình này có thể mất đến 3 tiếng
          </li>
        </ul>
        <div className="actions-header">Bước tiếp theo là gì</div>
        <div className="actions-desc" style={{ marginBottom: "12px" }}>
          Bắt đầu quản lý các vị trí tuyển dụng của bạn!
        </div>
        <ol className="actions-desc" style={{ marginBottom: "0px" }}>
          <li>
            Chỉnh sửa hoặc đóng các vị trí tuyển dụng của bạn bất cứ lúc nào
          </li>
          <li>Xem xét và chọn lọc các ứng viên</li>
        </ol>
        <div className="btn-group">
          <button
            type="submit"
            className="rounded-button-primary btn-sign-up"
            onClick={handleCreateJob}
          >
            Đăng quảng cáo việc khác
          </button>
          <button
            type="submit"
            className="rounded-button-primary btn-cancel"
            onClick={handleBackHome}
          >
            Trở về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostJobSuccess;
