import { Form } from "react-bootstrap";

import "./index.css";

function Radio({ value, checkedValue, setValue, id, children }) {
  return (
    <Form.Check
      checked={value === checkedValue}
      value={value === checkedValue}
      type="radio"
      name={id}
      id={id}
      onChange={() => setValue(checkedValue)}
      label={children}
      className="radio-custom"
    />
  );
}

export default Radio;
