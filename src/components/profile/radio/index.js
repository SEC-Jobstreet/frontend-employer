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
    />
    // <label htmlFor={`${id}`} className="radio-label">
    //   <input
    //     className={`radio-input-${id}`}
    //     type="radio"
    //     name={id}
    //     id={id}
    //     value={value === checkedValue}
    //     onChange={() => setValue(checkedValue)}
    //     checked={value === checkedValue}
    //   />
    //   <span className="custom-radio" />
    //   {children}
    // </label>
  );
}

export default Radio;
