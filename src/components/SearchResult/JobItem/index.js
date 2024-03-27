import { Button, Card } from "react-bootstrap";

import styles from "./JobItem.module.css";

function JobItem({ data }) {
  return (
    <Card className="border-0">
      <Card.Body className={styles.jobCard}>
        <Card.Subtitle className="mb-2 text-mute d-flex align-items-center">
          <span className={`${styles.badge} ${styles.seenJobBadge}`}>
            <span>{data.status}</span>
          </span>
          <span className={styles.freshnessTime}>{data.freshnessTime}</span>
          <span className="text-end w-50">{data.id}</span>
        </Card.Subtitle>
        <Card.Title className={styles.jobTitle}>{data.title}</Card.Title>
        <Card.Text className={styles.jobCardBody}>
          <span>{data.company}</span>
          <br />
          <span>{data.location}</span>
          <span>
            <span
              className={`${styles.badge} ${styles.quickApplyBadge}`}
              style={{ backgroundColor: "#ddf8eb" }}
            >
              Nộp đơn nhanh
            </span>
          </span>
          <br />
          <span>{data.jobAstract}</span>
        </Card.Text>
        <Card.Text className="d-flex justify-content-between">
          <span className={styles.listedDate}>{data.listedDate}</span>
          <Button className={styles.saveButton}>Lưu lại</Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default JobItem;
