import React from "react";

import "./index.css";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WorkShift({
  whenever,
  setWhenever,
  particularTime,
  setParticularTime,
  errorWorkShift,
  setErrorWorkShift,
}) {
  const morning =
    particularTime[0][0] &&
    particularTime[0][1] &&
    particularTime[0][2] &&
    particularTime[0][3] &&
    particularTime[0][4] &&
    particularTime[0][5] &&
    particularTime[0][6];

  const afternoon =
    particularTime[1][0] &&
    particularTime[1][1] &&
    particularTime[1][2] &&
    particularTime[1][3] &&
    particularTime[1][4] &&
    particularTime[1][5] &&
    particularTime[1][6];

  const evening =
    particularTime[2][0] &&
    particularTime[2][1] &&
    particularTime[2][2] &&
    particularTime[2][3] &&
    particularTime[2][4] &&
    particularTime[2][5] &&
    particularTime[2][6];

  return (
    <div>
      <h3>Thời gian làm việc</h3>
      <div className="row">
        <button
          type="button"
          onClick={() => setWhenever(false)}
          className={`working-time-button col ${whenever === false ? "active" : ""}`}
        >
          Thời gian cụ thể
        </button>
        <button
          type="button"
          onClick={() => setWhenever(true)}
          className={`working-time-button col ${whenever === true ? "active" : ""}`}
        >
          Bất cứ lúc nào
        </button>
      </div>
      {!whenever && (
        <>
          <div className="row">
            <div className="col">All</div>
            <input
              className="col"
              type="checkbox"
              value={morning}
              checked={morning}
              onChange={() => {
                if (morning) {
                  setParticularTime((prev) => [
                    [false, false, false, false, false, false, false],
                    [...prev[1]],
                    [...prev[2]],
                  ]);
                } else {
                  setErrorWorkShift(false);
                  setParticularTime((prev) => [
                    [true, true, true, true, true, true, true],
                    [...prev[1]],
                    [...prev[2]],
                  ]);
                }
              }}
            />
            <input
              className="col"
              type="checkbox"
              value={afternoon}
              checked={afternoon}
              onChange={() => {
                if (afternoon) {
                  setParticularTime((prev) => [
                    [...prev[0]],
                    [false, false, false, false, false, false, false],
                    [...prev[2]],
                  ]);
                } else {
                  setErrorWorkShift(false);
                  setParticularTime((prev) => [
                    [...prev[0]],
                    [true, true, true, true, true, true, true],
                    [...prev[2]],
                  ]);
                }
              }}
            />
            <input
              className="col"
              type="checkbox"
              value={evening}
              checked={evening}
              onChange={() => {
                if (evening) {
                  setParticularTime((prev) => [
                    [...prev[0]],
                    [...prev[1]],
                    [false, false, false, false, false, false, false],
                  ]);
                } else {
                  setErrorWorkShift(false);
                  setParticularTime((prev) => [
                    [...prev[0]],
                    [...prev[1]],
                    [true, true, true, true, true, true, true],
                  ]);
                }
              }}
            />
          </div>
          <div className="row">
            <div className="col" />
            <div className="col">Sáng</div>
            <div className="col">Chiều</div>
            <div className="col">Tối</div>
          </div>
          {days.map((e, index) => (
            <div className="row" key={e}>
              <div className="col">{e}</div>
              <input
                className="col"
                type="checkbox"
                value={particularTime[0][index]}
                checked={particularTime[0][index]}
                onChange={() => {
                  const temp = [
                    [...particularTime[0]],
                    [...particularTime[1]],
                    [...particularTime[2]],
                  ];
                  temp[0][index] = !temp[0][index];
                  setErrorWorkShift(false);
                  setParticularTime([...temp]);
                }}
              />
              <input
                className="col"
                type="checkbox"
                value={particularTime[1][index]}
                checked={particularTime[1][index]}
                onChange={() => {
                  const temp = [
                    [...particularTime[0]],
                    [...particularTime[1]],
                    [...particularTime[2]],
                  ];
                  temp[1][index] = !temp[1][index];
                  setErrorWorkShift(false);
                  setParticularTime([...temp]);
                }}
              />
              <input
                className="col"
                type="checkbox"
                value={particularTime[2][index]}
                checked={particularTime[2][index]}
                onChange={() => {
                  const temp = [
                    [...particularTime[0]],
                    [...particularTime[1]],
                    [...particularTime[2]],
                  ];
                  temp[2][index] = !temp[2][index];
                  setErrorWorkShift(false);
                  setParticularTime([...temp]);
                }}
              />
            </div>
          ))}
          {errorWorkShift && (
            <div className="invalid-feedback-input">
              Vui lòng chọn thời gian bạn có thể làm việc.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default React.memo(WorkShift);
