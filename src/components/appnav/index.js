import React, { useState } from "react";
import { Nav, Navbar, NavItem, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setNotification } from "../../store/notification";
import { logoutAccount, selectUser } from "../../store/user";
import { notiLogout } from "../../utils/notification";
import Login from "../login/login";

import "./appnav.css";

const alertIcon = require("../../assets/svg/alert_icon.svg").default;
const infoIcon = require("../../assets/svg/info_icon.svg").default;
const menuIcon = require("../../assets/svg/menu_icon.svg").default;
const saveIcon = require("../../assets/svg/save_icon2.svg").default;
const logo = require("../../assets/svg/logo.svg").default;

function NavBar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("access-token");
    dispatch(logoutAccount());
    dispatch(setNotification(notiLogout));
    navigate("/");
  };

  const [showNav, setShowNav] = useState(false);

  return (
    <div className="header">
      <Navbar className="nav-no-responsive">
        <Navbar.Brand as={Link} to="/" className="logo-page-header">
          <img
            src={logo}
            alt="logo-jobstreet"
            style={{ width: "14rem", height: "2.4rem" }}
          />
        </Navbar.Brand>
        <Navbar.Collapse className="rightGroup">
          {user.email === "" ? (
            <button
              type="button"
              className="login"
              onClick={() => {
                const temp = document.querySelector(".login-widget-from-nav");
                if (temp) temp.style.display = "block";
              }}
            >
              <span>Đăng nhập</span>
            </button>
          ) : (
            <>
              <Nav className="p-0">
                <NavItem eventkey={1} href="/profile">
                  <NavLink className="nav-link" to="/account/profile" as={Link}>
                    <img src={infoIcon} alt="info" /> Hồ sơ cá nhân
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="p-0">
                <NavItem eventkey={2} href="/job-alerts">
                  <NavLink
                    className="nav-link"
                    to="/account/job-alerts"
                    as={Link}
                  >
                    <img src={alertIcon} alt="alert" /> Thông báo việc
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="p-0">
                <NavItem eventkey={3} href="/save-jobs">
                  <NavLink
                    className="nav-link"
                    to="/account/save-jobs"
                    as={Link}
                  >
                    <img src={saveIcon} alt="alert" /> Việc của tôi
                  </NavLink>
                </NavItem>
              </Nav>
              <button
                type="button"
                className="logout"
                onClick={() => handleLogoutClick()}
              >
                <span>Thoát</span>
              </button>
            </>
          )}
          <a href="/" className="employer-link button-employer">
            Truy cập trang web của nhà tuyển dụng
          </a>
        </Navbar.Collapse>
      </Navbar>

      <Navbar className="nav-responsive">
        <div className="above-content">
          <Navbar.Brand as={Link} to="/" className="logo-page-header">
            <img
              src={logo}
              alt="logo-jobstreet"
              style={{ width: "9.4rem", height: "1.6rem" }}
            />
          </Navbar.Brand>
          <div className="right-content">
            {user.email === "" ? (
              <button
                type="button"
                className="login"
                onClick={() => {
                  const temp = document.querySelector(".login-widget-from-nav");
                  if (temp) temp.style.display = "block";
                }}
              >
                <span>Đăng nhập</span>
              </button>
            ) : (
              <button
                type="button"
                className="logout"
                onClick={() => handleLogoutClick()}
              >
                <span>Thoát</span>
              </button>
            )}
            <button
              type="button"
              className="category-title"
              onClick={() => setShowNav(!showNav)}
            >
              Danh mục
              <img
                src={menuIcon}
                alt="Danh mục"
                style={{
                  width: "2.2rem",
                  height: "2.2rem",
                  marginLeft: "0.8rem",
                }}
              />
            </button>
          </div>
        </div>
        {showNav && (
          <div className="below-content">
            <Navbar.Collapse className="flex-column">
              <Nav className="p-0 find-job-title">
                <NavItem eventkey={0} href="/">
                  <NavLink className="nav-link" to="/" as={Link}>
                    Tìm việc làm
                  </NavLink>
                </NavItem>
              </Nav>
              {user.email !== "" && (
                <div className="nav-content">
                  <span className="nav-link-title">Tài khoản của tôi</span>
                  <Nav className="p-0">
                    <NavItem eventkey={1} href="/profile">
                      <NavLink
                        className="nav-link"
                        to="/account/profile"
                        as={Link}
                      >
                        <img src={infoIcon} alt="info" /> Hồ sơ cá nhân
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <Nav className="p-0">
                    <NavItem eventkey={2} href="/job-alerts">
                      <NavLink
                        className="nav-link"
                        to="/account/job-alerts"
                        as={Link}
                      >
                        <img src={alertIcon} alt="alert" /> Thông báo việc
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <Nav className="p-0">
                    <NavItem eventkey={3} href="/save-jobs">
                      <NavLink
                        className="nav-link"
                        to="/account/save-jobs"
                        as={Link}
                      >
                        <img src={saveIcon} alt="alert" /> Việc của tôi
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              )}
              <a className="employer-link button-employer" href="/">
                Truy cập trang web của nhà tuyển dụng
              </a>
              <div className="nav-mobile-app-link">
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
            </Navbar.Collapse>
          </div>
        )}
      </Navbar>
      {user.email === "" && <Login />}
    </div>
  );
}

export default NavBar;
