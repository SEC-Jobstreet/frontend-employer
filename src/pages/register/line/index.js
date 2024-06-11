import "./line.css";

function Line({ type, color }) {
  // type: dotted, solid
  return (
    <div style={{ width: "100%", marginTop: "19px" }}>
      {type === "dotted" && (
        <div className={`dottedLine ${color}Line`}>
          <div className="straight" />
          <div className="dotted" />
        </div>
      )}
      {type === "solid" && <div className={`solidLine ${color}Line`} />}
    </div>
  );
}

export default Line;
