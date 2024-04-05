import React from "react";
import { Button, Card } from "react-bootstrap";

import styles from "./emailalert.module.css";

function EmailAlert() {
  return (
    <Card className={styles.wrapper}>
      <Card.Body className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.notiIcon} />
          <div style={{ marginLeft: "3px", marginBottom: "1.6rem" }}>
            <div style={{ fontWeight: 500, fontSize: "1.6rem" }}>
              Đừng bỏ lỡ cơ hội!
            </div>
            <div style={{ fontWeight: 300, fontSize: "1.4rem" }}>
              Chúng tôi sẽ thông báo cho bạn khi các việc làm mới ở
              <b style={{ fontWeight: "bold" }}> Hồ Chí Minh </b>
              được đăng.
            </div>
          </div>
        </div>
        <Button className={styles.notiButton}>Thông báo việc tương tự</Button>
        <div style={{ fontSize: "1.12rem", margin: "1.2rem 0" }}>
          <span>
            Bằng cách tạo thông báo qua email, bạn đồng ý với{" "}
            <a href="/#" className={styles.brandedLink}>
              Các điều khoản và điều kiện sử dụng
            </a>{" "}
            và{" "}
            <a href="/#" className={styles.brandedLink}>
              Chính Sách Bảo Mật
            </a>{" "}
            của JobStreet Bạn có thể huỷ thông báo qua email bất cứ lúc nào.
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default EmailAlert;
