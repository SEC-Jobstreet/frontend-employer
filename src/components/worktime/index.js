/* eslint-disable no-param-reassign */
import React, { useState } from "react";

import "./index.css";

function WorkTime() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = ["Morning", "Afternoon", "Evening"];

  const [selectedDays, setSelectedDays] = useState({
    All: { Morning: false, Afternoon: false, Evening: false },
    Mon: { Morning: false, Afternoon: false, Evening: false },
    Tue: { Morning: false, Afternoon: false, Evening: false },
    Wed: { Morning: false, Afternoon: false, Evening: false },
    Thu: { Morning: false, Afternoon: false, Evening: false },
    Fri: { Morning: false, Afternoon: false, Evening: false },
    Sat: { Morning: false, Afternoon: false, Evening: false },
    Sun: { Morning: false, Afternoon: false, Evening: false },
  });

  const [activeButton, setActiveButton] = useState("specific");

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  // Hàm kiểm tra và cập nhật trạng thái cho 'All'
  const checkAndUpdateAll = (newSelectedDays) => {
    let updated = false;
    const newDays = { ...newSelectedDays };

    times.forEach((time) => {
      const allSelected = days.every((day) => newDays[day][time]);
      if (newDays.All[time] !== allSelected) {
        updated = true;
        newDays.All[time] = allSelected;
      }
    });

    return updated ? newDays : null;
  };

  const handleSelectDayTime = (day, time) => {
    const updatedSelected = !selectedDays[day][time];
    const updatedDays =
      day === "All"
        ? Object.keys(selectedDays).reduce((acc, d) => {
            acc[d] = { ...selectedDays[d], [time]: updatedSelected };
            return acc;
          }, {})
        : {
            ...selectedDays,
            [day]: { ...selectedDays[day], [time]: updatedSelected },
          };

    // Kiểm tra và cập nhật cho 'All' trước khi set state
    const maybeUpdatedDays = checkAndUpdateAll(updatedDays);
    setSelectedDays(maybeUpdatedDays || updatedDays);
  };

  return (
    <div className="work-time-container">
      <div className="work-time-header">Thời gian làm việc</div>
      <div className="work-time-buttons">
        <button
          className={`work-time-button ${activeButton === "specific" ? "active" : ""}`}
          type="button"
          onClick={() => handleButtonClick("specific")}
        >
          Thời gian cụ thể
        </button>
        <button
          className={`work-time-button ${activeButton === "anytime" ? "active" : ""}`}
          type="button"
          onClick={() => handleButtonClick("anytime")}
        >
          Bất cứ lúc nào
        </button>
      </div>
      {activeButton === "specific" && (
        <div className="work-time-grid">
          <div className="work-time-grid-row">
            <div>Tất cả</div>
            {times.map((time, index) => (
              <div key={time} className="work-time-grid-cell">
                <input
                  className="work-time-grid-cell-input"
                  type="checkbox"
                  checked={selectedDays.All[time]}
                  onChange={() => handleSelectDayTime("All", time)}
                />
                <div className="work-time-grid-header">
                  {["Sáng", "Chiều", "Tối"][index]}
                </div>
              </div>
            ))}
          </div>
          {days.map((day) => (
            <div key={day} className="work-time-grid-row">
              <div>{day}</div>
              {times.map((time) => (
                <div key={time} className="work-time-grid-cell">
                  <input
                    className="work-time-grid-cell-input"
                    type="checkbox"
                    checked={selectedDays[day][time]}
                    onChange={() => handleSelectDayTime(day, time)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkTime;
