import SampleData from "./sampleData";

import styles from "./recentresearch.module.css";

function RecentResearch() {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Tìm kiếm gần đây</h3>
      {SampleData.map((data) => (
        <a href="/#" className={styles.recentResearch} key={data.title}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.number}>{data.number} MỚI</div>
        </a>
      ))}
    </div>
  );
}

export default RecentResearch;
