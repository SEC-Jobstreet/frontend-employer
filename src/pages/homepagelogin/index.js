import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import buildingIcon from "../../assets/svg/building_icon.svg";
import { ReactComponent as EditIcon } from "../../assets/svg/edit_icon.svg";
import { ReactComponent as TrashIcon } from "../../assets/svg/trash_icon.svg";
import CustomButton from "../../components/custombutton";
import { getApplicationNumber, getJobList } from "../../services/configAPI";

import "./index.css";

const statusList = {
  POSTED: {
    class: "status-posted",
    name: "Đã duyệt",
  },
  REVIEWING: {
    class: "status-reviewing",
    name: "Đang được xem xét",
  },
  DENIED: {
    class: "status-denied",
    name: "Đã bị từ chối",
  },
};

function ApplicationNumber({ data }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getApplicationNumbers = async () => {
      const res = await getApplicationNumber(data.id);
      console.log(res);
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
      style={{ textDecoration: "none", color: "black" }}
    >
      {total} ứng viên
    </a>
  );
}

function HomepageLogin() {
  const [jobList, setJobList] = useState(null);

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
  return (
    <div className="job-container">
      <div className="post-job-button">
        <CustomButton color="green" onClick={() => {}}>
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
            <div className="job-item" key={ele.id}>
              <div className="job-item-info">
                <div>
                  <span className={`status ${statusList[ele.status]?.class}`}>
                    {statusList[ele.status]?.name}
                  </span>
                  <span>
                    Đăng vào ngày {created.getDate()} Tháng{" "}
                    {created.getMonth() + 1} {created.getFullYear()}
                  </span>
                </div>
                <h3 className="title">{ele.title}</h3>
                <div className="job-item-enterprise">
                  <div className="job-item-enterprise-icon">
                    <img
                      src={buildingIcon}
                      alt="building"
                      style={{ width: "30px" }}
                    />
                  </div>
                  <div className="job-item-enterprise-info">
                    <h3>{ele.enterprise_name}</h3>
                    <p>{ele.enterprise_address}</p>
                  </div>
                </div>
              </div>
              <Row className="job-item-button-group">
                <Col sm="6" className="candidate-numbers">
                  <ApplicationNumber data={ele} />
                </Col>
                <Col sm="3">
                  <button type="button" onClick={() => {}}>
                    <EditIcon />
                    Chỉnh sửa việc
                  </button>
                </Col>
                <Col sm="3">
                  <button type="button" onClick={() => {}}>
                    <TrashIcon />
                    Đóng việc
                  </button>
                </Col>
              </Row>
            </div>
          );
        })}
    </div>
  );
}

export default HomepageLogin;
