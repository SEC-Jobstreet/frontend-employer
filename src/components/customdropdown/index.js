/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useId } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

import "./index.css";

function CustomDropdown({
  name,
  options,
  onSelect,
  onBlur,
  title,
  value,
  error,
  autoClose = "inside",
}) {
  const id = useId();
  return (
    <>
      <div>{name}</div>
      <DropdownButton
        className={`${error && "invalid-custom-dropdown"}`}
        id={id}
        title={title}
        onSelect={(e) => onSelect(e)}
        autoClose={autoClose}
        onBlur={onBlur}
      >
        {options.map((e) => {
          const active = value === e.id.toString();
          return (
            <Dropdown.Item key={e.id} eventKey={e.id} active={active}>
              {e.label}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </>
  );
}

export default CustomDropdown;
