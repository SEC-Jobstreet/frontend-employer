import React from "react";
import { Form } from "react-bootstrap";

import "./checkbox.css";
import styles from "./workshift.module.css";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const sessionsList = ["morning", "afternoon", "evening"];
const sessionIdx = { morning: 0, afternoon: 1, evening: 2 };

function WorkShift({
  whenever,
  setWhenever,
  particularTime,
  setParticularTime,
  errorWorkShift,
}) {
  const [sessions, setSessions] = React.useState({
    morning:
      particularTime[sessionIdx.morning][0] &&
      particularTime[sessionIdx.morning][1] &&
      particularTime[sessionIdx.morning][2] &&
      particularTime[sessionIdx.morning][3] &&
      particularTime[sessionIdx.morning][4] &&
      particularTime[sessionIdx.morning][5] &&
      particularTime[sessionIdx.morning][6],
    afternoon:
      particularTime[sessionIdx.afternoon][0] &&
      particularTime[sessionIdx.afternoon][1] &&
      particularTime[sessionIdx.afternoon][2] &&
      particularTime[sessionIdx.afternoon][3] &&
      particularTime[sessionIdx.afternoon][4] &&
      particularTime[sessionIdx.afternoon][5] &&
      particularTime[sessionIdx.afternoon][6],
    evening:
      particularTime[sessionIdx.evening][0] &&
      particularTime[sessionIdx.evening][1] &&
      particularTime[sessionIdx.evening][2] &&
      particularTime[sessionIdx.evening][3] &&
      particularTime[sessionIdx.evening][4] &&
      particularTime[sessionIdx.evening][5] &&
      particularTime[sessionIdx.evening][6],
  });

  const setSessionValue = (session, value) => {
    setSessions((prev) => ({ ...prev, [session]: value }));
  };

  React.useLayoutEffect(() => {
    const checkLogic = (session) => {
      const col = sessionIdx[session];
      const firstValue = particularTime[col][0];
      for (let i = 1; i < 7; i += 1) {
        if (particularTime[col][i] !== firstValue) {
          if (sessions[session] === true) {
            setSessionValue(session, false);
          }
          return;
        }
      }
      setSessionValue(session, firstValue);
    };
    checkLogic("morning");
    checkLogic("afternoon");
    checkLogic("evening");
  }, [particularTime[0], particularTime[1], particularTime[2]]);

  const setOneColParticularTime = (index, value) => {
    const temp = [
      [...particularTime[0]],
      [...particularTime[1]],
      [...particularTime[2]],
    ];
    for (let i = 0; i < 7; i += 1) {
      temp[index][i] = value;
    }
    setParticularTime(temp);
  };

  const setOneCheckbox = (x, y, value) => {
    const temp = [
      [...particularTime[0]],
      [...particularTime[1]],
      [...particularTime[2]],
    ];
    temp[x][y] = value;
    setParticularTime(temp);
  };

  const handleAllCheckBoxChange = (session) => {
    const prevValue = sessions[sessionIdx[session]];
    setOneColParticularTime(sessionIdx[session], !prevValue);
    setSessionValue(session, !prevValue);
  };

  return (
    <div>
      <p className={styles.workshiftTitle}>Ca làm việc có thể</p>
      <div className="grid">
        <button
          type="button"
          onClick={() => setWhenever(false)}
          className={`${styles.timeHeader} ${whenever === false ? styles.activeTime : ""}`}
        >
          Thời gian cụ thể
        </button>
        <button
          type="button"
          onClick={() => setWhenever(true)}
          className={`${styles.timeHeader} ${whenever === true ? styles.activeTime : ""}`}
        >
          Bất cứ lúc nào
        </button>
      </div>
      {!whenever && (
        <div className={styles.checkboxContainer}>
          <div className="row">
            <div className="col">All</div>
            {sessionsList.map((session) => (
              <Form.Check // prettier-ignore
                type="checkbox"
                className="col checkbox-custom"
                value={sessions[sessionIdx[session]]}
                checked={sessions[sessionIdx[session]]}
                key={session}
                onChange={() => handleAllCheckBoxChange(session)}
              />
            ))}
          </div>
          <div className="row" style={{ marginBottom: "2rem" }}>
            <div className="col" />
            <div className="col">Sáng</div>
            <div className="col">Chiều</div>
            <div className="col">Tối</div>
          </div>
          {days.map((day, dIdx) => (
            <div className="row" style={{ marginBottom: "3.75rem" }} key={day}>
              <div className="col">{day}</div>
              {sessionsList.map((session) => {
                const sIdx = sessionIdx[session];
                return (
                  <Form.Check
                    className="col checkbox-custom"
                    type="checkbox"
                    value={particularTime[sIdx][dIdx]}
                    checked={particularTime[sIdx][dIdx]}
                    key={`${day} ${session}`}
                    onChange={() =>
                      setOneCheckbox(sIdx, dIdx, !particularTime[0][dIdx])
                    }
                  />
                );
              })}
            </div>
          ))}
          {errorWorkShift && (
            <div className="invalid-feedback-input">
              Vui lòng chọn thời gian bạn có thể làm việc.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(WorkShift);
