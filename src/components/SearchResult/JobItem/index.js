import { Button, Card } from "react-bootstrap";

import styles from "./JobItem.module.css";

function JobItem({ data }) {
  return (
    <Card className="border-0">
      <Card.Body className={styles.jobCard}>
        <Card.Subtitle className="mb-2 text-mute d-flex align-items-center">
          <span className={`${styles.badge} ${styles.seenJobBadge}`}>
            <div>{data.status}</div>
          </span>
          <span className={styles.freshnessTime}>{data.freshnessTime}</span>
          <span className="text-end w-50">{data.id}</span>
        </Card.Subtitle>
        <Card.Title className={styles.jobTitle}>{data.title}</Card.Title>
        <Card.Text className={styles.jobCardBody}>
          <div>{data.company}</div>
          <div>{data.location}</div>
          <div>
            <span
              className={`${styles.badge} ${styles.quickApplyBadge}`}
              style={{ backgroundColor: "#ddf8eb" }}
            >
              Nộp đơn nhanh
            </span>
          </div>

          <div>{data.jobAstract}</div>
        </Card.Text>
        <Card.Text className="d-flex justify-content-between">
          <div className={styles.listedDate}>{data.listedDate}</div>
          <Button className={styles.saveButton}>Lưu lại</Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default JobItem;
