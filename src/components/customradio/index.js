import "./index.css";

function CustomRadio({ value, checkedValue, setValue, id, children }) {
  return (
    <label htmlFor={`${id}`} className="radio-label">
      <input
        className={`radio-input-${id}`}
        type="radio"
        name={id}
        id={id}
        value={value === checkedValue}
        onChange={() => setValue(checkedValue)}
        checked={value === checkedValue}
      />
      <span className="custom-radio" />
      {children}
    </label>
  );
}

export default CustomRadio;
