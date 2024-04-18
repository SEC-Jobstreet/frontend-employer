import React from "react";
import { useNavigate } from "react-router-dom";

import "./delete-account.css";

function DeleteAccount() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/account");
  };

  return (
    <div className="delete-container">
      <div className="delete-header">Xóa tài khoản</div>
      <div className="delete-info">
        <p className="information">
          Bạn có chắc rằng bạn muốn xóa tài khoản của mình?
        </p>
        <p className="information">
          Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn sẽ không thể khôi
          phục lại dữ liệu đó.
        </p>
        <div className="btn-container">
          <button type="submit" className="rounded-button-primary btn-delete">
            Xóa tài khoản
          </button>
          <button
            type="submit"
            className="rounded-button-primary btn-cancel"
            onClick={handleCancel}
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount;
