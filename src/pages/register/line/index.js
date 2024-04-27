import styles from "./line.module.css";

function Line({ type }) {
  // type: dotted, solid
  return (
    <div style={{ width: "100%", marginTop: "19px" }}>
      {type === "dotted" && <div className={styles.dottedLine} />}
      {type === "solid" && <div className={styles.solidLine} />}
    </div>
  );
}

export default Line;
