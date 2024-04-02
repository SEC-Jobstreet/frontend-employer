import SampleData from "./sampleData";

import styles from "./relatedsearches.module.css";

function RelatedResearch() {
  return (
    <div className={styles.wrapper}>
      {SampleData.map((item) => (
        <a href="/#" className={styles.button} key={item}>
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 17.5a7 7 0 100-14 7 7 0 000 14zM15.5 16l5 4.5"
              stroke="#0e8136"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {item}
        </a>
      ))}
    </div>
  );
}

export default RelatedResearch;
