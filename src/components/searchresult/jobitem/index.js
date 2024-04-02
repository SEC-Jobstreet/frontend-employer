import React from "react";
import { Button, Card } from "react-bootstrap";

import styles from "./jobitem.module.css";

function JobItem({ data, activeItem, handleClick }) {
  const [saved, setSaved] = React.useState(false);

  const handleSaveButtonClick = () => {
    setSaved((prev) => !prev);
  };

  return (
    <Card
      className={
        activeItem === data.id
          ? `${styles.wrapper} ${styles.activeJob}`
          : `${styles.wrapper}`
      }
      onClick={() => handleClick(data.id)}
    >
      <Card.Body className={styles.jobCard}>
        <Card.Subtitle className="mb-2 text-mute d-flex align-items-center">
          <span className={`${styles.badge} ${styles.seenJobBadge}`}>
            <span>{data.status}</span>
          </span>
          <span className={styles.freshnessTime}>{data.freshnessTime}</span>
          <span className="text-end w-50">{data.id}</span>
        </Card.Subtitle>
        <Card.Title className={styles.jobTitle}>{data.title}</Card.Title>
        <div className={styles.jobCardBody}>
          <div>{data.company}</div>
          <div>{data.location}</div>
          <div>
            <span className={`${styles.badge} ${styles.quickApplyBadge}`}>
              Nộp đơn nhanh
            </span>
          </div>
          <div>{data.jobAstract}</div>
        </div>
        <div className={styles.cardBottom}>
          <span className={styles.listedDate}>{data.listedDate}</span>
          <Button
            onClick={handleSaveButtonClick}
            className={
              saved
                ? `${styles.saveButton} ${styles.savedStyle}`
                : `${styles.saveButton}`
            }
          >
            {saved ? "Đã lưu lại" : "Lưu lại"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default JobItem;
