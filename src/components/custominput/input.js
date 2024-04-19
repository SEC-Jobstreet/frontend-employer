import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";

import "./input.css";

function CustomInput({
  input,
  error,
  setInput,
  setBlur,
  placeholder,
  type,
  label,
  name,
  children,
  required,
  max,
  className,
}) {
  return (
    <div style={{ width: "100%" }} className={`${className}`}>
      <div className="input-group">
        <label htmlFor={name}>
          {label}
          <input
            type={type}
            className={`form-control ${name} ${error && input === "" && "is-invalid"}`}
            placeholder={placeholder}
            name={name}
            id={name}
            value={input}
            onChange={(e) => setInput(e)}
            onBlur={setBlur}
            required={required}
            max={max}
          />
        </label>
        {children}
      </div>
      {error && (
        <div className="invalid-feedback-input">
          <ErrorIcon />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default CustomInput;
