import React, { useState } from "react";

import { ReactComponent as EditIcon } from "../../assets/svg/edit_icon.svg";

import "./myaccount.css";

function MyAccount() {
  // Example state for edit mode - replace with actual implementation
  const [, setIsEditing] = useState(false);

  const handleEditClick = () => {
    // Set the state to true, showing the edit form, for example
    setIsEditing(true);
  };

  return (
    <div className="account-container">
      <div className="account-info-header">Tài khoản</div>
      <div className="account-info">
        <div className="info-section">
          <div className="info-name">Duy An Lê</div>
          <div className="info-email">ptbt1092@gmail.com</div>
          <div className="info-phone">+84354532051</div>
        </div>
        <button onClick={handleEditClick} className="info-action" type="button">
          <EditIcon />
          <div className="info-action-title">Chỉnh sửa</div>
        </button>
      </div>
      <div className="account-actions">
        <button className="action-button" type="button">
          Cập nhật lại mật khẩu
        </button>
        <button className="action-button" type="button">
          Xóa tài khoản
        </button>
        <button className="action-button" type="button">
          Đăng xuất
        </button>
      </div>
      <a href="/" className="back-home">
        Trở về trang chủ
      </a>
    </div>
  );
}

export default MyAccount;
