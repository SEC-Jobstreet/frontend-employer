import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { getEnterprises } from "../../services/configAPI";

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
  const [enterprises, setEnterprises] = useState([]);

  useEffect(() => {
    const getListEnterprise = async () => {
      const res = await getEnterprises();
      if (res.status === 200) {
        console.log(res);
        setEnterprises(res.data);
      }
    };
    getListEnterprise();
  }, []);

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
          {enterprises.map((item) => (
            <BusinessItem key={item.id} info={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Business;
