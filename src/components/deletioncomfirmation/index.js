import { useState } from "react";
import { Modal } from "react-bootstrap";

import "./index.css";

function DeletionConfirmation() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleSubmit = (e) => {
    const { value } = document.getElementById("idDeleteAccount");
    if (value === "xóa") {
      setShow(true);
    } else {
      const txtWarningDelete = document.getElementById("txtWarningDelete");
      txtWarningDelete.classList.remove("hide");
    }
    e.preventDefault();
  };
  return (
    <div className="deleteAccount">
      <p className="titleDelete">Delete Account</p>
      <form className="formDelete" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="idDeleteAccount">
            Nhập &quot;xóa&quot; để tiếp tục
            <input
              type="text"
              name="idDeleteAccount"
              id="idDeleteAccount"
              placeholder='Nhập "xóa"'
            />
          </label>
          <span id="txtWarningDelete" className="hide">
            Tài khoản chưa được xóa. Xin vui lòng thử lại.
          </span>
        </div>
        <button type="submit" className="btnDelete">
          Xóa tài khoản
        </button>
      </form>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <div className="linkCancel">
          <button type="button" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="contDialog">
          <p className="titleContDialog">Xóa tài khoản</p>
          <p>
            Bạn có chắc rằng bạn muốn xóa tài khoản của mình? Tài khoản của bạn
            sẽ bị xoá vĩnh viễn.
          </p>
          <div className="groupButtonDialog">
            <button type="button" id="btnDialogDelete" onClick={handleClose}>
              Xóa
            </button>
            <button type="button" id="btnDialogExit" onClick={handleClose}>
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeletionConfirmation;
