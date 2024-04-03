import React from "react";
import { Button, Container } from "react-bootstrap";

import { useJobsState } from "../context";
import FacetLinks from "../facetlinks";

import styles from "./jobdescription.module.css";

function JobDescription({ data }) {
  const { savedJobs, setSaveJobs } = useJobsState();

  const handleSaveButtonClick = (id) => {
    const newValue = !savedJobs[id];
    setSaveJobs((prev) => ({ ...prev, [id]: newValue }));
  };

  return (
    <Container className={styles.wrapper}>
      {data !== null && (
        <div className={styles.jobDescription}>
          <div className={styles.JDHeader}>
            <h3 className={styles.headingXXLarge}>
              {data.title} {data.id}
            </h3>
            <div
              className="d-flex flex-nowrap"
              style={{ marginBottom: "1.6rem" }}
            >
              <span className={styles.company}>{data.company}</span>
              <span className={styles.divider}>–</span>
              <span className={styles.location}>{data.location}</span>
            </div>
            <div className={`${styles.badge} `}>
              <i className={styles.clockIcon} />
              <span>Toàn thời gian</span>
            </div>
            <div style={{ fontSize: "1.4rem" }}>
              1 ngày trước, từ JobStreet Vietnam
            </div>
            <div className={styles.actionsContainer}>
              <Button className={styles.applyButton}>Nộp đơn nhanh</Button>
              <Button
                className={styles.saveButton}
                onClick={() => handleSaveButtonClick(data.id)}
              >
                {savedJobs[data.id] === true ? "Đã lưu lại" : "Lưu việc"}
              </Button>
              <a className={styles.openNewTab} href="/#">
                Mở trang mới
              </a>
            </div>
            <hr className="m-0" />
          </div>
          <div className={styles.descriptionContent}>
            <div>
              <b>MÔ TẢ CÔNG VIỆC</b>
            </div>
            <div>
              Esuhai với hơn 15 năm hoạt động trong lĩnh vực Đào tạo – Tư vấn
              nguồn nhân lực cho các doanh nghiệp Việt Nam và Nhật Bản. Chúng
              tôi tìm kiếm nhân viên năng động, năng lực tiếng Nhật tốt để hỗ
              trợ biên dịch tài liệu cho công ty.
              <br />
              Nội dung công việc: <br />
              <ol>
                <li>Biên dịch hồ sơ, tài liệu</li>
                <li>
                  Tổ chức phỏng vấn, tuyển dụng, định hướng nghề nghiệp cho ứng
                  viên
                </li>
                <li>
                  Liên lạc với khách hàng Nhật Bản thông qua mail, điện thoại
                </li>
                <li>Quản lý hồ sơ, quy trình nghiệp vụ</li>
                <li>Tổ chức xuất cảnh Tổ chức lễ đón thực tập sinh về nước</li>
              </ol>
            </div>
            <div style={{ marginTop: "1.6rem" }}>
              <strong>YÊU CẦU KỸ NĂNG</strong>
            </div>
            <div>
              <ol>
                <li>Trình độ tiếng Nhật từ N3 trở lên</li>
                <li>
                  Thành thạo vi tính văn phòng, kỹ năng đánh máy 10 ngón (từ 35
                  wpm)
                </li>
                <li>
                  Vui vẻ, nhiệt tình, có tinh thần học hỏi, yêu thích công việc
                  chăm sóc khách hàng
                </li>
                <li>Kỹ năng giao tiếp tốt, ngoài hình khá</li>
              </ol>
              <div>
                <p>
                  <strong>Địa điểm làm việc:</strong>
                </p>
                <p>
                  Trụ sở chính: 40/12 - 40/16 Ấp Bắc, Phường 13, Quận Tân Bình,
                  TP Hồ Chí Minh
                </p>
                <ul>
                  <li>
                    Văn phòng tại Nhật Bản: 101-0047 Arte Otemachi, 5F, 1-5-16,
                    Uchikanda, Chiyoda-ku, Tokyo, Japan
                  </li>
                  <li>Chi nhánh: Đà Nẵng</li>
                  <li>
                    Trung tâm liên kết: Hồ Chí Minh, Vũng Tàu, Bình Dương, Đồng
                    Nai, Vĩnh Long, Tiền Giang, Bến Tre, Trà Vinh, Huế , Hà Nội
                  </li>
                </ul>
                <p>
                  <strong>Thời gian làm việc:</strong>
                </p>
                <ul>
                  <li>08h sáng - 05h chiều ( từ thứ 2 đến sáng thứ 7).</li>
                  <li>
                    Nghỉ chiều thứ 7, chủ nhật và các ngày nghỉ lễ theo quy định
                    trong năm.
                  </li>
                </ul>
                <p>
                  <strong>Chính sách phúc lợi &amp; đãi ngộ:</strong>
                </p>
                <ul>
                  <li>
                    Lương theo năng lực thực tế; điều chỉnh định kỳ hằng năm,
                    năm đầu chế độ điều chỉnh 2 lần
                  </li>
                  <li>
                    Thưởng hiệu quả công việc: 2 kỳ / năm &amp; các kỳ thưởng lễ
                    (30/04, 02/09, 20/11, 01/01)
                  </li>
                  <li>Tham gia các sự kiện: du lịch, teambuilding, …</li>
                  <li>
                    Phúc lợi Sinh nhật, Đám cưới, Sinh con, Thăm bệnh, Khám sức
                    khỏe định kỳ hằng năm, Tham gia BHXH-BHYT, Chế độ Bảo hiểm
                    cao cấp đối với nhân viên thâm niên,…
                  </li>
                  <li>
                    Trợ cấp nhà xa, Cơm trưa, Môi trường làm việc, Thai sản,..
                  </li>
                  <li>
                    Phụ cấp ngoài giờ, Phụ cấp di chuyển chi nhánh, Phụ cấp công
                    tác.
                  </li>
                </ul>
                <p>
                  <strong>Cơ hội học hỏi &amp; phát triển:</strong>
                </p>
                <ul>
                  <li>
                    Môi trường làm việc đặc thù theo phong cách Nhật Bản giúp
                    bạn rèn luyện được đức tính kỷ luật, cẩn thận, chu đáo,
                    nhiệt huyết và kỹ năng truyền cảm hứng....
                  </li>
                  <li>
                    Môi trường thân thiện, năng động, sáng tạo; giúp bạn trải
                    nghiệp để khẳng định bản thân và trưởng thành
                  </li>
                  <li>
                    Thường xuyên được tiếp xúc với đồng nghiệp, khách hàng là
                    người Nhật giúp nâng cao năng lực tiếng Nhật và trao dồi
                    kiến thức về văn hóa Nhật Bản.
                  </li>
                  <li>Cơ hội phát triển nghề nghiệp ổn định, lâu dài</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <FacetLinks />
    </Container>
  );
}

export default JobDescription;
