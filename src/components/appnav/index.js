import React, { useState } from "react";
import { Button, Nav, Navbar, NavItem, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Login from "../../pages/login/login";
import { logoutAccount, selectUser } from "../../store/user";

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

  return (
    <div className="header">
      <Navbar>
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
                <NavItem eventkey={1}>
                  <NavLink as={Link} to="account/profile">
                    Hồ sơ cá nhân
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="p-0">
                <NavItem eventkey={2} href="/job_alerts">
                  <NavLink to="/account/job_alerts" as={Link}>
                    Thông báo việc
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="p-0">
                <NavItem eventkey={3} href="/saved_jobs">
                  <NavLink to="/account/saved_jobs" as={Link}>
                    Việc của tôi
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
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} show={showLogin} />
      )}
    </div>
  );
}

export default NavBar;
