import { Tab, Tabs } from "react-bootstrap";
import {
  IoBusinessOutline,
  IoLocationOutline,
  IoSearchOutline,
  IoTrendingUpSharp,
} from "react-icons/io5";

import "./trendingjobs.css";

const popularSearch = [
  "nhân viên kinh doanh ô tô",
  "kế toán thu ngân",
  "nhân viên hành chính văn phòng",
  "pharmacist",
  "3d modeling",
  "merchandiser",
  "trưởng ban an ninh",
  "nhân viên tiếng anh",
  "thực tập marketing",
  "thương mại điện tử",
  "trung tâm ngoại ngữ tân văn",
  "nhân viên it",
  "revit",
  "nhân viên telesales",
  "security engineer",
];
const jonTitle = [
  "Nhân Viên Kinh Doanh",
  "Nhân Viên Kế Toán",
  "Nhân Viên Kỹ Thuật",
  "Nhân Viên Bán Hàng",
  "Nhân Viên Tư Vấn",
  "Nhân Viên Hành Chính",
  "Nhân Viên Chăm Sóc Khách Hàng",
  "Kế Toán Tổng Hợp",
  "Nhân Viên Marketing",
  "Chuyên Viên Kinh Doanh",
];
const place = [
  "Thành phố Hồ Chí Minh, Hồ Chí Minh",
  "Hà Nội, Hà Nội",
  "Đà Nẵng, Đà Nẵng",
  "Hải Phòng, Hải Phòng",
  "Biên Hòa, Đồng Nai",
  "Huế, Thừa Thiên-Huế",
  "Nha Trang, Khánh Hòa",
  "Cần Thơ, Cần Thơ",
  "Rạch Giá, Kiên Giang",
  "Vũng Tàu, Bà Rịa-Vũng Tàu",
  "Ðà Lạt, Lâm Đồng",
  "Nam Ðịnh, Nam Định",
  "Vinh, Nghệ An",
  "La Gi, Thái Nguyên",
  "Phan Thiết, Tuyên Quang",
];
const company = [
  "Talent Viet",
  "HRchannels.com",
  "Bellsystem24 VietNam",
  "Manpower VN",
  "Công Ty TNHH Một Thành Viên Wacontre",
  "CÔNG TY TNHH RV GROUP VIỆT NAM",
  "Adecco VN",
  "Bosch Group",
  "Reeracoen Vietnam",
];
const jobType = [
  "Full time",
  "Part time",
  "Permanent",
  "Internship",
  "Contract",
  "Casual/Temporary",
];

function TrendingJobs() {
  return (
    <div className="trending-jobs">
      <section>
        <h3 className="heading-medium">
          <IoTrendingUpSharp className="heading-icon" /> Khám phá các công việc
          thịnh hành
        </h3>
        <div className="tabs-section">
          <Tabs
            defaultActiveKey="1"
            id="controlled-tab-example"
            className="mb-5"
          >
            <Tab eventKey="1" title="Những tìm kiếm phổ biến">
              {popularSearch.map((item) => (
                <a href="/" key={item} className="trending-link">
                  <IoSearchOutline className="tab-icon" /> {item}
                </a>
              ))}
            </Tab>
            <Tab eventKey="2" title="Chức danh">
              {jonTitle.map((item) => (
                <a href="/" key={item} className="trending-link">
                  <IoSearchOutline className="tab-icon" /> {item}
                </a>
              ))}
            </Tab>
            <Tab eventKey="3" title="Địa điểm">
              {place.map((item) => (
                <a href="/" key={item} className="trending-link">
                  <IoLocationOutline className="tab-icon" /> {item}
                </a>
              ))}
            </Tab>
            <Tab eventKey="4" title="Công ty">
              {company.map((item) => (
                <a href="/" key={item} className="trending-link">
                  <IoBusinessOutline className="tab-icon" /> {item}
                </a>
              ))}
            </Tab>
            <Tab eventKey="5" title="Thể loại việc">
              {jobType.map((item) => (
                <a href="/" key={item} className="trending-link">
                  <IoSearchOutline className="tab-icon" /> {item}
                </a>
              ))}
            </Tab>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

export default TrendingJobs;
