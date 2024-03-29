import { NavLink, useLocation } from "react-router-dom";

function MyAccount() {
  const currentPage = useLocation().pathname;

  return (
    <div>
      <div>Tài khoản của tôi</div>
      <div
        className={
          currentPage === "/account/profile" ? "nav-link active" : "nav-link"
        }
      >
        <NavLink to="profile" className="account-navlink">
          Hồ sơ cá nhân
        </NavLink>
      </div>
      <div
        className={
          currentPage === "/account/job_alerts" ? "nav-link active" : "nav-link"
        }
      >
        <NavLink to="job_alerts" className="account-navlink">
          Thông báo việc
        </NavLink>
      </div>
      <div
        className={
          currentPage === "/account/saved_jobs" ? "nav-link active" : "nav-link"
        }
      >
        <NavLink to="saved_jobs" className="account-navlink">
          Việc của tôi
        </NavLink>
      </div>
      <div
        className={currentPage === "/account" ? "nav-link active" : "nav-link"}
      >
        <NavLink to="/account" className="account-navlink">
          Settings
        </NavLink>
      </div>
      <div
        className={
          currentPage === "/account/deletion_confirmation"
            ? "nav-link active"
            : "nav-link"
        }
      >
        <NavLink to="deletion_confirmation" className="account-navlink">
          Xoá tài khoản
        </NavLink>
      </div>
    </div>
  );
}

export default MyAccount;
