import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BusinessItem from "./components/businessitem";

import "./styles.css";

export const DUMMY_DATA = [
  {
    id: "v1",
    name: "Công ty TNHH ABC",
    address: "354 Phan Văn Trị, P.11, Q. Bình Thạn, TP. Hồ Chí Minh",
    field: 1,
    size: 1,
    role: 1,
    company: "Công ty tuyển dụng ABC",
    url: "https://google.com",
    license: "ABC",
  },
  {
    id: "v2",
    name: "Gia Dình Ông Nguyễn Văn A",
    address: "279 Nơ Trang Long, P.12, Q. Bình Thạn, TP. Hồ Chí Minh",
    field: 1,
    size: 1,
    role: 3,
    company: "Công ty tuyển dụng ABC",
    url: "https://google.com",
    license: "ABC",
  },
];
function Business() {
  const navigate = useNavigate();
  return (
    <div className="center-item-container">
      <div className="content-container">
        <div className="add-new-business-container">
          <Button
            className="-primary"
            onClick={() => {
              navigate("create");
            }}
          >
            Thêm doanh nghiệp mới
          </Button>
        </div>
        <div className="business-list-container">
          {DUMMY_DATA.map((item) => (
            <BusinessItem key={item.id} info={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Business;
