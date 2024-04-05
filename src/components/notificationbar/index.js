import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { selectNotification, setDefaultNoti } from "../../store/notification";

import "./index.css";

const closeIcons = require("../../assets/svg/close.svg").default;

function NotificationBar() {
  const { type, message } = useSelector(selectNotification);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setDefaultNoti());
  }, [location]);

  // color error: #fff1f1, color success: #f2fdf7
  return (
    message !== "" && (
      <div
        className="flash-container info"
        style={
          type === "success"
            ? { backgroundColor: "#f2fdf7" }
            : { backgroundColor: "#fff1f1" }
        }
      >
        <div className="messages">
          <div>{message}</div>
        </div>
        <button
          type="button"
          className="close"
          onClick={() => {
            dispatch(setDefaultNoti());
          }}
        >
          <img src={closeIcons} alt="close" />
        </button>
      </div>
    )
  );
}

export default NotificationBar;
