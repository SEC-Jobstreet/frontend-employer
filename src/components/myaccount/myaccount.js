import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "aws-amplify/auth";

import { ReactComponent as EditIcon } from "../../assets/svg/edit_icon.svg";
import { logoutAccount, selectUser } from "../../store/user";

import "./myaccount.css";

function MyAccount() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div className="account-container">
      <div className="account-info-header">Tài khoản</div>
      <div className="account-info">
        <div className="info-section">
          <span className="info-name">
            {user.firstName} {user.lastName}
          </span>
          {/* <span className="info-surname">{user.lastName}</span> */}
          <div className="info-email">{user.email}</div>
          <div className="info-phone">{user.phone}</div>
        </div>
        <Link to="/account/update-profile" style={{ textDecoration: "none" }}>
          <button className="info-action" type="button">
            <EditIcon />
            <p className="info-action-title">Chỉnh sửa</p>
          </button>
        </Link>
      </div>
      <div className="account-actions">
        <Link to="/account/update-password">
          <button className="action-button" type="button">
            Cập nhật lại mật khẩu
          </button>
        </Link>
        <Link to="/account/deletion_confirmation">
          <button className="action-button" type="button">
            Xóa tài khoản
          </button>
        </Link>
        <button
          className="action-button"
          type="button"
          onClick={async () => {
            try {
              await signOut();
              dispatch(logoutAccount());
            } catch (error) {
              console.log("error signing out: ", error);
            }
          }}
        >
          Đăng xuất
        </button>
      </div>
      <Link to="/home" className="back-home">
        Trở về trang chủ
      </Link>
    </div>
  );
}

export default MyAccount;
