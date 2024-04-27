/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useId } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "react-bootstrap";

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
  const [open, setOpen] = React.useState(false);

  const toggleDropdown = () => {
    setOpen((prev) => !prev); // Khi được gọi, hàm này sẽ đảo ngược trạng thái đóng/mở của dropdown
  };

  const id = useId();
  return (
    <div style={{ textAlign: "left" }}>
      <div className="dropdown-title">{name}</div>
      <Dropdown
        className={`${error && "invalid-custom-dropdown"}`}
        id={id}
        onSelect={(e) => onSelect(e)}
        autoClose={autoClose}
        onBlur={onBlur}
        show={open}
        onToggle={toggleDropdown}
      >
        <DropdownToggle className={open ? "open" : ""}>{title}</DropdownToggle>
        <DropdownMenu>
          {options.map((e) => {
            const active = value === e.id.toString();
            return (
              <Dropdown.Item key={e.id} eventKey={e.id} active={active}>
                {e.label}
              </Dropdown.Item>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default CustomDropdown;
