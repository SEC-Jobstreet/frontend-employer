import { useState } from "react";
import { Modal } from "react-bootstrap";

import "./index.css";

const emailIcon = require("../../assets/svg/email_icon.svg").default;
const clockIcon = require("../../assets/svg/clock_icon.svg").default;

function JobDetail() {
  // State get value to toggle dialog
  const [saveJob, setSaveJob] = useState(false);
  const [showNofJob, setShowNofJob] = useState(false);
  const [show, setShow] = useState(false);

  const [nofEmail, setNofEmail] = useState(true); // State toggle notification Email after commit email
  const [email, setEmail] = useState(""); // State get value email

  // Handle dialog first appear
  const handleOpenViewOtherJob = () => {
    setShow(!show);
  };

  // Handle dialog first hidden
  const handleClose = () => {
    window.open("https://jobsgo.vn/");
    setShow(false);
  };

  // Submit email job.. code in here
  const handleSubmit = (e) => {
    if (nofEmail) {
      const valueEmail = document.getElementById("idsend-mail").value;
      setNofEmail(false);
      setEmail(valueEmail);
      e.preventDefault();
    } else {
      setNofEmail(true);
    }
  };

  // Save Job code in here
  const hanldeSaveJobClick = () => {
    setSaveJob(!saveJob);
  };

  // Handle dialog second appear
  const handleViewOtherJobs = () => {
    window.open("https://jobsgo.vn/");
    setShowNofJob(!showNofJob);
    setShow(!show);
  };
  return (
    <div className="jobDetailCont">
      <div className="jobDetailContLeft">
        <div className="cont-jobdetail">
          <h3 className="title-jobDetail">
            [Quận 1 - HCM] Japanese Receptionist - Tiếng Nhật N3 + Tiếng Anh
            Giao Tiếp - Up To 12M Gross
          </h3>
          <p className="company-jobDetail">
            Công Ty TNHH Một Thành Viên Wacontre – Hồ Chí Minh
          </p>
          <p className="status-jobDetail">
            <span>
              <img
                src={clockIcon}
                alt="logo-jobstreet"
                style={{ width: "17px", height: "17px", margin: "0 4px" }}
              />
              Toàn thời gian
            </span>
          </p>
          <p className="time-jobDetail">3 ngày trước, từ JobsGo</p>
          <div>
            <button
              type="button"
              className="btnView-jobDetail"
              onClick={handleOpenViewOtherJob}
            >
              Xem thêm hoặc nộp hồ sơ
            </button>
            {saveJob ? (
              <button
                type="button"
                className="btnSave-jobDetail"
                onClick={hanldeSaveJobClick}
              >
                Lưu việc
              </button>
            ) : (
              <button
                type="button"
                className="btnSave-jobDetail"
                onClick={hanldeSaveJobClick}
              >
                Đã lưu lại
              </button>
            )}
          </div>
        </div>
        <div>
          JobDescription
          {/* JobDescription code in here */}
        </div>
        <div className="footer-detailjob">
          <p className="note-jobDetail">
            Hãy cẩn thận - Đừng cung cấp tài khoản ngân hàng hoặc số thẻ tín
            dụng của bạn khi ứng tuyển. Đừng chuyển tiền để ứng tuyển hay làm
            các khảo sát trực tuyến đáng ngờ. Nếu bạn thấy khả nghi, xin vui
            lòng <a href="/#">thông báo việc này với chúng tôi.</a>
          </p>
          <button
            type="button"
            className="btnView-jobDetail"
            onClick={handleOpenViewOtherJob}
          >
            Xem thêm hoặc nộp hồ sơ
          </button>
          {saveJob ? (
            <button
              type="button"
              className="btnSave-jobDetail"
              onClick={hanldeSaveJobClick}
            >
              Lưu việc
            </button>
          ) : (
            <button
              type="button"
              className="btnSave-jobDetail"
              onClick={hanldeSaveJobClick}
            >
              Đã lưu lại
            </button>
          )}
        </div>
      </div>
      {/* Contain send Email to find job */}
      <div className="jobDetailContRight">
        <div className="contContact">
          <div className="title-jobDetail">
            <span>
              <img
                src={emailIcon}
                alt="logo-jobstreet"
                style={{ width: "25px", height: "25px" }}
              />
            </span>
            {nofEmail ? (
              <p>Gửi email cho chính bạn hoặc bạn bè</p>
            ) : (
              <p>Email đã được gửi</p>
            )}
          </div>
          {nofEmail ? (
            <form className="form-jobdetail" onSubmit={handleSubmit}>
              <input
                type="email"
                name="idsend-mail"
                id="idsend-mail"
                placeholder="Nhập email của bạn"
                className="inpEmail"
                required
              />
              <label htmlFor="checkboxMail">
                <input type="checkbox" id="checkboxMail" name="checkboxMail" />
                <span>Gửi thư báo việc hàng ngày cho các việc tương tự</span>
              </label>
              <button type="submit" className="btnSubmit">
                Gửi email việc
              </button>
            </form>
          ) : (
            <form className="form-jobdetail" onSubmit={handleSubmit}>
              <p>
                Chúng tôi đã gửi việc tới hòm thư <b>{email}</b>.
              </p>
              <button type="submit" className="btnSubmit">
                Gửi tiếp thư khác
              </button>
            </form>
          )}
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <div className="linkCancel">
          <button type="button" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="contDialogJobDetail">
          <p className="titleDialogJobDetail">Ứng tuyển</p>
          <p className="txtDialogJobDetail">
            Bạn có muốn nhận thư báo giới thiệu những công việc tương tự?
          </p>
          <div className="groupButtonDialogJobDetail">
            <button
              type="button"
              id="btnDialogContinue"
              onClick={handleViewOtherJobs}
            >
              Tiếp tục
            </button>
            <a href="/#" className="linkCancelRecommend">
              Không, tôi ổn
            </a>
          </div>
          <p className="txtEndDialogJobDetail">
            Bằng cách tạo thông báo qua email, bạn đồng ý với
            <a className="linkJobDetail" href="/#">
              {" "}
              Các điều khoản và điều kiện sử dụng{" "}
            </a>
            và{" "}
            <a className="linkJobDetail" href="/#">
              {" "}
              Chính Sách Bảo Mật
            </a>{" "}
            của JobStreet Bạn có thể huỷ thông báo qua email bất cứ lúc nào.
          </p>
        </div>
      </Modal>
      <Modal
        show={showNofJob}
        onHide={() => setShowNofJob(!showNofJob)}
        animation={false}
        centered
      >
        <div className="linkCancel">
          <button type="button" onClick={() => setShowNofJob(!showNofJob)}>
            &times;
          </button>
        </div>
        <div className="contDialogJobDetail">
          <img
            src={emailIcon}
            alt="logo-jobstreet"
            style={{ width: "25px", height: "25px" }}
          />
          <b> Thông báo việc làm đã được tạo</b>
          <p className="txtDialogJobDetail" style={{ marginBottom: "30px" }}>
            Bạn sẽ nhận được việc mới cho{" "}
            <span style={{ fontStyle: "italic" }}>
              &quot;Tuyển dụng, tìm việc làm nhân viên kinh doanh ô tô tại Hải
              Dương&quot;
            </span>{" "}
            tại <b>tuando24101997@gmail.com.</b>
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default JobDetail;
