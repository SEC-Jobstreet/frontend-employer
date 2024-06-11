import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { ReactComponent as CompanyIcon } from "../../assets/svg/company_icon.svg";
import { ReactComponent as EditIcon } from "../../assets/svg/edit_icon.svg";
import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import { ReactComponent as ExitIcon } from "../../assets/svg/exit_icon.svg";
import { ReactComponent as ReverseIcon } from "../../assets/svg/reverse_icon.svg";
import { ReactComponent as TrashIcon } from "../../assets/svg/trashs_icon.svg";
import { ReactComponent as UserIcon } from "../../assets/svg/user_icon.svg";
import CustomButton from "../../components/custombutton";
import {
  closeJob,
  getApplicationNumber,
  getJobList,
} from "../../services/configAPI";

import "./index.css";

const statusList = {
  POSTED: {
    class: "status-posted",
    classCont: "job-item-posted",
    name: "Đã duyệt",
  },
  REVIEW: {
    class: "status-reviewing",
    classCont: "job-item-reviewing",
    name: "Đang được xem xét",
  },
  DENIED: {
    class: "status-denied",
    classCont: "job-item-denied",
    name: "Đã bị từ chối",
  },
  CLOSED: {
    class: "status-closed",
    classCont: "job-item-closed",
    name: "Đã đóng",
  },
};

function ApplicationNumber({ data }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getApplicationNumbers = async () => {
      const res = await getApplicationNumber(data.id);
      // console.log(res);
      if (res.status === 200) {
        setTotal(res.data.total);
      }
    };
    getApplicationNumbers();
  }, []);
  return (
    <a
      target="_blank"
      href={`/candidates?job_id=${data.id}`}
      rel="noreferrer"
      className="link-candidate"
    >
      <UserIcon /> {"  "} {total} Ứng viên
    </a>
  );
}

function HomepageLogin() {
  const navigate = useNavigate();
  const [jobList, setJobList] = useState(null);
  const [show, setShow] = useState(false);
  const [choose, setChoose] = useState("1");
  const [lengthText, setLengthText] = useState(200);

  useEffect(() => {
    const getJobs = async () => {
      const request = {
        pageId: 1,
        pageSize: 10,
      };
      const response = await getJobList(request);
      if (response.status === 200) {
        const temp = response.data.jobs;
        setJobList(temp);
      }
    };
    getJobs();
  }, []);

  console.log(jobList);

  const navigate = useNavigate();
  const handleClickPostJob = () => {
    navigate("/post-job");
  };

  const handleClickChoose = () => {
    const valueRadio = document.querySelector(
      'input[name="selectDeleteJob"]:checked'
    ).value;
    if (valueRadio === "1") {
      const msg = document.getElementById("messageErrDeleteJob");
      msg.classList.add("errAppear");
    }
    setChoose(valueRadio);
  };

  const handleChangeTextArea = () => {
    const valueTextArea = document.getElementById("txtareaDeleteJob").value;
    const count = 200 - valueTextArea.length;
    setLengthText(count);
    if (count > -1 && count < 200) {
      const msg = document.getElementById("messageErrDeleteJob");
      msg.classList.add("errAppear");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (choose === "1") {
      navigate("/close-job-success");
    } else if (lengthText > -1 && lengthText < 200) {
      navigate("/close-job-success");
    } else {
      const msg = document.getElementById("messageErrDeleteJob");
      msg.classList.remove("errAppear");
    }
  };

  const handleClose = () => {
    setShow(false);
    const formData = document.getElementById("formDeleteJob");
    formData.reset();
    setChoose("1");
    setLengthText(200);
  };
  const handleShow = () => setShow(true);

  const handleDeleteJob = async (id) => {
    const respone = await closeJob(id);
    if (respone.status === 200) {
      console.log(respone);
    }
  };

  // console.log(jobList);
  return (
    <div className="job-container">
      <div className="post-job-button">
        <CustomButton color="green" onClick={handleClickPostJob}>
          Đăng tuyển
        </CustomButton>
      </div>
      {jobList &&
        jobList.map((ele) => {
          const created = new Date(parseInt(ele.CreatedAt, 10) * 1000);
          // let statusClassname;
          // if (ele.status === "POSTED") statusClassname = "status-post";
          // else if (ele.status === "REVIEWING")
          //   statusClassname = "status-review";
          // else statusClassname = "status-denied";
          return (
            <div
              className={`job-item ${statusList[ele.status]?.classCont}`}
              key={ele.id}
            >
              <div className="job-item-info">
                <div style={{ fontWeight: "300" }}>
                  <span className={`status ${statusList[ele.status]?.class}`}>
                    {statusList[ele.status]?.name}
                  </span>
                  <span>
                    Đăng vào {created.getDate()} Tháng {created.getMonth() + 1}{" "}
                    {created.getFullYear()}
                  </span>
                </div>
                <h3 className="title">{ele.title}</h3>
                <div className="job-item-enterprise">
                  <div className="job-item-enterprise-icon">
                    <CompanyIcon />
                  </div>
                  <div className="job-item-enterprise-info">
                    <div style={{ fontWeight: "400" }}>
                      {ele.enterprise_name}
                    </div>
                    <p>{ele.enterprise_address}</p>
                  </div>
                </div>
              </div>
              <div className="job-item-group-button">
                <div className="job-item-group-button-child">
                  <ApplicationNumber data={ele} />
                </div>
                <div
                  className="job-item-group-button-child"
                  style={{
                    borderLeft: "solid 1.5px #dedede",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {ele.status === "POSTED" || ele.status === "REVIEW" ? (
                    <>
                      <button
                        className="link-candidate"
                        type="button"
                        onClick={() => {
                          navigate(`/edit-job/${ele.id}`);
                        }}
                      >
                        <EditIcon />
                        Chỉnh sửa việc
                      </button>
                      <button
                        type="button"
                        className="link-candidate"
                        onClick={handleShow}
                      >
                        <TrashIcon />
                        Đóng việc
                      </button>
                    </>
                  ) : (
                    <button
                      className="link-candidate"
                      type="button"
                      onClick={() => {}}
                    >
                      <ReverseIcon />
                      Đặt lại quảng cáo
                    </button>
                  )}
                </div>
              </div>

              <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                contentClassName="contPopupDeleteJob"
                className="popupDeleteJob"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px 2em",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <span>Bạn có thực sự muốn đóng việc này?</span>
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    style={{ backgroundColor: "#f0f0f0", border: "none" }}
                  >
                    <ExitIcon />
                  </Button>
                </div>

                <div
                  style={{
                    padding: "20px 2em",
                    fontSize: "16px !important",
                    fontWeight: "300",
                  }}
                >
                  <span>
                    Chúng tôi hy vọng bạn đã tuyển được nhân viên mới cho vị trí
                    này! Vui lòng cho chúng tôi biết....
                  </span>
                  <form
                    style={{ marginTop: "1em" }}
                    onSubmit={handleSubmit}
                    id="formDeleteJob"
                  >
                    <label htmlFor="choose1" className="radioChooseDeleteJob">
                      <input
                        type="radio"
                        name="selectDeleteJob"
                        id="choose1"
                        value="1"
                        onClick={handleClickChoose}
                        defaultChecked={choose === "1"}
                      />
                      <span
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Tôi đã tuyển dụng được ở JobStreet
                      </span>
                    </label>
                    <label
                      htmlFor="two"
                      id="test"
                      className="radioChooseDeleteJob"
                    >
                      <input
                        type="radio"
                        name="selectDeleteJob"
                        id="two"
                        value="2"
                        onClick={handleClickChoose}
                      />
                      <span
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Tôi đã tuyển dụng được ở trang khác
                      </span>
                    </label>
                    <label htmlFor="three" className="radioChooseDeleteJob">
                      <input
                        type="radio"
                        id="three"
                        name="selectDeleteJob"
                        value="3"
                        onClick={handleClickChoose}
                      />
                      <span
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Tôi chưa tuyển dụng được nhưng vẫn muốn đóng tin tuyển
                        dụng
                      </span>
                    </label>
                    <label
                      htmlFor="txtareaDeleteJob"
                      style={{ marginTop: "1em" }}
                    >
                      {choose === "2" && (
                        <span style={{ display: "block" }}>Ở đâu?</span>
                      )}
                      {choose === "3" && (
                        <span style={{ display: "block" }}>Tại sao?</span>
                      )}
                      {(choose === "2" || choose === "3") && (
                        <div style={{ width: "450px" }}>
                          <textarea
                            name="txtareaDeleteJob"
                            id="txtareaDeleteJob"
                            onChange={handleChangeTextArea}
                          />
                          {lengthText > -1 ? (
                            <p style={{ textAlign: "right" }}>
                              Còn {lengthText} chữ cái
                            </p>
                          ) : (
                            <p style={{ textAlign: "right", color: "red" }}>
                              {Math.abs(lengthText)} chữ cái quá dài
                            </p>
                          )}
                        </div>
                      )}
                    </label>

                    <div
                      className="errAppear"
                      id="messageErrDeleteJob"
                      style={{ fontSize: "14px", margin: "10px 0" }}
                    >
                      {" "}
                      {lengthText === 200 ? (
                        <>
                          <ErrorIcon />
                          <span style={{ marginLeft: "5px", color: "red" }}>
                            Vui lòng nhập một câu trả lời.
                          </span>
                        </>
                      ) : (
                        <>
                          <ErrorIcon />
                          <span style={{ marginLeft: "5px", color: "red" }}>
                            Giữ câu trả lời không quá 200 kí tự
                          </span>
                        </>
                      )}
                    </div>

                    <div>
                      <CustomButton
                        type="submit"
                        color="green"
                        onClick={() => handleDeleteJob(ele.id)}
                      >
                        Đúng, xóa tin tuyển dụng
                      </CustomButton>
                    </div>
                  </form>
                </div>
              </Modal>
            </div>
          );
        })}
    </div>
  );
}

export default HomepageLogin;
