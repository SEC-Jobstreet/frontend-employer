import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

import Email from "../../../assets/svg/email_icon.svg";

import "./CreateJobAlert.css";

const RadiosData = [
  {
    id: "v1",
    value: "Tại địa điểm này",
  },
  {
    id: "v2",
    value: "Bán kính 5km",
  },
  {
    id: "v3",
    value: "Bán kính 10km",
  },
  {
    id: "v4",
    value: "Bán kính 25km",
  },
  {
    id: "v5",
    value: "Bán kính 50km",
  },
  {
    id: "v6",
    value: "Bán kính 100km",
  },
];
const JobtypeData = [
  {
    id: "v1",
    value: "Toàn thời gian",
  },
  {
    id: "v2",
    value: "Bán thời gian",
  },
];
export default function CreateJobAlert() {
  const navigate = useNavigate();
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  const onCancelHandler = () => {
    navigate("/account/job_alerts");
  };
  return (
    <div
      className="content-container -width-md -margin-y-md"
      id="email-alert-management-page"
    >
      <h2 className="heading-large">
        <img
          src={Email}
          alt="email-icon"
          style={{ "margin-right": "0.8rem" }}
        />
        Tạo thông báo việc làm
      </h2>
      <Form className="new_email_alert" id="email_alert_form" method="post">
        {/* từ khoá */}
        <Form.Group className="email-alert-container">
          <Form.Label htmlFor="email-alert-query">Từ khoá:</Form.Label>
          <Form.Control
            className="email-alert"
            placeholder="Tên việc, công ty, từ khóa"
            type="text"
            id="email-alert-query"
          />
        </Form.Group>
        {/* địa điểm */}
        <Form.Group className="email-alert-container">
          <Form.Label htmlFor="email-alert-location">Địa điểm:</Form.Label>
          <Form.Control
            className="email-alert"
            placeholder="Thành phố, quận, huyện"
            type="text"
            id="email-alert-location"
          />
        </Form.Group>
        {/* bán kính */}
        <div className="email-alert-container">
          <Form.Label htmlFor="email-alert-radius">Bán kính:</Form.Label>
          <Form.Select aria-label="email-alert-radius" className="email-alert">
            {RadiosData.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </Form.Select>
        </div>
        {/* loại việc làm */}
        <div className="email-alert-container">
          <Form.Label htmlFor="email-alert-job-type">Thời gian:</Form.Label>
          <Form.Select
            aria-label="email-alert-job-type"
            className="email-alert"
          >
            {JobtypeData.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </Form.Select>
        </div>

        <Button
          type="submit"
          className="email-alert primary"
          onClick={onSubmitHandler}
        >
          Tạo thông báo việc
        </Button>
        <Button
          type="button"
          className="email-alert secondary"
          onClick={onCancelHandler}
        >
          Huỷ
        </Button>
        <div className="privacy-statement heading-xxsmall">
          <span className="branded-links">
            Bằng cách tạo thông báo qua email, bạn đồng ý với{" "}
            <Link to="/">Các điều khoản và điều kiện sử dụng</Link> và{" "}
            <Link to="/">Chính Sách Bảo Mật</Link> của JobStreet Bạn có thể huỷ
            thông báo qua email bất cứ lúc nào.
          </span>
        </div>
      </Form>
    </div>
  );
}
