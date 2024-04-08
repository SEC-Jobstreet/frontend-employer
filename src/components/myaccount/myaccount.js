import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { logoutAccount } from "../../store/user";

function MyAccount() {
  const currentPage = useLocation().pathname;
  const dispatch = useDispatch();
  return (
    <div>
      <div>Tài khoản của tôi</div>
      <div
        className={
          currentPage === "/account/update-profile"
            ? "nav-link active"
            : "nav-link"
        }
      >
        <NavLink to="profile" className="account-navlink">
          Chỉnh sửa
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
      <button
        className="logout"
        type="button"
        onClick={() => {
          localStorage.removeItem("access-token");
          dispatch(logoutAccount());
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default MyAccount;
