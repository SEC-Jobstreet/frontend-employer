import { useState } from "react";

import warningIcon from "../../assets/svg/warning_icon.svg";

import "./index.css";

function Input({
  input,
  setInput,
  placeholder,
  type,
  label,
  errorMessage,
  name,
  children,
  required,
  max,
  className,
}) {
  const [showError, setShowError] = useState(false);

  return (
    <>
      <div className={`input-group ${className}`}>
        <label htmlFor="name">
          {label}
          <input
            type={type}
            className={`form-control ${showError && errorMessage && "is-invalid"}`}
            placeholder={placeholder}
            name={name}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required={required}
            max={max}
            onBlur={() => setShowError(true)}
          />
        </label>

        {children}
      </div>
      {showError && errorMessage && (
        <div className="invalid-feedback-input">
          <img src={warningIcon} alt="" />
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  );
}

export default Input;
