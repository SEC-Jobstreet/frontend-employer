import { NavLink } from "react-router-dom";

import "./index.css";

function EditSetting() {
  const handleSubmit = (e) => {
    // handle email null
    const email = document.getElementById("inpEmail").value;
    const nofEmail = document.getElementById("nofEmail");
    if (email === "") {
      nofEmail.classList.remove("hide");
    } else {
      nofEmail.classList.add("hide");
    }

    // handle password null or wrong
    const nofPassword = document.getElementById("nofPassword");
    const txtWarningPassword = document.getElementById("txtWarningPassword");
    const newPassword = document.getElementById("inpNewPassword").value;
    e.preventDefault();
    if (newPassword === "") {
      nofPassword.classList.remove("hide");
      txtWarningPassword.innerHTML = "Mật khẩu không được để trống";
    } else {
      nofPassword.classList.remove("hide");
      txtWarningPassword.innerHTML = "Mật khẩu không chính xác";
    }
  };
  return (
    <div className="editSetting">
      <p className="titleEdit">Edit Setting</p>
      <form id="myFrom" onSubmit={handleSubmit}>
        <div className="groupForm">
          <label htmlFor="inpEmail">
            Địa chỉ email
            <input
              type="email"
              className="inp"
              id="inpEmail"
              name="inpEmail"
              placeholder="Nhập email của bạn"
            />
          </label>

          <p className="txtWarning hide" id="nofEmail">
            <span className="txtWarningEmail">
              Địa chỉ email không thể để trắng
            </span>
          </p>
        </div>
        <div className="groupForm">
          <label htmlFor="inpPassword">
            Mật khẩu
            <input
              type="password"
              className="inp"
              id="inpPassword"
              name="inpPassword"
              placeholder="Nhập mật khẩu"
            />
          </label>
          <div>
            <p>
              <span>Để trống nếu bạn không muốn thay đổi</span>
            </p>
          </div>
        </div>
        <div className="groupForm">
          <label htmlFor="inpNewPassword">
            Mật khẩu hiện tại
            <input
              type="password"
              className="inp"
              id="inpNewPassword"
              name="inpNewPassword"
              placeholder="Nhập mật khẩu"
            />
          </label>
          <p>
            <span>
              Chúng tôi cần mật khẩu của bạn để lưu thông tin thay đổi
            </span>
          </p>
          <p className="txtWarning hide" id="nofPassword">
            <span id="txtWarningPassword" />
          </p>
        </div>
        <div className="groupButton">
          <button type="submit" className="btnSubmit">
            Lưu tài khoản
          </button>
          <NavLink to="/account/settings" className="linkButtonCancel">
            <button type="button" className="btnCancel">
              Hủy
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
}
export default EditSetting;
