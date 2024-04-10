import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

import styles from "./dropdown.module.css";

function DropDown({ data, defaultValue }) {
  const [selectedOption, setSelectedOption] = React.useState(
    defaultValue || data[0]
  );
  const [isShowDropDown, setIsShowDropDown] = React.useState(false);

  const handleSelect = (title) => {
    setSelectedOption(title);
  };

  const toggleDropDown = () => {
    setIsShowDropDown(!isShowDropDown);
  };

  return (
    <Dropdown
      className="d-inline mx-2"
      show={isShowDropDown}
      onToggle={toggleDropDown}
    >
      <Dropdown.Toggle
        className={
          isShowDropDown
            ? `${styles.dropdownButton} ${styles.active}`
            : `${styles.dropdownButton}`
        }
      >
        {selectedOption}
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.dropdownOptionContainer}>
        {data.map((option) => (
          <Dropdown.Item
            key={option}
            className={styles.dropdownItem}
            onClick={() => handleSelect(option)}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
