import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setNotification } from "../../store/notification";
import { logoutAccount, selectUser } from "../../store/user";
import { notiLogout } from "../../utils/notification";

import "./footer.css";

function Footer() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <footer>
      <div className="footer">
        <div className="footer-links">
          <a className="footer-link" href="/">
            Tìm việc làm
          </a>
          <a className="footer-link" href="/">
            Danh mục công ty
          </a>
          <a className="footer-link" href="/">
            Tìm kiếm phổ biến
          </a>
          <a className="footer-link" href="/">
            Giới thiệu
          </a>
          <a className="footer-link" href="/">
            Câu hỏi thường gặp
          </a>
          <a className="footer-link" href="/">
            Những thay đổi mới
          </a>
        </div>
        <div className="footer-user-action">
          {user.email === "" ? (
            <button type="button" onClick={() => navigate("/login")}>
              Đăng nhập
            </button>
          ) : (
            <>
              <span>{user.email}</span>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("access-token");
                  dispatch(logoutAccount());
                  dispatch(setNotification(notiLogout));
                  navigate("/");
                }}
              >
                Thoát
              </button>
            </>
          )}
        </div>
        <div className="mobile-app-link">
          <a href="/">
            <img
              className="img-app-link"
              alt="Link to App Store"
              loading="lazy"
              src="https://assets.jora.com/assets/app-store-logos/app-store-vi-4e30ffbd1db10d4581274bbda3bfc629542130abbe4d1da0ab2c049a0dea3d6f.png"
            />
          </a>
          <a href="/">
            <img
              className="img-app-link"
              alt="Link to Play Store"
              loading="lazy"
              src="https://assets.jora.com/assets/app-store-logos/play-store-vi-1dc2b41b499200218b7543efad90825bb4f9888fcb8cb839e97a476c6aa045cd.png"
            />
          </a>
        </div>
        <span className="copyright-text">©2024 Job Seeker Pty Ltd</span>
      </div>
    </footer>
  );
}

export default Footer;
