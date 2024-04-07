import "./input.css";

function Input({
  input,
  error,
  setInput,
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
      <label htmlFor="name">
        {label}
        <input
          type={type}
          className={`form-control ${name} ${error && input === "" ? "is-invalid" : ""}`}
          placeholder={placeholder}
          name={name}
          id={name}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required={required}
          max={max}
        />
      </label>
      {error && input === "" && (
        <div className="invalid-feedback-input">{errorMessage}</div>
      )}
      {children}
    </div>
  );
}

export default Input;
