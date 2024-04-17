import React, { useId } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

function CustomDropdown({ name, options, onSelect, title, value }) {
  const id = useId();
  return (
    <>
      <div>{name}</div>
      <DropdownButton
        id={id}
        title={title}
        onSelect={(e) => onSelect(e)}
        autoClose="inside"
        className="custom-dropdown"
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
