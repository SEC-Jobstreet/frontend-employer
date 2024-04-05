import { NavLink } from "react-router-dom";

import "./index.css";

function Setting() {
  return (
    <div className="contSetting">
      <p className="titleSetting">Settings</p>
      <p>tuando24101997@gmail.com</p>
      <p>*********</p>
      <NavLink to="/account/edit_setting">
        <button type="button" className="btnSetting">
          Edit settings
        </button>
      </NavLink>
    </div>
  );
}

export default Setting;
