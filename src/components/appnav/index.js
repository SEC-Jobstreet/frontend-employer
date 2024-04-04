import React, { useState } from "react";
import { Button, Nav, Navbar, NavItem, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import alertIcon from "../../assets/svg/alert_icon.svg";
import infoIcon from "../../assets/svg/info_icon.svg";
import menuIcon from "../../assets/svg/menu_icon.svg";
import saveIcon from "../../assets/svg/save_icon2.svg";
import Login from "../../pages/login/login";
import { loginAccount, logoutAccount, selectUser } from "../../store/user";

import "./appnav.css";

const logo = require("../../assets/svg/logo.svg").default;

function NavBar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleLoginClick = () => {
    setShowLogin(!showLogin);
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
              onClick={() => setShowLogin(true)}
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
                <NavItem eventkey={2} href="/job_alerts">
                  <NavLink
                    className="nav-link"
                    to="/account/job_alerts"
                    as={Link}
                  >
                    <img src={alertIcon} alt="alert" /> Thông báo việc
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="p-0">
                <NavItem eventkey={3} href="/saved_jobs">
                  <NavLink
                    className="nav-link"
                    to="/account/saved_jobs"
                    as={Link}
                  >
                    <img src={saveIcon} alt="alert" /> Việc của tôi
                  </NavLink>
                </NavItem>
              </Nav>
              <button
                type="button"
                className="logout"
                onClick={() => {
                  dispatch(logoutAccount());
                  navigate("/");
                }}
              >
                <span>Thoát</span>
              </button>
            </>
          )}
          <a href="/">
            <Button
              type="button"
              className="button-employer"
              variant="outline-success"
            >
              Truy cập trang web của nhà tuyển dụng
            </Button>
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
                onClick={() => dispatch(loginAccount({ email: "a@email.com" }))}
              >
                <span>Đăng nhập</span>
              </button>
            ) : (
              <button
                type="button"
                className="logout"
                onClick={() => {
                  dispatch(logoutAccount());
                  navigate("/");
                }}
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
                    <NavItem eventkey={2} href="/job_alerts">
                      <NavLink
                        className="nav-link"
                        to="/account/job_alerts"
                        as={Link}
                      >
                        <img src={alertIcon} alt="alert" /> Thông báo việc
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <Nav className="p-0">
                    <NavItem eventkey={3} href="/saved_jobs">
                      <NavLink
                        className="nav-link"
                        to="/account/saved_jobs"
                        as={Link}
                      >
                        <img src={saveIcon} alt="alert" /> Việc của tôi
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              )}
              <a className="employer-link" href="/">
                <Button
                  type="button"
                  className="button-employer"
                  variant="outline-success"
                >
                  Truy cập trang web của nhà tuyển dụng
                </Button>
              </a>
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
            </Navbar.Collapse>
          </div>
        )}
      </Navbar>
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} show={showLogin} />
      )}
    </div>
  );
}

export default NavBar;
