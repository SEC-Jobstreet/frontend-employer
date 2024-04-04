import { NavLink } from "react-router-dom";

import "./myaccount-style.css";

function MyAccount(props) {
  const { children } = props;
  return (
    <div className="container">
      <div className="sidebar">
        <h4 className="sidebar-header mb-3">Tài khoản</h4>
        <NavLink to="/account/profile" className="nav-item nav-link">
          Hồ sơ cá nhân
        </NavLink>
        <NavLink to="/account/job_alerts" className="nav-item nav-link">
          Thông báo việc
        </NavLink>
        <NavLink to="/account/saved_jobs" className="nav-item nav-link">
          Việc của tôi
        </NavLink>
        <NavLink to="/account/settings" className="nav-item nav-link">
          Cài đặt
        </NavLink>
        <NavLink
          to="/account/deletion_confirmation"
          className="nav-item nav-link"
        >
          Xoá tài khoản
        </NavLink>
      </div>
      <div className="main-content">{children}</div>
    </div>
  );
}

export default MyAccount;
