import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as EditIcon } from "../../assets/svg/edit_icon.svg";
import { logoutAccount } from "../../store/user";

import "./myaccount.css";

function MyAccount() {
  const dispatch = useDispatch();

  return (
    <div className="account-container">
      <div className="account-info-header">Tài khoản</div>
      <div className="account-info">
        <div className="info-section">
          <span className="info-name">Duy An </span>
          <span className="info-surname">Lê</span>
          <div className="info-email">ptbt1092@gmail.com</div>
          <div className="info-phone">+84354532051</div>
        </div>
        <button className="info-action" type="button">
          <Link to="/account/update-profile">
            <EditIcon />
            <div className="info-action-title">Chỉnh sửa</div>
          </Link>
        </button>
      </div>
      <div className="account-actions">
        <button className="action-button" type="button">
          Cập nhật lại mật khẩu
        </button>
        <button className="action-button" type="button">
          Xóa tài khoản
        </button>
        <button
          className="action-button"
          type="button"
          onClick={() => {
            localStorage.removeItem("access-token");
            dispatch(logoutAccount());
          }}
        >
          Đăng xuất
        </button>
      </div>
      <a href="/home" className="back-home">
        Trở về trang chủ
      </a>
    </div>
  );
}

export default MyAccount;
