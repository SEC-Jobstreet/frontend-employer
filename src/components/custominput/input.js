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
  errorMessage,
  name,
  children,
  required,
  max,
}) {
  return (
    <div className="input-group">
      <label htmlFor={name}>
        {label}
        <input
          type={type}
          className={`form-control ${name}`}
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
      {error && input === "" && (
        <div className="invalid-feedback-input">
          <ErrorIcon />
          {errorMessage}
        </div>
      )}
      {children}
    </div>
  );
}

export default CustomInput;
