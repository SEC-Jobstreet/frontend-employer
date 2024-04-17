import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as EditIcon } from "../../assets/svg/edit_icon.svg";
import { logoutAccount, setProfileData } from "../../store/user";

import "./myaccount.css";

function MyAccount() {
  const dispatch = useDispatch();

  const [name] = useState("Duy An");
  const [surname] = useState(" Lê");
  const [email] = useState("ptbt1092@gmail.com");
  const [phone] = useState("+84354532051");

  const handleEditClick = () => {
    dispatch(
      setProfileData({
        name,
        surname,
        email,
        phone,
      })
    );
  };

  return (
    <div className="account-container">
      <div className="account-info-header">Tài khoản</div>
      <div className="account-info">
        <div className="info-section">
          <span className="info-name">{name}</span>
          <span className="info-surname">{surname}</span>
          <div className="info-email">{email}</div>
          <div className="info-phone">{phone}</div>
        </div>
        <button className="info-action" type="button" onClick={handleEditClick}>
          <Link to="/account/update-profile">
            <EditIcon />
            <div className="info-action-title">Chỉnh sửa</div>
          </Link>
        </button>
      </div>
      <div className="account-actions">
        <button className="action-button" type="button">
          Cập nhật lại mật khẩu
          <Link to="/account/update-password" />
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
