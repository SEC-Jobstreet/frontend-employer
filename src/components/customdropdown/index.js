/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import "./index.css";

function DropdownButton({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    if (onSelect) {
      onSelect(option);
    }
    setIsOpen(false);
  };

  let buttonClass = "dropdown-button";
  if (isOpen) {
    buttonClass += " open";
  }

  return (
    <div className="dropdown-button-container">
      <button type="button" className={buttonClass} onClick={toggleDropdown}>
        {selected || "Chọn một thể loại việc"}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
