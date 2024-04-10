/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Form } from "react-bootstrap";

import DropDown from "../dropdown";

import styles from "./filterbar.module.css";

const TypeOfJob = [
  "Mọi loại việc",
  "Full time",
  "Part time",
  "Permanent",
  "Internship",
  "Contract",
];
const DatePosted = [
  "Mọi thời gian",
  "24 giờ qua",
  "7 ngày qua",
  "14 ngày qua",
  "30 ngày qua",
];
const Distance = [
  "Tại địa điểm này",
  "Bán kính 5km",
  "Bán kính 10km",
  "Bán kính 25km",
  "Bán kính 50km",
  "Bán kính 100km",
];

function FilterBar() {
  const [activeButton, setActiveButton] = useState("Độ chính xác");
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleClick = (label) => {
    setActiveButton(label);
  };

  return (
    <div className={styles.filterBarContainer}>
      <div className={styles.filterBar}>
        <div className={styles.dropdownContainer}>
          <span> Sắp xếp: &nbsp;</span>
          <button
            type="button"
            className={
              activeButton === "Độ chính xác"
                ? `${styles.active} ${styles.sortLink}`
                : `${styles.sortLink}`
            }
            onClick={() => handleClick("Độ chính xác")}
          >
            Độ chính xác
          </button>
          &nbsp;/&nbsp;
          <button
            type="button"
            className={
              activeButton === "Ngày"
                ? `${styles.active} ${styles.sortLink}`
                : `${styles.sortLink}`
            }
            onClick={() => handleClick("Ngày")}
          >
            Ngày
          </button>
        </div>
        <div className={styles.dropdowns}>
          <DropDown data={TypeOfJob} />
          <DropDown data={DatePosted} />
          <DropDown data={Distance} defaultValue={Distance[3]} />
        </div>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Nộp đơn nhanh"
          onChange={handleChange}
          checked={checked}
          reverse
          className={styles.quickApplyFilter}
        />
        <button type="button" className={styles.resetFilters}>
          Đặt lại tất cả các bộ lọc
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
